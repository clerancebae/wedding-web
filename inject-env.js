/**
 * inject-env.js
 * Vercel build sırasında çalışır.
 * index.html içindeki %%PLACEHOLDER%% değerlerini
 * Vercel Environment Variables ile değiştirir.
 */

const fs   = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "index.html");
let html = fs.readFileSync(filePath, "utf8");

const vars = {
  "%%VITE_FIREBASE_API_KEY%%":            process.env.FIREBASE_API_KEY,
  "%%VITE_FIREBASE_AUTH_DOMAIN%%":        process.env.FIREBASE_AUTH_DOMAIN,
  "%%VITE_FIREBASE_PROJECT_ID%%":         process.env.FIREBASE_PROJECT_ID,
  "%%VITE_FIREBASE_STORAGE_BUCKET%%":     process.env.FIREBASE_STORAGE_BUCKET,
  "%%VITE_FIREBASE_MESSAGING_SENDER_ID%%":process.env.FIREBASE_MESSAGING_SENDER_ID,
  "%%VITE_FIREBASE_APP_ID%%":             process.env.FIREBASE_APP_ID,
};

let missing = [];

for (const [placeholder, value] of Object.entries(vars)) {
  if (!value) {
    missing.push(placeholder);
  } else {
    html = html.replaceAll(placeholder, value);
  }
}

if (missing.length > 0) {
  console.error("❌ Eksik environment variable'lar:", missing.join(", "));
  process.exit(1); // Build'i durdur
}

fs.writeFileSync(filePath, html, "utf8");
console.log("✅ Firebase config başarıyla inject edildi.");
