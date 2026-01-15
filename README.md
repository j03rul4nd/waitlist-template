# Modern Business Card — Next.js

A modern landing page built with **Next.js** that includes a waiting list / early access form.  
Form submissions are handled via a **Next.js Route Handler** and emails are sent using **Resend**.

---

## Requirements

- Node.js 18+ (Node 20 recommended)
- npm / yarn / pnpm
- A Resend account with an active API key

---

## Environment Variables (Required)

This project requires **two environment variables** to send emails from the `/api/waitlist` endpoint:

- `RESEND_API_KEY` → Your Resend API key
- `CONTACT_EMAIL` → Email address that will receive form submissions

### Example (do NOT commit real keys)

Create a `.env.local` file in the root of the project:

```bash
RESEND_API_KEY=REPLACE_WITH_YOUR_RESEND_KEY
CONTACT_EMAIL=destination@email.com
````

> ✅ `.env.local` must NOT be committed to the repository.

---

## Install & Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` and add the required environment variables.

3. Start the development server:

```bash
npm run dev
```

Open:

* [http://localhost:3000](http://localhost:3000)

---

## Production Build (Local)

```bash
npm run build
npm run start
```

---

## Deploying to Vercel (Recommended)

1. Push the repository to GitHub / GitLab / Bitbucket.
2. Go to **Vercel → New Project** and import the repository.
3. Open **Project Settings → Environment Variables** and add:

* `RESEND_API_KEY` = your Resend API key
* `CONTACT_EMAIL` = destination email address

4. Deploy the project.

> ⚠️ If you update environment variables, you must redeploy the project.

---

## Deploying to Other Platforms (Railway / Render / VPS)

General steps:

1. Configure environment variables in the platform or server:

   * `RESEND_API_KEY`
   * `CONTACT_EMAIL`

2. Install dependencies and build the project:

```bash
npm install
npm run build
```

3. Start the server:

```bash
npm run start
```

Make sure the platform exposes the correct port (Next.js uses port `3000` by default).

---

## Form Behavior

* The form submits data via:

  * `POST /api/waitlist`
* The backend validates the request and sends an email using Resend to `CONTACT_EMAIL`.

### Form Fields Sent

The frontend sends the following fields:

* `firstName`
* `lastName`
* `phone`
* `email`

These fields must match what the API route expects.

---

## Troubleshooting

### Emails are not being received

* Verify `RESEND_API_KEY` is valid.
* Verify `CONTACT_EMAIL` is correct.
* Resend may require a verified domain for the `from` address. Check your Resend dashboard.

### 400 – Invalid data

* Ensure the frontend is sending `firstName`, `lastName`, `phone`, and `email`.
* Ensure the email address format is valid.

### 500 – Internal server error

* Usually caused by:

  * Missing environment variables
  * Invalid Resend configuration
  * API key issues

Check server logs for details.

---

## Security Notes

* **Never** commit API keys to the repository.
* Always configure secrets via environment variables in the deployment platform.

---
