# Liora Studio — beauty salon demo template

A single-file, sales-first website for Malta beauty salons, nail studios and lash/brow bars. Open `index.html` in a browser — no server needed. Bookings stay on the page (no payments; clients pay in the salon).

The default demo is a fictional salon called **Liora Studio**, with branches in Sliema, Birkirkara and Gżira. Names, addresses, prices and reviews are examples, marked as demo data.

## Customise for a client

Edit the commented `CONFIG` block at the top of `index.html`. Everything on the page is filled from it:

- **Identity** — `name`, `kind` (`salon`), `staffWord` / `staffLabel`, `placeWord`, `brandHtml`, `tagline`, `headlineHtml`, `kicker`, colours
- **Contact** — `phone`, `callLabel` (tap-to-call only)
- **Branches** — name, address, hours, `openDays` (0 = Sunday), `openHour` / `closeHour` (decimals allowed, e.g. `9.5` for 09:30), optional `closeHourByDay`, Google Maps link, chat `aliases`
- **Services** — name, `category`, `price`, `mins`, `aliases` for typed chat. Slot times respect each service’s duration and will not overlap an existing booking.
- **Times** — leave `sampleSlots` off a branch to auto-fill demo times from opening hours
- **Reviews, chat greeting, copy, footer**
- **Desktop hero column** — `heroAside` (trust strip, benefit tiles, a short review quote, hours line, chat button). It only shows on desktop.
- **Knowledge** — `knowledge` is the salon fact pack the assistant is allowed to use (services in detail, hours, parking, policies, stylists, FAQs). Keep prices and hours in line with `services` and `branches`.
- **Demo banner** — set `demoBanner.show` to `false` when this is no longer a pitch demo
- **AI** — `aiEndpoint` is set to the shared booking Worker. The front end sends `kind`, `staffWord` and `placeWord` so the same Worker can serve the barber demo and this salon demo. Leave `aiEndpoint` empty to use only the built-in scripted chat.

Reload the page to see the changes. You do not need to edit the CSS or the rest of the JavaScript unless you want to change the layout.

Booked times are stored in the browser (`localStorage`) and show as taken, including the full duration of the service. Prices and availability in the default config are examples.

A matching back-office calendar lives at `shop.html` (also linked from the footer and the booked card). It uses the same `CONFIG` and availability generator, and shows bookings made in the chat.
