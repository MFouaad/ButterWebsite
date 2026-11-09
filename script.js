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
