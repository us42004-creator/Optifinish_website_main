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

export async function notifySheet(payload: LeadPayload): Promise<void> {
  const url = process.env.GAS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
  } catch {
    // never block the user-facing response
  }
}
