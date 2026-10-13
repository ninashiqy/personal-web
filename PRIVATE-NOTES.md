# Private notes

Origin’s **Chat with me** button opens an accessible dialog. Visitors can leave a
private note without signing in; name and email are optional. Notes are submitted
to FormSubmit and emailed to `ninashi0723@gmail.com`. They are never rendered as a
public feed or saved in browser storage. An unsent draft stays in the panel until
the page is reloaded or a submission is accepted.

## Activate delivery before launch

1. Open the site through its published HTTPS address (not a `file://` URL).
2. Send a clearly marked setup note through the panel.
3. Check the recipient inbox and spam folder for FormSubmit’s activation email,
   and confirm the inbox.
4. Send another note and verify it arrives. Also try a note with an email address
   to verify you can reply to the visitor.

The initial submission triggers activation; do not assume it was delivered.
Browser checks use simulated responses and do not confirm inbox delivery.
See https://formsubmit.co/ and https://formsubmit.co/ajax-documentation.

## Change the inbox

Update the form’s `action` in `index.html`. `private-notes.js` derives the AJAX
endpoint from that action. Update the fallback email link as well. A new recipient
will need activation. No API key belongs in this static website.

## Behavior

- Empty and whitespace-only notes cannot be sent; notes are limited to 2,000 characters.
- Pending requests disable Send to avoid concurrent submissions.
- A failed or timed-out request retains the draft and offers retry or direct email.
  After a timeout, delivery is uncertain; retrying may produce a duplicate.
- Confirmation means FormSubmit accepted the submission, not that inbox delivery
  has been independently verified.
- FormSubmit handles submissions; the panel discloses the provider and includes
  a honeypot field. Monitor spam once the site goes live.

Public comments would require a separate storage and moderation design. This
implementation does not expose private submissions for that purpose.
