import https from 'https';
import http from 'http';

interface LeadPayload {
  name?:     string;
  company?:  string;
  email?:    string;
  phone?:    string;
  product?:  string;
  industry?: string;
  details?:  string;
  source:    string;
}

// Google Apps Script returns a 302 on POST. Standard fetch() converts that
// redirect to a GET, so doPost never fires. We manually follow the redirect
// and re-send as POST so the body reaches the script.
function postFollowRedirect(url: string, body: string): Promise<void> {
  return new Promise((resolve) => {
    const send = (target: string, followed = false) => {
      const u = new URL(target);
      const mod = u.protocol === 'https:' ? https : http;
      const buf = Buffer.from(body);

      const req = mod.request(
        {
          hostname: u.hostname,
          path:     u.pathname + u.search,
          method:   'POST',
          headers:  { 'Content-Type': 'application/json', 'Content-Length': buf.length },
        },
        (res) => {
          if (!followed && (res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
            res.resume();
            send(res.headers.location, true);
          } else {
            res.resume();
            resolve();
          }
        },
      );
      req.on('error', () => resolve());
      req.write(buf);
      req.end();
    };

    send(url);
  });
}

export async function notifySheet(payload: LeadPayload): Promise<void> {
  const url = process.env.GAS_WEBHOOK_URL;
  if (!url) return;
  try {
    await postFollowRedirect(url, JSON.stringify(payload));
  } catch {
    // never block the user-facing response
  }
}
