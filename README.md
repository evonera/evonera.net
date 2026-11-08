# Evonera Technologies Pvt Ltd

Company website for Evonera Technologies Pvt Ltd. The main offer is helping founders finish, fix, and launch web apps started with Lovable, Emergent, and other AI builders. The site also has a separate page for Evonera's own software products.

## Stack

- Astro with static output
- Tailwind CSS v4
- React islands for the project inquiry form
- Cloudflare Pages deployment

## Main pages

- `/`: AI app rescue offer, process, pricing note, products, and inquiry form
- `/fix-my-ai-site`: focused project rescue page
- `/lovable` and `/emergent`: platform-specific project pages
- `/ventures`: Evonera's own products
- `/services`, `/pricing`, and `/contact`: supporting service and inquiry details
- `/privacy` and `/terms`: site policies

The inquiry form prepares an email draft addressed to `connect@evonera.net`. A visitor must send the message from their email app; the static site does not store submissions.

## Development

Start the background development server with:

```sh
astro dev --background
```

Manage it with `astro dev status`, `astro dev logs`, and `astro dev stop`.

## Deployment

Build the static site with `npm run build` and deploy the generated `dist/` directory to Cloudflare Pages.
