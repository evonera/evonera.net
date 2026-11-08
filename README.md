# Evonera Technologies Pvt Ltd

Company website for Evonera Technologies Pvt Ltd. Services include building bespoke, high-converting websites for businesses and restaurants, and helping founders finish, fix, and launch web apps started with Lovable, Emergent, and other AI builders.

## Stack

- Astro with static output
- Tailwind CSS v4
- React islands for the project inquiry form
- Cloudflare Pages deployment

## Main pages

- `/`: Bespoke websites and AI app completion offer, process, pricing note, and inquiry form
- `/restaurants`: Bespoke editorial websites for independent dining rooms and restaurants
- `/fix-my-ai-site`: focused AI app project rescue page
- `/lovable` and `/emergent`: platform-specific project pages
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
