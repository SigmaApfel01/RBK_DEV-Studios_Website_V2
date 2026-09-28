document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');
  if (days && hours && minutes && seconds) {
    const release = new Date('2026-10-31T14:00:00+01:00');
    const update = () => {
      const diff = release.getTime() - Date.now();
      if (diff <= 0) {
        days.textContent = hours.textContent = minutes.textContent = seconds.textContent = '00';
        return;
      }
      const total = Math.floor(diff / 1000);
      days.textContent = String(Math.floor(total / 86400)).padStart(2, '0');
      hours.textContent = String(Math.floor(total % 86400 / 3600)).padStart(2, '0');
      minutes.textContent = String(Math.floor(total % 3600 / 60)).padStart(2, '0');
      seconds.textContent = String(total % 60).padStart(2, '0');
    };
    update();
    setInterval(update, 1000);
  }

  // ============================================================
  // ENT BANNUNGSFORMULAR
  // ============================================================
  // Nach dem Einrichten von Google Apps Script hier die Web-App-URL eintragen.
  const UNBAN_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwe-Dn9nmi6CAW73TXFJ9g3NW5jeign379KFA404Qlk6LOTY4bWfVMVLeUeVoww3ZgFqw/exec';

  const form = document.getElementById('unbanForm');
  if (form) {
    const status = document.getElementById('formStatus');
    const button = document.getElementById('submitBtn');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      if (UNBAN_ENDPOINT.includes('HIER_DEINE_')) {
        status.className = 'form-status error';
        status.textContent = 'Der Formular-Versand ist noch nicht eingerichtet. Trage zuerst die Web-App-URL in script.js ein.';
        return;
      }

      button.disabled = true;
      button.textContent = 'Wird gesendet …';

      const formData = new FormData(form);
      const payload = {
        email: formData.get('email'),
        username: formData.get('username'),
        age: formData.get('age'),
        discord: formData.get('discord') || '',
        reason: formData.get('reason'),
        confirm: formData.get('confirm') || ''
      };

      try {
        // text/plain verhindert eine CORS-Preflight-Anfrage bei Google Apps Script.
        await fetch(UNBAN_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });

        form.reset();
        status.className = 'form-status success';
        status.textContent = 'Dein Entbannungsantrag wurde übermittelt. Unser Team kann ihn jetzt bearbeiten.';
      } catch (error) {
        status.className = 'form-status error';
        status.textContent = 'Der Antrag konnte nicht übermittelt werden. Bitte versuche es später erneut.';
      } finally {
        button.disabled = false;
        button.textContent = 'Antrag absenden';
      }
    });
  }
});
