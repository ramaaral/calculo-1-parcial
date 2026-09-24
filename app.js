const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 2800);
}

const q = document.getElementById("q");
const topics = [...document.querySelectorAll("section.topic")];
q.addEventListener("input", () => {
  const term = q.value.trim().toLowerCase();
  topics.forEach((sec) => {
    const hay = (sec.innerText + " " + (sec.dataset.keys || "")).toLowerCase();
    sec.classList.toggle("hidden", term !== "" && !hay.includes(term));
  });
});

document.getElementById("btnTop").addEventListener("click", () => {
  q.value = "";
  topics.forEach((sec) => sec.classList.remove("hidden"));
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let deferredPrompt = null;
const btnInstall = document.getElementById("btnInstall");
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstall.style.display = "inline-block";
});

btnInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    return;
  }
  showToast("En el menú del navegador: Agregar a inicio / Instalar app");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
