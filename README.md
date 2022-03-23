# Bounce Checkout

## Notes to my Solution

- Retry: to test out the "retry" functionality I added a const MIN_AMOUNT_OF_RETRIES set to 1 inside index.tsx
- Steps: I used an Enum Steps to handle the sequential flow of the different steps and to make it possible to add new steps easily!
- User State and Inputs: I stored most of the usable user inputs in the URL query parameters to make it possible for the user to never lose any important input when refreshing or restoring a session. The only field I didn't consider saving in the URL is the credit card due to privacy and security, we don't want the user to share the page with friends, carrying around in the URL the credit card ;-D
- Future Improvements: I hardcoded a single state "isEditingPerson" and added a TODO comment cause it might be interesting to consider how we want to approach the editing of previous fields using a single state object. I didn't implement it cause I would need to understand better what would happen if we had 10 different fields, would all of them be editable after having moved to the following steps?

## Local Setup

To run the project locally make sure to have installed Node.js and Yarn then launch in the terminal:

```bash
yarn install && yarn dev
```

This will open up the local development of Next.js on `localhost:3000`

## Live Online Demo

You can find an online version of this project here: https://bounce-checkout.vercel.app/

## Libraries used

1.  "next", "react", "react-dom" to use React with Next.js;
2.  "tailwindcss" used to style the UI elements;
3.  "concurrently" to run in parallel tailwind and nextjs locally during development.
