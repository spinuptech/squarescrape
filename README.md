# squarescrape

> a tool to scrape events and blog entries from a squarespace feed into an email-friendly html format

## Development
1. Generate a new private key (https://console.firebase.google.com/u/0/project/{NAME_OF_YOUR_PROJECT}settings/serviceaccounts/adminsdk)
2. Store that in a new file called `./squarescrape-key.json`
3. Run `firebase login`
4. Run `npm run dev`

### Notes on functions
If you change things in the `functions` folder, you'll need to stop and restart the `dev` process above. You can also just develop on the functions by:
```bash
cd functions
npm run dev
```

## Deployment
The deployment requires that:
1. You have a firebase project
2. Modify `firebase.json` and `src/api.ts` with your firebase project details
3. Have your projet setup as a Blaze pay as you go plan in firebase
4. Requires a dependency of `npm i -g firebase-tools` to be on the machine

Then:
1. Run `firebase login` to authenticate with firebase
2. Run `firebase deploy` to deploy all the things (`functions`, `hosting`)

Alternatively, this can be done via github.
1. Clone this repo to your GitHub account
2. Run `firebase login:ci` locally to get a `FIREBASE_TOKEN`
3. Store that as a secret in your GitHub repo (called `FIREBASE_TOKEN`)
4. When you push to `master`, the action will run, build, and deploy your stuff to Firebase 😎.

## Roadmap
- Add multiple templates to choose from
- Add authentication and storing of feeds

R&D Stuff

- Add changelog and release notes flow
- Add `husky` to run some checks prior to release 