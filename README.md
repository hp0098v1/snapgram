# Title

Snapgram social media app

## Demo:

Access my site at [snapgram-hp0098v1.vercel.app](http://snapgram-hp0098v1.vercel.app)

## Table Of Contents:

- [About](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)

## Aboout The App:

A modern social app with a stunning UI with a native mobile feel, a special tech stack, an infinite scroll feature, and amazing performance using React JS, Appwrite, TypeScript, and more.

## Screenshots

![picture alt](/screenshots/signin.png "sign in")
![picture alt](/screenshots/explore.png "explore")

## Technologies

Main lib's: `React js`, `Typescript`, `Zustand`, `React Query`, `React Hook Form`, `Zod`

Backend: `appwrite`

Styling lib's: `Shadcn`, `Tailwindcss`

## Setup <a name="setup"></a>

- Download or clone repository
- run `npm install`
- add env.local variables (Get vars from appwrite)

```js
VITE_APPWRITE_PROJECT_ID=...
VITE_APPWRITE_URL=...
VITE_APPWRITE_STORAGE_ID=...
VITE_APPWRITE_DATABASE_ID=...
VITE_APPWRITE_SAVES_COLLECTION_ID=...
VITE_APPWRITE_POST_COLLECTION_ID=...
VITE_APPWRITE_USER_COLLECTION_ID=...
```

- run `npm run dev`
