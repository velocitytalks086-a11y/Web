# Vantage Technologies — website starter

A responsive, single-page website starter using the supplied Vantage logo. Built with plain HTML, CSS and JavaScript so it can be uploaded from an iPad without a build step.

## Included
- Animated opening sequence: tool-inspired symbols, Vantage wordmark, then a logo shine transition
- Responsive homepage and product cards
- Admin demo (code `2513`) to add, edit and delete products
- Image/product image upload for the local demo
- Product access request form and request status dashboard
- Local browser storage, so it works immediately as a prototype

## Important: local demo vs global website
This version is a working **local prototype**. Products, uploaded images, and requests are saved in the browser that is currently using the site. They do **not** automatically synchronize between visitors or devices yet.

The admin code is visible in the JavaScript source and is only a demo gate. Do not publish this version as a secure admin system or store private/confidential requests in it.

To enable global real-time sync for production:
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firebase Authentication and choose an admin sign-in method.
3. Create a Realtime Database (or Cloud Firestore) and configure security rules so public visitors can read published products and submit requests, but only authenticated admins can create/edit/delete products or view/manage all requests.
4. Use Firebase Storage for product/logo images, with rules that restrict uploads to authenticated admins.
5. Add the Firebase web app configuration to the site and replace the demo code gate with Firebase Authentication. Never rely on a secret or PIN embedded in public JavaScript.
6. Test the rules with Firebase Rules Playground before publishing.

The Firebase Spark plan has no-cost quotas, but usage and feature availability vary; check the current Firebase pricing page. Storage, hosting, database quotas, and any required billing-plan changes can vary by setup.

## Publish free with GitHub Pages (iPad-friendly)
1. Open https://github.com/ and create a new repository, e.g. `vantage-technologies`.
2. Upload `index.html`, `README.md`, and the `assets` folder (including `assets/vantage-logo.jpeg`) to the repository root. On GitHub in Safari, use **Add file → Upload files**.
3. Open the repository's **Settings → Pages**.
4. Under the build/deployment source, select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
5. Wait for GitHub Pages to publish and open the URL shown in Settings → Pages.

GitHub Pages is static hosting. It can host this front-end for free on eligible GitHub Free repositories, but it does not provide a database or secure server-side admin code. Use Firebase or another backend for global shared data.

## Customization
- Change the sample product cards from the admin dashboard once you have opened the site in the same browser.
- Update the text and visual theme in `index.html`.
- The default admin demo code is in the `ADMIN_CODE` constant. Changing it does not make it secure because client-side JavaScript is public.
