// Running timecode (HH:MM:SS:FF @ 25fps) in the header
const tc = document.getElementById("tc");
const p = n => String(n).padStart(2, "0");
const t0 = performance.now();
(function loop() {
  const ms = performance.now() - t0;
  tc.textContent = `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)}:${p(Math.floor((ms % 1000) / 40))}`;
  requestAnimationFrame(loop);
})();

document.getElementById("y").textContent = new Date().getFullYear();

// Client logos (files in /logos, in this order)
const BRANDS = ["KFC","Juhayna","Knorr","Doritos","Spotify","Vodafone","Orange","Mobily","Banque Misr","Nawy","Beltone","Emirates NBD","Saudia","Bank NXT","Elsewedy Electric","ORA","Tank"];
const track = document.getElementById("clients");
const html = BRANDS.map((n, i) =>
  `<img src="logos/brand-${p(i + 1)}.png" alt="${n}" loading="lazy">`).join("");
track.innerHTML = html + html; // duplicated for seamless loop

// 3D tilt on the logo: mouse on desktop, device tilt on phones
const stage = document.getElementById("stage");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function tilt(x, y) { // x,y in -1..1
  stage.style.setProperty("--ry", (x * 14).toFixed(1) + "deg");
  stage.style.setProperty("--rx", (-y * 10).toFixed(1) + "deg");
}
if (!reduce) {
  addEventListener("mousemove", e =>
    tilt((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1));
  addEventListener("mouseleave", () => tilt(0, 0));
  addEventListener("deviceorientation", e => {
    if (e.gamma == null) return;
    tilt(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 45) / 30)));
  });
}
