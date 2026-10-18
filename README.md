# Gik Social Network starter — main branch

This starter contains a responsive frontend prototype and a separate Gik Control Center page.

## Included
- Home feed, post composer, demo likes and saved posts
- Stories, friend search, demo friend requests
- Video discovery, communities, groups
- Live Studio page, Messenger demo, profile, notifications
- Separate `admin.html` dashboard interface for users, reports, communities, live sessions, settings

## Important
This is not yet a production social network. Real accounts, secure login, database persistence, media uploads, actual video playback, real-time messaging, live broadcasting, moderation actions, and protected admin permissions require backend services. The dashboard is a visual prototype and is not yet access-controlled.

## Build
Requires Node.js:
```sh
npm install
npm run build
```
This generates the static site in `dist/`.

## Cloudflare Pages settings
- GitHub branch: `main`
- Root directory: `/`
- Build command: `npm run build`
- Build output directory: `dist`

Use Cloudflare Pages' Git integration to publish the `dist` output. Don't use `npx wrangler deploy --assets ./dist` as a Pages deploy command.
