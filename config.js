/* Shared shop + customer-page config. Edit this file to customise the demo. */
var CONFIG = {
    name: "Liora Studio",
    kind: "salon",
    staffWord: "stylist",
    staffLabel: "Stylist",
    placeWord: "salon",
    brandHtml: "Liora <span>Studio</span>",
    phone: "+356 0000 1111",
    callLabel: "Call \u00a00000 1111",
    timeZone: "Europe/Malta",
    currency: "€",

    colors: {
      bg: "#faf4ef",
      bg2: "#fff7f2",
      surface: "#ffffff",
      line: "#eddcd3",
      gold: "#c45c6e",
      gold2: "#e08a98",
      text: "#3a2a2c",
      muted: "#8a7370",
      soft: "#5c4a48",
    },

    demoBanner: {
      show: true,
      text: "Demo — this could be your salon"
    },

    metaTitle: "Liora Studio — Hair, nails, lashes. Prices up front.",
    metaDescription: "Demo beauty salon website for Malta. Hair, nails, lashes and brows with prices and the next free times on the first screen. Book in two taps or via chat.",

    headlineHtml: "Hair, nails, lashes.<br>Prices up front.",
    tagline: "See the price, pick a time, you’re booked.",
    kicker: "",

    copy: {
      bookNow: "Book now",
      callShop: "Call the salon",
      hint: "Tap a service, then a time. Or book in the chat — it only takes a minute.",
      servicesTitle: "Services & prices",
      pricesNote: "Example prices for this demo — a real salon would show its own.",
      slotsTitleToday: "Next free slots today",
      slotsTitleTomorrow: "Next free slots tomorrow",
      slotsTitleOther: "Next free slots {day}",
      serviceExamples: "gel manicure, balayage, lash lift",
      catchService: "I didn't quite catch which service you meant — you can use a button, or type {examples}.",
      catchGeneric: "Sorry, I didn't quite catch that. You're welcome to ask about times, prices or services, or pick a button below.",
      payInPlace: "pay in salon",
      slotsNote: "Demo availability — not a live calendar. Times respect each service’s duration.",
      branchesTitle: "Three studios, one number",
      branchesLede: "Pick the closest studio. Call or open maps.",
      reviewsTitle: "What clients say",
      reviewsLede: "Short and useful — the kind of reviews people actually read.",
      footerBlurb: "A demo website for Malta beauty salons, nail studios and lash bars.",
      footerFine: "This is a pitch mockup, not a live salon. Names, addresses, prices and times are examples. Bookings stay on this page — nothing is charged, and you pay in the salon.",
      stickyReady: "Ready to book?",
      stickyHint: "Service, time, done."
    },

    aiEndpoint: "https://barber-demo-ai.mackan83.workers.dev/",

    chat: {
      title: "Booking assistant",
      subtitle: "Demo chat — no live calendar",
      greeting: "Hello — I can help you book a visit. Which studio would you prefer?"
    },

    heroAside: {
      trust: { rating: "4.9", countLabel: "200+ Google reviews", note: "Demo data" },
      benefits: [
        { id: "fees", label: "No booking fees", icon: "tag" },
        { id: "pay", label: "Pay in salon", icon: "card" },
        { id: "instant", label: "Instant confirmation", icon: "check" },
        { id: "change", label: "Change or cancel anytime", icon: "calendar" }
      ],
      quote: {
        text: "Booked a gel manicure in two taps and the price was right there. No hunting through menus.",
        who: "Maya · Sliema"
      },
      hoursLine: "",
      chatButton: "Chat with our assistant"
    },

    services: [
      { id: "cutblow", name: "Cut & blow-dry", category: "Hair", price: 32, mins: 60, aliases: ["cut", "blow dry", "blow-dry", "haircut", "trim", "hair cut"] },
      { id: "colour", name: "Colour (roots)", category: "Hair", price: 55, mins: 90, aliases: ["color", "roots", "tint hair", "dye"] },
      { id: "highlights", name: "Highlights", category: "Hair", price: 85, mins: 120, aliases: ["highlight", "foils"] },
      { id: "balayage", name: "Balayage", category: "Hair", price: 110, mins: 150, aliases: ["bala", "balyage"] },
      { id: "gelmani", name: "Gel manicure", category: "Nails", price: 30, mins: 60, aliases: ["gel", "manicure", "gel man", "nails"] },
      { id: "biab", name: "BIAB", category: "Nails", price: 40, mins: 75, aliases: ["builder", "builder gel", "biab nails"] },
      { id: "acrylic", name: "Acrylic full set", category: "Nails", price: 48, mins: 90, aliases: ["acrylic", "full set", "extensions"] },
      { id: "pedi", name: "Pedicure", category: "Nails", price: 35, mins: 50, aliases: ["pedi", "foot"] },
      { id: "lashlift", name: "Lash lift", category: "Lashes & brows", price: 40, mins: 60, aliases: ["lash", "lash lift", "lashes"] },
      { id: "browlam", name: "Brow lamination", category: "Lashes & brows", price: 35, mins: 45, aliases: ["lamination", "brow lam", "brow lift"] },
      { id: "tint", name: "Brow or lash tint", category: "Lashes & brows", price: 12, mins: 20, aliases: ["tint", "dye brows", "lash tint"] },
      { id: "lashcombo", name: "Lash lift + tint", category: "Lashes & brows", price: 48, mins: 75, aliases: ["lift and tint", "lash lift and tint"] },
      { id: "facial", name: "Express facial", category: "Skin", price: 40, mins: 45, aliases: ["facial", "face"] },
      { id: "browwax", name: "Brow wax", category: "Skin", price: 10, mins: 15, aliases: ["wax brows", "eyebrow wax"] },
      { id: "legwax", name: "Half leg wax", category: "Skin", price: 18, mins: 30, aliases: ["wax", "leg wax", "half leg"] }
    ],

    branches: [
      {
        id: "sliema",
        name: "Sliema",
        address: "18 Triq Santa Marija, Tas-Sliema",
        hours: "Mon–Sat 09:30–19:00",
        closedLabel: "Closed Sun",
        openDays: [1, 2, 3, 4, 5, 6],
        openHour: 9.5,
        closeHour: 19,
        maps: "https://www.google.com/maps/search/?api=1&query=Triq+Santa+Marija+Sliema+Malta",
        aliases: ["sliema", "sliem", "tigne", "tigné"]
      },
      {
        id: "bkr",
        name: "Birkirkara",
        address: "9 Triq Santa Rita, Birkirkara",
        hours: "Mon–Sat 09:00–18:30",
        closedLabel: "Closed Sun",
        openDays: [1, 2, 3, 4, 5, 6],
        openHour: 9,
        closeHour: 18.5,
        maps: "https://www.google.com/maps/search/?api=1&query=Triq+Santa+Rita+Birkirkara+Malta",
        aliases: ["birkirkara", "bkr", "b'kara", "bkara", "kara"]
      },
      {
        id: "gzira",
        name: "Gżira",
        address: "4 Triq ix-Xatt, Il-Gżira",
        hours: "Mon–Fri 10:00–19:00, Sat 09:00–17:00",
        closedLabel: "Closed Sun",
        openDays: [1, 2, 3, 4, 5, 6],
        openHour: 10,
        closeHour: 19,
        closeHourByDay: { "6": 17 },
        maps: "https://www.google.com/maps/search/?api=1&query=Triq+ix-Xatt+Gzira+Malta",
        aliases: ["gzira", "gżira", "gzira", "msida side", "xatt"]
      }
    ],

    knowledge: {
      languages: ["English", "Maltese", "Italian"],
      payment: {
        methods: ["Cash", "debit or credit card", "contactless"],
        online: false,
        note: "Pay in the salon after your appointment. No online payment, no deposits on the website."
      },
      contactPrivacy: "Phone and email are only used for your booking, so the salon can reach you and you can easily change or cancel.",
      walkIns: "Walk-ins are welcome if a stylist is free. Bookings take priority, especially on Saturdays and for colour, balayage and acrylics.",
      cancellation: "Cancel free of charge up to 2 hours before your time. If it is later than that, please call the salon so we can try to fill the time.",
      late: "We hold a booking for 10 minutes. After that the slot may go to a walk-in, and we will offer you the next free time.",
      noShow: "Please cancel if you cannot come. After two no-shows we may ask you to book by phone only.",
      kids: "We welcome children for a simple trim or a kids’ nail polish with an adult present. Under 12s are best earlier in the day. We do not offer chemical colour or acrylics for young children — please call if you are unsure.",
      hygiene: "Metal tools are sterilised after every client, single-use files and buffers are not shared, and each client gets a fresh towel and a clean cape or gown.",
      products: [
        { name: "House hand cream", price: 12 },
        { name: "Cuticle oil", price: 10 },
        { name: "Brow gel", price: 14 },
        { name: "Leave-in hair mist", price: 16 }
      ],
      productsNote: "Sold in the salon after your visit — ask your stylist. Prices are examples for this demo.",
      giftVouchers: "Gift vouchers are sold in the salon only, from €20 up (or fixed €25, €40, €60). Valid for 12 months. Not sold online.",
      groups: "For a bridal party, two or more colour clients, or a group of four and over, please call at least 2 weeks ahead so we can put more than one stylist on. Saturday mornings in Sliema usually work best.",
      holidays: "Closed on Sundays and public holidays. On Christmas Eve and New Year's Eve we close at 14:00 if that day is otherwise a working day — worth a quick call to confirm.",
      aftercare: "For gel, BIAB and acrylics, avoid soaking your hands for the first day. For a lash lift or brow lamination, keep the area dry for 24 hours and skip mascara or brow makeup that day. We will talk you through it before you leave.",
      pregnancy: "We can do a gentle express facial, a brow wax, a manicure or a pedicure during pregnancy. Please mention it when you book. We prefer to skip strong chemical colour and some waxing on the belly or face — call us and we will advise.",
      services: [
        { id: "cutblow", name: "Cut & blow-dry", price: 32, mins: 60, includes: "Consultation, wash, a scissors cut, and a blow-dry finish. For all hair lengths." },
        { id: "colour", name: "Colour (roots)", price: 55, mins: 90, includes: "A root tint, processing time, wash, and a simple blow-dry. A full head of permanent colour is quoted in the salon if you need more than the roots." },
        { id: "highlights", name: "Highlights", price: 85, mins: 120, includes: "Foil highlights through the hair, toner if needed, wash, and a blow-dry. About two hours." },
        { id: "balayage", name: "Balayage", price: 110, mins: 150, includes: "Hand-painted lightening, toner, treatment, and a blow-dry. Allow about two and a half hours." },
        { id: "gelmani", name: "Gel manicure", price: 30, mins: 60, includes: "File, cuticle care, gel colour on natural nails, and a slow, even cure. Removal of an old gel from us is included; a soak-off from another salon may add a few minutes." },
        { id: "biab", name: "BIAB", price: 40, mins: 75, includes: "Builder-in-a-bottle overlay on natural nails, with gel colour if you like, for added strength." },
        { id: "acrylic", name: "Acrylic full set", price: 48, mins: 90, includes: "New acrylic extensions, shaped and finished with gel colour. Infills are offered in the salon on request — please call for that price." },
        { id: "pedi", name: "Pedicure", price: 35, mins: 50, includes: "Soak, file, cuticle care, a short massage, and polish or a gel finish on request (gel is the same listed price in this demo)." },
        { id: "lashlift", name: "Lash lift", price: 40, mins: 60, includes: "A lift on your natural lashes. Add a tint for a deeper finish — or book the lash lift + tint together." },
        { id: "browlam", name: "Brow lamination", price: 35, mins: 45, includes: "Brow hairs are set into a fuller shape. A tint can be added; ask when you arrive or book a tint on its own." },
        { id: "tint", name: "Brow or lash tint", price: 12, mins: 20, includes: "A tint for brows or lashes only. Patch tests are recommended if you have not had a tint with us before — call ahead if you can." },
        { id: "lashcombo", name: "Lash lift + tint", price: 48, mins: 75, includes: "Lash lift and a tint in one visit, a little less than booking both apart." },
        { id: "facial", name: "Express facial", price: 40, mins: 45, includes: "A cleanse, a short treatment, and a moisturiser, suited to a lunch break. Not a deep peel." },
        { id: "browwax", name: "Brow wax", price: 10, mins: 15, includes: "A tidy wax and tweeze for the brows." },
        { id: "legwax", name: "Half leg wax", price: 18, mins: 30, includes: "A half-leg wax to the knee. Full leg and other waxing can be arranged by phone." }
      ],
      branches: [
        {
          id: "sliema",
          name: "Sliema",
          address: "18 Triq Santa Marija, Tas-Sliema",
          hours: "Monday–Saturday 09:30–19:00. Closed Sunday and public holidays.",
          parking: "Paid parking near Sliema Ferries and in the side streets off Triq Santa Marija. The seafront is often busy on Saturdays.",
          bus: "Buses along The Strand / Triq ix-Xatt stop a short walk from the studio, near the Ferries.",
          accessibility: "First floor, up a short flight of stairs. There is no lift. Please call if you need a ground-floor appointment at another branch.",
          staff: [
            { name: "Elena Vella", specialties: "Colour, highlights and balayage" },
            { name: "Maya Camilleri", specialties: "Cuts, blow-dry and styling" },
            { name: "Nina Galea", specialties: "Gel, BIAB and acrylic nails" }
          ]
        },
        {
          id: "bkr",
          name: "Birkirkara",
          address: "9 Triq Santa Rita, Birkirkara",
          hours: "Monday–Saturday 09:00–18:30. Closed Sunday and public holidays.",
          parking: "Street parking around the parish and a public car park a few minutes’ walk. Evenings can be tight.",
          bus: "Buses serving Birkirkara Centre and the Interchange stop within a short walk of Triq Santa Rita.",
          accessibility: "Ground floor, step-free from the pavement, with a slightly narrow door. Staff will help if you need it.",
          staff: [
            { name: "Sara Attard", specialties: "Lash lifts, brow lamination and tints" },
            { name: "Claire Borg", specialties: "Nails, gel and pedicures" },
            { name: "Hannah Micallef", specialties: "Cuts, colour and blow-dry" }
          ]
        },
        {
          id: "gzira",
          name: "Gżira",
          address: "4 Triq ix-Xatt, Il-Gżira",
          hours: "Monday–Friday 10:00–19:00, Saturday 09:00–17:00. Closed Sunday and public holidays.",
          parking: "Paid parking along the Gżira front and in nearby side streets. Weekday lunchtimes are usually easier than Saturday.",
          bus: "Buses along the Gżira / Msida seafront stop close to the studio.",
          accessibility: "Ground floor, level with the pavement. The doorway is a comfortable width for a buggy or a wheelchair.",
          staff: [
            { name: "Julia Farrugia", specialties: "Express facials and waxing" },
            { name: "Petra Azzopardi", specialties: "Gel, BIAB and acrylic nails" },
            { name: "Lea Spiteri", specialties: "Lash lifts, brows and tints" }
          ]
        }
      ],
      faqs: [
        { q: "Do I need an appointment?", a: "Booking is recommended, especially for colour, balayage and acrylics. Walk-ins are welcome if a stylist is free; bookings go first." },
        { q: "Do you do gel nails?", a: "Yes. A gel manicure is €30 and takes about 60 minutes. We also offer BIAB and acrylic full sets." },
        { q: "Are you open on Sunday?", a: "No. All three studios are closed on Sundays and public holidays." },
        { q: "What languages do you speak?", a: "English and Maltese in every studio, and Italian at the Sliema branch." }
      ]
    },

    reviews: [
      { stars: 5, text: "Booked a gel manicure in two taps and the price was right there. No hunting through menus.", who: "Maya · Sliema" },
      { stars: 5, text: "Lovely lash lift, on time, and they told me the aftercare without rushing. I’ll be back.", who: "Sara · Birkirkara" },
      { stars: 5, text: "Had a cut and blow-dry in Gżira. Honest price on the first screen and I was seen on time.", who: "Lea · Gżira" }
    ]
  };
