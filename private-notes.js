// Delivery uses the form's action so the inbox can be changed in one place.
// Activate the recipient with FormSubmit before making this available to visitors.
(() => {
  const dialog = document.querySelector('#private-note-dialog');
  const form = document.querySelector('#private-note-form');
  const message = document.querySelector('#private-note-message');
  const status = document.querySelector('#note-status');
  const receipt = document.querySelector('#note-receipt');
  const send = form.querySelector('[type="submit"]');
  let sending = false;

  function updateCount() {
    document.querySelector('#note-character-count').textContent = `${message.value.length} / 2000`;
    message.setCustomValidity('');
  }

  document.querySelector('[data-open-note]').addEventListener('click', () => {
    dialog.showModal();
  });
  document.querySelector('[data-close-note]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  message.addEventListener('input', updateCount);
  document.querySelectorAll('[data-note-prompt]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!message.value.trim()) message.value = button.dataset.notePrompt;
      updateCount();
      message.focus();
      message.setSelectionRange(message.value.length, message.value.length);
    });
  });
  document.querySelector('[data-another-note]').addEventListener('click', () => {
    receipt.hidden = true;
    form.hidden = false;
    status.textContent = '';
    message.focus();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    if (!message.value.trim()) {
      message.setCustomValidity('Leave a little note before sending.');
      message.reportValidity();
      return;
    }
    if (!form.reportValidity() || form.elements._honey.value) return;
    if (location.protocol === 'file:') {
      status.textContent = 'Please open the website through its preview or published address to send a note.';
      return;
    }

    const data = new FormData(form);
    data.set('message', message.value.trim());
    // Omit an empty email so anonymous notes do not create an invalid Reply-To.
    if (!String(data.get('email')).trim()) data.delete('email');
    const endpoint = new URL(form.action);
    endpoint.pathname = `/ajax${endpoint.pathname}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    sending = true;
    send.disabled = true;
    form.setAttribute('aria-busy', 'true');
    send.textContent = 'Sending…';
    status.textContent = 'Sending your private note…';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Submission not accepted');
      document.querySelector('#note-sent-message').textContent = data.get('message');
      form.reset();
      updateCount();
      form.hidden = true;
      receipt.hidden = false;
      status.textContent = 'Your note was submitted. Thank you for stopping by!';
      document.querySelector('[data-another-note]').focus();
    } catch {
      status.textContent = 'I couldn’t confirm your note was sent. Your draft is still here — try again, or use the email link below.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      send.disabled = false;
      send.textContent = 'Send note ↗';
      form.removeAttribute('aria-busy');
    }
  });
})();
