
const HASHED_PASSWORD =
  "3d50991752d295fa00de5daf1b2d9c998872e668981f7f65d246888b11353d90";


const PEPPER = atob("SGF0dGFjaA==");

// Maximum attempts before lockout
const MAX_ATTEMPTS = 2;
let attempts = 0;
let lockedUntil = 0;
let scriptLoaded = false;

// Input elements
const inputEl = document.getElementById("password-input");
const btnEl = document.getElementById("password-btn");
const errorBox = document.getElementById("password-error");
const overlay = document.getElementById("password-overlay");

btnEl.addEventListener("click", handleSubmit);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSubmit();
});

// ===== SHA-256 FUNCTION =====
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ===== MAIN SUBMIT HANDLER =====

async function handleSubmit() {
  if (scriptLoaded) return;

  const now = Date.now();

  // Lockout logic
  if (now < lockedUntil) {
    const seconds = Math.ceil((lockedUntil - now) / 1000);
    errorBox.innerText =
      "Trop d'essais. Réessayez dans " + seconds + " secondes.";
    return;
  }

  const pwd = inputEl.value.trim();
  attempts++;

  // compute hash (password + pepper)
  const testHash = await sha256(pwd + PEPPER);

  // PASSWORD CORRECT
  if (testHash === HASHED_PASSWORD) {
    loadScript("script.js");
    closeOverlay();
    return;
  }

  // WRONG PASSWORD
  if (attempts < MAX_ATTEMPTS) {
    errorBox.innerText =
      "Mot de passe incorrect (" +
      attempts +
      "/" +
      MAX_ATTEMPTS +
      "). Un deuxième essai incorrect chargera des données factices.";
  } else {
    // MAX ATTEMPTS REACHED → Lockout and load fake data
    lockedUntil = Date.now() + 10_000; // 10 seconds block
    errorBox.innerText =
      "Nombre maximum d'essais atteint. Chargement de données factices…";
    loadScript("script_fake.js");
    setTimeout(closeOverlay, 600);
  }
}

// ===== SUPPORT FUNCTIONS =====

function loadScript(filename) {
  if (scriptLoaded) return;
  scriptLoaded = true;

  const s = document.createElement("script");
  s.src = filename + "?v=" + Date.now(); // cache-busting
  document.body.appendChild(s);

  inputEl.disabled = true;
  btnEl.disabled = true;
}

function closeOverlay() {
  overlay.style.display = "none";
}
