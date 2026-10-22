# Trust Box safe email fallback — Codex F14

**Date:** 22 October 2026  
**Repository:** `mfs9697/inmech-site`  
**Scope:** only the Ukrainian and English Trust Box pages, their shared client script and a security regression.

## Problem

The audit found that the previous `<form>` with `<textarea name="message">` and a `type="submit"` button omitted `action` and `method`. When JavaScript was disabled, unavailable or failed to attach the submit handler, pressing the button could issue a **GET** to the page's own URL with the appeal as `?message=...`. That could expose sensitive appeal text in browser history, web-server logs or related URL-handling systems. This finding describes a possible fallback; no actual confidential appeal or exploitation was observed.

## Repair

- Replace the HTML `form` with a semantically labeled, non-submitting email composer `div`. The message textarea is no longer assigned a `name` attribute; neither the composer nor its button can submit a native request to the static website.
- Keep the direct, localized `mailto:` link visible at all times; it is usable without JavaScript and does **not** prefill the message body. With scripting disabled, `<noscript>` explicitly instructs visitors to copy their message into their mail application and use that link.
- The additional **Prepare email / Підготувати лист** control is `type="button"` and starts `hidden`. The shared `src/scripts/trust-box.ts` reveals it **only after** attaching a working `click` handler. The handler builds a `mailto:` draft with URL-encoded subject and body. It never sends a network request or submits data to the Institute website.
- Explain clearly in both languages that the user must send the message from their mail client. No backend appeal storage, guaranteed delivery, or anonymous messaging is introduced or implied.
- The visible email link and published Institute email address remain available if the script cannot initialize.

This intentionally removes the native HTML form submission behavior: the website is static and has no safe receiving endpoint. Real email delivery still depends on the visitor's configured mail application and their explicit send action.

## Automated regression

`npm run check:trust-box` is now part of `npm run validate`. It verifies on **both built localized pages**:

- no `<form>` or `name="message"` in the composer;
- labeled textarea and explanatory note;
- hidden non-submitting button and a CSS rule ensuring it stays hidden without JavaScript;
- always-visible `mailto:` fallback and localized `<noscript>` instructions;
- shared client code compiles, revealing the enhanced button only with intact controls and metadata;
- synthetic message with punctuation, ampersands, hash, question marks and newlines is encoded in **mailto**, not in the page's HTTP URL;
- no-script, missing-textarea and missing-metadata conditions cannot navigate to an HTTP submit URL or reveal an inert button.

This uses **synthetic text only**, never genuine appeals.

## Browser/manual acceptance

1. Open `/trust-box/` and `/en/trust-box/` with JavaScript disabled. Confirm the prepare button is hidden; the direct mail link remains usable; no sensitive text is appended to the browser URL.
2. With JavaScript enabled, type a synthetic test message, choose Prepare email, verify the mail client receives subject and body; **do not send** the sample message.
3. Verify Tab/Shift+Tab keyboard navigation, textarea label, focus, mobile layout, and readable localized fallback instructions.
4. Verify that direct mailto links and visible Institute email addresses use the configured contact address in both languages.

Do **not** use a real confidential appeal during testing. Merge only after normal code-owner review and green validation; verify production pages after deployment.
