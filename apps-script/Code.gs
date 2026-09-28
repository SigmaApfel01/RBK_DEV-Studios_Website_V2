const RECIPIENT = 'rbk.dev.studios@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');

    const email = String(data.email || '').trim();
    const username = String(data.username || '').trim();
    const age = Number(data.age);
    const discord = String(data.discord || '').trim();
    const reason = String(data.reason || '').trim();
    const confirm = String(data.confirm || '').trim();

    if (!email || !username || !Number.isInteger(age) || age < 13 || age > 100 || reason.length < 20 || confirm !== 'yes') {
      return json({ ok: false, error: 'Ungültige Formulardaten.' });
    }

    const subject = 'Entbannungsantrag – ' + username;
    const body = [
      'Neuer Entbannungsantrag',
      '',
      'E-Mail: ' + email,
      'Roblox Username: ' + username,
      'Alter: ' + age,
      'Discord: ' + (discord || 'Nicht angegeben'),
      '',
      'Begründung:',
      reason
    ].join('\n');

    MailApp.sendEmail({
      to: RECIPIENT,
      replyTo: email,
      subject: subject,
      body: body
    });

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
