// Running timecode (HH:MM:SS:FF @ 25fps) in the header
const tc = document.getElementById("tc");
const p = n => String(n).padStart(2, "0");
const t0 = performance.now();
(function loop() {
  const ms = performance.now() - t0;
  const f = Math.floor((ms % 1000) / 40);
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000);
  tc.textContent = `${p(h)}:${p(m)}:${p(s)}:${p(f)}`;
  requestAnimationFrame(loop);
})();

document.getElementById("y").textContent = new Date().getFullYear();
