# Vantage Technologies — website starter

A responsive, single-page website starter using the supplied Vantage logo. Built with plain HTML, CSS and JavaScript so it can be uploaded from an iPad without a build step.

## Included
- Animated opening sequence: tool-inspired symbols, Vantage wordmark, then a logo shine transition
- Responsive homepage and product cards
- Admin portal to add, edit and delete products
- Product image uploads
- Product access request form and request status dashboard
- Shared storage on Netlify, so every visitor sees the same live data

## Live global sync
Products, uploaded images and access requests are stored on Netlify (Netlify Database for records, Netlify Blobs for images) and served through functions in `netlify/functions`. Every open copy of the site holds a live connection (`/api/live`), so admin changes and new requests are pushed to every visitor worldwide in about a second, without reloading — similar to a Firebase realtime database.

Admin actions are verified on the server. Set an `ADMIN_CODE` environment variable in the Netlify dashboard (Project configuration → Environment variables) to choose a private admin code; until it is set, the old demo code `2513` keeps working. Request contact details are only returned to signed-in admins.

## Hosting
The site is hosted on Netlify and deploys automatically from the `main` branch. The page itself lives in `public/index.html`. Static hosts such as GitHub Pages cannot run the database and functions, so live sync only works on Netlify.

## Customization
- Change the sample product cards from the admin dashboard; edits publish to everyone.
- Update the text and visual theme in `public/index.html`.
- Change the admin code with the `ADMIN_CODE` environment variable on Netlify (it is checked on the server, not in the page).
