/* Shared availability + sample-booking generator for the customer page and shop dashboard.
   Free slots on the customer page and sample bookings on the dashboard use the same rules. */
(function (global) {
  "use strict";

  function C() { return global.CONFIG || {}; }
  function isSalon() {
    const k = String(C().kind || C().placeWord || "").toLowerCase();
    return /salon|beauty|nail|lash|studio/.test(k);
  }
  function placeWord() { return C().placeWord || (isSalon() ? "salon" : "shop"); }
  function staffWord() { return C().staffWord || (isSalon() ? "stylist" : "barber"); }
  function staffLabel() { return C().staffLabel || (isSalon() ? "Stylist" : "Barber"); }
  function payInLabel() { return (C().copy && C().copy.payInPlace) || ("pay in " + placeWord()); }
  function currency() { return C().currency || "€"; }
  function euro(n) { return currency() + (Number(n) || 0); }

  function hash(s) {
    let h = 0;
    s = String(s || "");
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }
  function timeToMins(t) {
    const p = String(t || "0:0").split(":");
    return (Number(p[0]) || 0) * 60 + (Number(p[1]) || 0);
  }
  function minsToTime(n) {
    n = Math.max(0, Number(n) || 0);
    const h = Math.floor(n / 60), m = n % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }
  function hourToMins(h) { return Math.round(Number(h) * 60); }

  function maltaNow() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: C().timeZone || "Europe/Malta",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", weekday: "short",
      hour12: false
    }).formatToParts(new Date());
    const g = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      y: +g("year"), mo: +g("month"), d: +g("day"),
      hour: +g("hour"), minute: +g("minute"),
      dow: weekdayMap[g("weekday")],
      weekday: g("weekday")
    };
  }
  function addDays(now, n) {
    const utc = Date.UTC(now.y, now.mo - 1, now.d + n);
    const dt = new Date(utc);
    return { y: dt.getUTCFullYear(), mo: dt.getUTCMonth() + 1, d: dt.getUTCDate(), dow: dt.getUTCDay() };
  }
  function stampOf(dateObj) {
    return dateObj.y + "-" + String(dateObj.mo).padStart(2, "0") + "-" + String(dateObj.d).padStart(2, "0");
  }
  function dateFromStamp(stamp) {
    const p = String(stamp || "").split("-").map(Number);
    const dt = new Date(Date.UTC(p[0], (p[1] || 1) - 1, p[2] || 1));
    return { y: dt.getUTCFullYear(), mo: dt.getUTCMonth() + 1, d: dt.getUTCDate(), dow: dt.getUTCDay() };
  }
  function offsetFromStamp(stamp) {
    const now = maltaNow();
    const target = dateFromStamp(stamp);
    const a = Date.UTC(now.y, now.mo - 1, now.d);
    const b = Date.UTC(target.y, target.mo - 1, target.d);
    return Math.round((b - a) / 86400000);
  }

  function branches() {
    return (C().branches || []).map(function (b) {
      return Object.assign({}, b, {
        start: b.openHour,
        end: b.closeHour,
        open: b.openDays || [1, 2, 3, 4, 5, 6]
      });
    });
  }
  function branchById(id) {
    return branches().find(function (b) { return b.id === id || b.name === id; }) || null;
  }
  function services() { return (C().services || []).slice(); }
  function serviceById(id) { return services().find(function (s) { return s.id === id; }) || null; }

  function isOpen(branch, dateObj) {
    const days = branch.open || branch.openDays || [];
    return days.indexOf(dateObj.dow) !== -1;
  }
  function openMinsFor(branch) {
    return hourToMins(branch.start != null ? branch.start : branch.openHour);
  }
  function closeMinsFor(branch, dateObj) {
    if (branch.closeHourByDay) {
      const v = branch.closeHourByDay[dateObj.dow];
      if (v != null) return hourToMins(v);
      const s = branch.closeHourByDay[String(dateObj.dow)];
      if (s != null) return hourToMins(s);
    }
    return hourToMins(branch.end != null ? branch.end : branch.closeHour);
  }

  /* Same candidate starts as the customer page (default 30-min duration). */
  function candidateTimes(branch, dateObj, dur) {
    dur = dur != null ? dur : 30;
    if (isSalon()) {
      const start = openMinsFor(branch);
      const end = closeMinsFor(branch, dateObj);
      const times = [];
      let t = start;
      if (t % 30) t += (30 - t % 30);
      for (; t + dur <= end; t += 30) times.push(minsToTime(t));
      return times;
    }
    let start = branch.start != null ? branch.start : branch.openHour;
    let end = branch.end != null ? branch.end : branch.closeHour;
    if (branch.closeHourByDay && branch.closeHourByDay[dateObj.dow] != null) {
      end = branch.closeHourByDay[dateObj.dow];
    } else if (branch.closeHourByDay && branch.closeHourByDay[String(dateObj.dow)] != null) {
      end = branch.closeHourByDay[String(dateObj.dow)];
    }
    const times = [];
    for (let h = start; h < end; h++) {
      for (const m of [0, 30]) {
        if (h === start && m === 0) continue;
        if (h === end - 1 && m === 30) continue;
        const tm = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
        if (timeToMins(tm) + dur <= hourToMins(end)) times.push(tm);
      }
    }
    return times;
  }

  function occupancySeed(branch, dateObj, dur) {
    dur = dur != null ? dur : 30;
    if (isSalon()) return hash(branch.id + "|" + dateObj.y + "-" + dateObj.mo + "-" + dateObj.d + "|" + dur);
    return hash(branch.id + "|" + dateObj.y + "-" + dateObj.mo + "-" + dateObj.d);
  }

  /* Times the customer page would show as free (before visitor bookings / blocks / "now" filter). */
  function demoFreeTimes(branch, dateObj, dur) {
    dur = dur != null ? dur : 30;
    if (!isOpen(branch, dateObj)) return [];
    const all = candidateTimes(branch, dateObj, dur);
    const seed = occupancySeed(branch, dateObj, dur);
    const free = all.filter(function (_, i) { return ((seed >> (i % 16)) & 3) !== 0; });
    return free.length ? free : all.filter(function (_, i) { return i % 3 === 0; });
  }

  function gridTimes(branch, dateObj) {
    const start = openMinsFor(branch);
    const end = closeMinsFor(branch, dateObj);
    const times = [];
    let t = start;
    if (t % 30) t -= (t % 30);
    for (; t < end; t += 30) times.push(minsToTime(t));
    return times;
  }

  function staffForBranch(branchId) {
    const kn = C().knowledge && Array.isArray(C().knowledge.branches) ? C().knowledge.branches : [];
    const br = branchById(branchId);
    const row = kn.find(function (x) {
      return x && (x.id === branchId || (br && x.name === br.name));
    });
    const list = (row && (row.staff || row.stylists || row.barbers)) || [];
    return (Array.isArray(list) ? list : []).filter(function (x) { return x && x.name; });
  }

  function staffPoolForService(branchId, serviceId) {
    const list = staffForBranch(branchId);
    if (!list.length) return list;
    const s = serviceById(serviceId);
    const hay = ((s && ((s.category || "") + " " + (s.name || ""))) || "").toLowerCase();
    let key = "";
    if (/nail|manicure|biab|acrylic|pedicure/.test(hay)) key = "nail";
    else if (/lash|brow|tint|lamination/.test(hay)) key = "lash|brow";
    else if (/facial|wax|skin/.test(hay)) key = "facial|wax";
    else if (/cut|blow|colour|color|highlight|balayage|hair/.test(hay)) key = "cut|colour|color|highlight|balayage|blow";
    if (!key) return list;
    const re = new RegExp(key, "i");
    const matched = list.filter(function (p) { return re.test(String(p.specialties || "")); });
    return matched.length ? matched : list;
  }

  function staffForSlot(branchId, stamp, time, serviceId) {
    const list = isSalon() ? staffPoolForService(branchId, serviceId) : staffForBranch(branchId);
    if (!list.length) return null;
    const key = String(branchId || "") + "|" + String(stamp || "") + "|" + String(time || "") +
      (isSalon() ? "|" + String(serviceId || "") : "");
    return list[hash(key) % list.length];
  }

  function storeKey() {
    const name = String(C().name || "demo").toLowerCase().replace(/\s+/g, "-");
    return (isSalon() ? "salonDemo.bookings." : "barberDemo.bookings.") + name;
  }
  function deskKey() {
    const name = String(C().name || "demo").toLowerCase().replace(/\s+/g, "-");
    return (isSalon() ? "salonDemo.desk." : "barberDemo.desk.") + name;
  }

  function loadVisitorBookings() {
    try {
      const raw = localStorage.getItem(storeKey());
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) { return []; }
  }
  function saveVisitorBookings(list) {
    try { localStorage.setItem(storeKey(), JSON.stringify(list)); } catch (e) {}
  }

  function emptyDesk() { return { cancelledSamples: {}, status: {}, blocks: [] }; }
  function loadDesk() {
    try {
      const raw = localStorage.getItem(deskKey());
      const d = raw ? JSON.parse(raw) : emptyDesk();
      d.cancelledSamples = d.cancelledSamples || {};
      d.status = d.status || {};
      d.blocks = Array.isArray(d.blocks) ? d.blocks : [];
      return d;
    } catch (e) { return emptyDesk(); }
  }
  function saveDesk(d) {
    try { localStorage.setItem(deskKey(), JSON.stringify(d)); } catch (e) {}
  }

  function rangeOverlap(a0, a1, b0, b1) { return a0 < b1 && a1 > b0; }

  function blockOverlaps(branchId, stamp, start, end) {
    const desk = loadDesk();
    return desk.blocks.some(function (b) {
      if (b.branch !== branchId || b.stamp !== stamp) return false;
      const bs = timeToMins(b.time);
      return rangeOverlap(start, end, bs, bs + (b.mins || 30));
    });
  }

  const FIRST_NAMES = ["Jake","Matthew","Nathan","Andrew","Ben","James","Mark","Chris","Ryan","Sam","Owen","Ethan","Joseph","Karl","Tim","Noah","Liam","Adam","Sophie","Emma","Chloe","Amber","Jade","Rachel","Kate","Olivia","Maria","Anna","Rita","Greta","Tess","Ivy","Nora","Pia","Beth","Cora","Helen","Iris","Louis","Peter"];
  const LAST_NAMES = ["Vella","Borg","Camilleri","Farrugia","Galea","Spiteri","Micallef","Azzopardi","Zammit","Attard","Pace","Cutajar","Grech","Mizzi","Tabone","Schembri","Cassar","Xuereb","Portelli","Fenech","Bonnici","Caruana","Agius","Buttigieg","Mallia","Saliba","Cini","Dimech"];

  function pickName(seed) {
    const f = FIRST_NAMES[hash(seed + "|f") % FIRST_NAMES.length];
    const l = LAST_NAMES[hash(seed + "|l") % LAST_NAMES.length];
    return { first: f, last: l, name: f + " " + l };
  }

  function sampleRef(seed) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let n = hash(seed + "|ref") >>> 0;
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars[n % chars.length];
      n = Math.floor(n / chars.length);
    }
    return "SAM-" + code;
  }

  function generateSampleBookings(branch, dateObj) {
    if (!branch || !isOpen(branch, dateObj)) return [];
    const dur = 30;
    const stamp = stampOf(dateObj);
    const all = candidateTimes(branch, dateObj, dur);
    const freeSet = {};
    demoFreeTimes(branch, dateObj, dur).forEach(function (t) { freeSet[t] = true; });
    const used = {};
    const out = [];
    const svcs = services().filter(function (s) { return s && s.mins; });
    if (!svcs.length) return out;

    all.forEach(function (tm) {
      if (freeSet[tm] || used[tm]) return;
      const start = timeToMins(tm);
      let span = 30;
      while (span < 180) {
        const next = minsToTime(start + span);
        if (freeSet[next] || used[next] || all.indexOf(next) === -1) break;
        span += 30;
      }
      const options = svcs.filter(function (s) { return s.mins <= span; });
      if (!options.length) return;
      const seed = branch.id + "|" + stamp + "|" + tm;
      const svc = options[hash(seed + "|svc") % options.length];
      const mins = svc.mins || 30;
      const steps = Math.ceil(mins / 30);
      for (let i = 0; i < steps; i++) used[minsToTime(start + i * 30)] = true;

      const person = pickName(seed);
      const phoneTail = String(10000000 + (hash(seed + "|ph") % 90000000)).slice(0, 8);
      const source = (hash(seed + "|src") % 5) === 0 ? "Phone" : "Walk-in";
      const staff = staffForSlot(branch.id, stamp, tm, svc.id);
      out.push({
        ref: sampleRef(seed),
        name: person.name,
        phone: "+356" + phoneTail,
        email: person.first.toLowerCase() + "." + person.last.toLowerCase() + "@example.com",
        branch: branch.id,
        branchName: branch.name,
        address: branch.address,
        service: svc.name,
        serviceId: svc.id,
        price: svc.price,
        mins: mins,
        stamp: stamp,
        time: tm,
        when: tm,
        barber: staff ? staff.name : "",
        barberFirst: staff ? String(staff.name).split(/\s+/)[0] : "",
        source: source,
        sample: true
      });
    });
    return out;
  }

  function visitorOverlaps(visitors, branchId, stamp, start, end, exceptRef) {
    return visitors.some(function (b) {
      if (b.branch !== branchId || b.stamp !== stamp) return false;
      if (exceptRef && b.ref === exceptRef) return false;
      const bs = timeToMins(b.time);
      return rangeOverlap(start, end, bs, bs + (b.mins || 30));
    });
  }

  function bookingsForDay(branch, dateObj) {
    const stamp = stampOf(dateObj);
    const desk = loadDesk();
    const visitors = loadVisitorBookings().filter(function (b) {
      return b.branch === branch.id && b.stamp === stamp;
    }).map(function (b) {
      const copy = Object.assign({}, b, {
        source: b.source || "Assistant",
        sample: false,
        status: desk.status[b.ref] || b.status || ""
      });
      return copy;
    });
    const samples = generateSampleBookings(branch, dateObj).filter(function (s) {
      if (desk.cancelledSamples[s.ref]) return false;
      if (visitorOverlaps(visitors, branch.id, stamp, timeToMins(s.time), timeToMins(s.time) + (s.mins || 30))) return false;
      if (blockOverlaps(branch.id, stamp, timeToMins(s.time), timeToMins(s.time) + (s.mins || 30))) return false;
      s.status = desk.status[s.ref] || "";
      return true;
    });
    const blocks = desk.blocks.filter(function (b) {
      return b.branch === branch.id && b.stamp === stamp;
    }).map(function (b) {
      return Object.assign({}, b, {
        name: "Blocked",
        service: "Blocked time",
        source: "Block",
        sample: false,
        block: true,
        price: 0,
        barber: b.staffName || b.barber || "",
        status: ""
      });
    });
    return visitors.concat(samples, blocks);
  }

  function cancelBooking(ref) {
    const list = loadVisitorBookings();
    const vis = list.find(function (b) { return b.ref === ref; });
    if (vis) {
      saveVisitorBookings(list.filter(function (b) { return b.ref !== ref; }));
      return { kind: "visitor" };
    }
    const desk = loadDesk();
    const block = desk.blocks.find(function (b) { return b.ref === ref || b.id === ref; });
    if (block) {
      desk.blocks = desk.blocks.filter(function (b) { return (b.ref || b.id) !== ref; });
      saveDesk(desk);
      return { kind: "block" };
    }
    desk.cancelledSamples[ref] = true;
    saveDesk(desk);
    return { kind: "sample" };
  }

  function setStatus(ref, status) {
    const desk = loadDesk();
    if (!status) delete desk.status[ref];
    else desk.status[ref] = status;
    saveDesk(desk);
  }

  function addBlock(block) {
    const desk = loadDesk();
    desk.blocks.push(block);
    saveDesk(desk);
  }

  global.DemoSchedule = {
    isSalon: isSalon,
    placeWord: placeWord,
    staffWord: staffWord,
    staffLabel: staffLabel,
    payInLabel: payInLabel,
    euro: euro,
    hash: hash,
    timeToMins: timeToMins,
    minsToTime: minsToTime,
    maltaNow: maltaNow,
    addDays: addDays,
    stampOf: stampOf,
    dateFromStamp: dateFromStamp,
    offsetFromStamp: offsetFromStamp,
    branches: branches,
    branchById: branchById,
    services: services,
    serviceById: serviceById,
    isOpen: isOpen,
    openMinsFor: openMinsFor,
    closeMinsFor: closeMinsFor,
    candidateTimes: candidateTimes,
    demoFreeTimes: demoFreeTimes,
    gridTimes: gridTimes,
    staffForBranch: staffForBranch,
    staffForSlot: staffForSlot,
    storeKey: storeKey,
    loadVisitorBookings: loadVisitorBookings,
    saveVisitorBookings: saveVisitorBookings,
    loadDesk: loadDesk,
    saveDesk: saveDesk,
    blockOverlaps: blockOverlaps,
    generateSampleBookings: generateSampleBookings,
    bookingsForDay: bookingsForDay,
    cancelBooking: cancelBooking,
    setStatus: setStatus,
    addBlock: addBlock,
    rangeOverlap: rangeOverlap
  };
})(window);
