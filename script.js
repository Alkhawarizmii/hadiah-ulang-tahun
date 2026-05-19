/* =============================================
   BIRTHDAY WEBSITE - script.js
   ============================================= */

/* ── Screen Navigation ─────────────────────── */
function goTo(num) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const next = document.getElementById('screen-' + num);
  next.classList.add('active');

  if (num === 1) initStars('stars-1'); initFloats();
  if (num === 2) { initStars('stars-2'); }
  if (num === 3) { startFireworks(); setTimeout(drawCake, 100); candlesBlown = false; }
}

function goToMain() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const main = document.getElementById('screen-4');
  main.classList.add('active');
  buildHeartGrid();
  showSection('memories');
}

/* ── Section Switching ─────────────────────── */
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));
  document.getElementById('section-' + name).classList.add('active-section');
  event.currentTarget && event.currentTarget.classList.add('active-nav');

  const navBtns = document.querySelectorAll('.nav-btn');
  const map = { memories: 0, poem: 1, melody: 2 };
  if (map[name] !== undefined) navBtns[map[name]].classList.add('active-nav');
}

/* ── Pixel Stars ───────────────────────────── */
function initStars(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  const count = window.innerWidth < 480 ? 30 : 60;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() < 0.3 ? 4 : 2;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-delay:${Math.random()*3}s;
      animation-duration:${1.5 + Math.random()*2}s;
    `;
    c.appendChild(s);
  }
}

/* ── Floating pixels (Screen 1) ────────────── */
function initFloats() {
  const container = document.getElementById('floats-1');
  if (!container) return;
  container.innerHTML = '';
  const shapes = ['♥','★','✦','◆','▲'];
  const colors = ['#a8d4f5','#ff8fb5','#ffe66d','#7ef7b0','#5ba3d9'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'floating-pixel';
    p.textContent = shapes[Math.floor(Math.random()*shapes.length)];
    p.style.cssText = `
      left:${Math.random()*100}%;
      bottom:-20px;
      font-size:${10 + Math.random()*14}px;
      color:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${4 + Math.random()*6}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(p);
  }
}

/* ── Gift Box Open ─────────────────────────── */
function openGift() {
  const btn = document.getElementById('open-btn');
  btn.disabled = true;
  btn.querySelector('.btn-label').textContent = '✨';

  const lid = document.getElementById('gift-lid');
  lid.classList.add('opening');

  setTimeout(() => goTo(3), 900);
}

/* ── Pixel Mascot: MOONDY 🐰 ───────────────── */
function drawMascot(canvasId, w, h) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;
  ctx.imageSmoothingEnabled = false;

  const COLS = 24, ROWS = 28;
  const sx = w / COLS, sy = h / ROWS;

  // Warna Moondy
  const _  = null;
  const W_ = '#f0f8ff';  // putih wajah & telinga kiri
  const B  = '#4a90be';  // biru border & telinga kanan
  const Bl = '#7abfde';  // biru muda highlight
  const K  = '#2a5a7a';  // biru gelap outline
  const Pk = '#daeef8';  // putih-biru telinga kiri
  const Ey = '#3a7aaa';  // mata biru tipis

  // Grid 24×28 — Moondy
  const grid = [
    // telinga kanan (biru) kiri, telinga kiri (putih) kanan
    [_,_,_,B,B,B,_,_,_,_,_,_,_,_,_,_,_,_,Pk,Pk,Pk,_,_,_],
    [_,_,B,B,B,B,B,_,_,_,_,_,_,_,_,_,_,Pk,Pk,Pk,Pk,Pk,_,_],
    [_,_,B,K,B,B,B,_,_,_,_,_,_,_,_,_,_,Pk,W_,Pk,Pk,Pk,_,_],
    [_,_,_,B,B,B,_,_,_,_,_,_,_,_,_,_,_,_,Pk,Pk,Pk,_,_,_],
    [_,_,_,W_,B,_,_,_,_,_,_,_,_,_,_,_,_,_,W_,Pk,_,_,_,_],
    // rambut gelombang 3 biji
    [_,_,_,K,B,K,_,K,B,K,_,_,K,B,K,_,_,_,_,_,_,_,_,_],
    [_,_,K,B,B,B,K,B,B,B,K,K,B,B,B,K,_,_,_,_,_,_,_,_],
    [_,_,K,B,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_,_],
    // kepala bulat atas
    [_,_,K,B,B,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_],
    [_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    // mata tipis panjang
    [K,B,W_,W_,Ey,Ey,Ey,W_,W_,W_,W_,W_,Ey,Ey,Ey,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,Ey,Ey,Ey,W_,W_,W_,W_,W_,Ey,Ey,Ey,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_],
    [_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_],
    [_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_],
    [_,_,K,B,B,W_,W_,W_,W_,W_,W_,W_,W_,W_,B,B,K,_,_,_,_,_,_,_],
    [_,_,K,B,B,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_],
    // badan kecil
    [_,_,_,K,B,B,B,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_,_],
    [_,_,_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_,_,_],
    [_,_,_,K,B,W_,W_,W_,W_,W_,W_,W_,W_,B,K,_,_,_,_,_,_,_,_],
    [_,_,_,_,K,B,B,B,B,B,B,B,B,K,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,K,K,_,_,_,_,K,K,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  grid.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(x * sx), Math.round(y * sy), Math.ceil(sx), Math.ceil(sy));
      }
    });
  });
}

/* ── Fireworks ─────────────────────────────── */
let fireworksInterval = null;

function startFireworks() {
  const container = document.getElementById('fireworks');
  if (!container) return;
  container.innerHTML = '';

  function launchOne() {
    const colors = ['#ffe66d','#ff8fb5','#7ef7b0','#a8d4f5','#ff6b6b','#ffffff'];
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 60;

    for (let i = 0; i < 14; i++) {
      const spark = document.createElement('div');
      const angle = (i / 14) * 360;
      const dist = 40 + Math.random() * 60;
      const size = 4 + Math.floor(Math.random() * 4);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dur = 0.6 + Math.random() * 0.5;

      spark.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        background:${color};
        left:${x}%; top:${y}%;
        border-radius:${Math.random()>0.5?'0':'50%'};
        animation: sparkFly${i} ${dur}s ease-out forwards;
      `;

      const rad = angle * Math.PI / 180;
      const dx = Math.cos(rad) * dist;
      const dy = Math.sin(rad) * dist;

      const keyframes = `
        @keyframes sparkFly${i} {
          0%   { transform: translate(0,0) scale(1); opacity:1; }
          100% { transform: translate(${dx}px,${dy}px) scale(0); opacity:0; }
        }
      `;
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);

      container.appendChild(spark);
      setTimeout(() => { spark.remove(); style.remove(); }, (dur + 0.1) * 1000);
    }
  }

  launchOne();
  fireworksInterval = setInterval(launchOne, 700);
  setTimeout(() => { clearInterval(fireworksInterval); }, 8000);
}

/* ── Heart Grid ────────────────────────────── */

// =============================================
// DATA FOTO — isi di sini!
// path  : lokasi file foto (kosongkan jika belum ada)
// title : judul yang muncul di halaman detail
// desc  : paragraf/cerita yang muncul di halaman detail
// =============================================
const PHOTOS = [
  { path: 'sendiri1.jpg', title: 'Selfie',  desc: 'Eh ada wanita cantik selfie pakek hp akuhh <3' },
  { path: 'sendiri2.jpg', title: 'Idul Fitri',  desc: 'Minal Aidzin wal fa idzin, mohon maaf lahir dan batin ya cantik, semoga di hari raya selanjutnya kamu masih mau memaafkanku' },
  { path: 'sendiri3.jpg', title: 'Tumang',  desc: 'Seru yaa kita bisa main drama bareng walau kita gak jadi pemeran utama dalam cerita itu' },
  { path: 'bareng1.jpg', title: 'Bioskop',  desc: 'Ini kali pertamanya kita nonton bioskop bareng ya, semoga kamu masih mau nonton bareng lagi sama aku' },
  { path: 'bareng2.jpg', title: 'Photobooth',  desc: 'Pertama kalinya aku photobooth sama cewe, makasih yaa udah mau ngajak aku merajut kenangan di mesin foto di cafe itu' },
  { path: 'sendiri4.jpg', title: 'Ramen',  desc: 'Kamu selalu terlihat cantik dengan kacamata, kamu lagi pergi sama mama kan ini hihi' },
  { path: 'sendiri5.jpg', title: 'Kacamata',  desc: 'Aku paling suka kamu pake kacamata di foto yang ini, terlihat cantik cantik manja gituu aku sukak banget pokoknya' },
  { path: 'sendiri6.jpg', title: '17',  desc: 'di 17-an agustus ini ummur kamu 117 kan, tahun ini usia kamu bertambah ya, cantik. semoga panjang umur sayangku' },
  { path: 'sendiri7.jpg', title: 'Benowo',  desc: 'Kamu cerita ke aku soal curug yang dimana aku belum pernah, gapapa capek sayang yang penting bisa bareng bareng sama temen itu bikin ke curug jadi seru' },
  { path: 'sendiri8.jpg', title: 'Gramed', desc: 'Ini kali pertama kita boncengan ke gramed, maaf ya aku gatau kalo kala itu gramed lagi renov jadi kurang nyaman di sana' },
  { path: 'sendiri9.jpg', title: 'Bidadari', desc: 'Bersinar terang seperti bidadari yang turun dari kayangan, beruntung banget aku bisa dapet bidadari baik hati yang cantik sekali ini. Kamu pas wisuda cantiknya gak karuan skskksk aku sukak!' },
  { path: 'bareng3.jpg', title: 'Arcade', desc: 'Kamu bilang kamu belum pernah main arcade, semoga main sama aku jadi kenangan manis buat kita, sumpah ini seru banget aku belum puas sayang, yuk main lagi kapan kapan' },
  { path: 'bareng4.jpg', title: 'Curug', desc: 'Mungkin rasanya kurang puas dan kurang lama ya kita main di curug hehe, aku seneng sekali bisa ke sana bareng kamu semoga kamu gak kapok deh melewati medan tanjakan dan main ke alam lagi bareng aku' },
  { path: 'sendiri11.jpg', title: 'Graduate', desc: 'Kemarin kita sudah lulus dari man yang banyak suka dukanya ahahaha. Semoga sukses ya buat kamu kedepannya aku akan selalu support kamu sayang, jangan pernah putus asa ketika di jalan berat, kamu bisa minta tolong ke aku okey?' },
  { path: 'sendiri10.jpg', title: 'Manis', desc: 'Ini kamu pas di rumah sahabat yang sering kamu ceritakan padaku, Nova. Kamu tau gak kalo kamu tuh manis banget kalo senyum trus pake kerudung hitam itu kayak seakan-akan mau kupeluk trus' },
];

// Layout hati — koordinat dalam satuan unit (U)
// [foto-index, col, row, colspan, rowspan]
// Grid: kolom 0-7, baris 0-8. 1 unit = U px (dihitung JS)
//
// Berdasarkan referensi gambar & koreksi:
// - Foto 1,2 tepat di atas foto 4
// - Foto 7,8 sama kecil, foto 8 di bawah foto 7
// - Foto 13 sama besar seperti foto 5, mengisi area kanan
// - Foto 15 di bawah foto 13, di samping foto 12
// - Foto 14 geser kanan, ujung bawah foto 12
//
// [idx, col, row, cspan, rspan]
const HEART_LAYOUT = [
  // kolom dikurangi 1 dari sebelumnya agar mulai dari 0, pas di layar HP
  [0,  1, 0, 1, 1],  // foto1
  [1,  2, 0, 1, 1],  // foto2
  [2,  0, 1, 1, 1],  // foto3
  [3,  1, 1, 2, 2],  // foto4
  [9,  0, 2, 1, 1],  // foto10
  [4,  4, 0, 2, 2],  // foto5
  [5,  6, 1, 1, 1],  // foto6
  [6,  3, 1, 1, 1],  // foto7
  [7,  3, 2, 1, 1],  // foto8
  [8,  6, 2, 1, 1],  // foto9
  [10, 1, 3, 1, 1],  // foto11
  [11, 2, 3, 2, 2],  // foto12
  [12, 4, 2, 2, 2],  // foto13
  [13, 3, 5, 1, 1],  // foto14
  [14, 4, 4, 1, 1],  // foto15
];

function buildHeartGrid() {
  const wrapper = document.querySelector('.heart-grid-wrapper');
  const grid    = document.getElementById('heart-grid');
  if (!grid || grid.children.length > 0) return;

  const COLS = 7;
  const ROWS = 7;

  // Selalu scale dari LEBAR wrapper — tidak pernah overflow ke kanan
  const availW = wrapper.clientWidth * 0.96;
  const GAP    = Math.max(4, Math.round(availW * 0.018));
  const U      = Math.floor((availW - GAP * (COLS - 1)) / COLS);

  const totalW = U * COLS + GAP * (COLS - 1);
  const totalH = U * ROWS + GAP * (ROWS - 1);

  grid.style.width  = totalW + 'px';
  grid.style.height = totalH + 'px';

  HEART_LAYOUT.forEach(([idx, col, row, cspan, rspan]) => {
    const photo = PHOTOS[idx];
    const cell  = document.createElement('div');
    cell.className = 'hcell';

    const x = col * (U + GAP);
    const y = row * (U + GAP);
    const w = U * cspan + GAP * (cspan - 1);
    const h = U * rspan + GAP * (rspan - 1);

    cell.style.left   = x + 'px';
    cell.style.top    = y + 'px';
    cell.style.width  = w + 'px';
    cell.style.height = h + 'px';

    if (photo.path) {
      const img = document.createElement('img');
      img.src = photo.path;
      img.alt = photo.title;
      cell.appendChild(img);
    } else {
      cell.innerHTML = `
        <div class="hplaceholder">
          <div class="hicon">📷</div>
          <div class="hnum">FOTO ${idx + 1}</div>
        </div>`;
    }

    cell.addEventListener('click', () => openDetail(idx));
    grid.appendChild(cell);
  });
}

/* ── Photo Detail ──────────────────────────── */
function openDetail(idx) {
  const photo  = PHOTOS[idx];
  const overlay = document.getElementById('photo-detail');
  const img    = document.getElementById('detail-img');
  const wrap   = img.parentElement;
  const title  = document.getElementById('detail-title');
  const desc   = document.getElementById('detail-desc');

  if (photo.path) {
    img.src = photo.path;
    img.style.display = 'block';
    wrap.classList.remove('empty');
  } else {
    img.src = '';
    img.style.display = 'none';
    wrap.classList.add('empty');
    wrap.textContent = '📷';
  }

  title.textContent = photo.title;
  desc.textContent  = photo.desc;
  overlay.classList.add('open');
  overlay.scrollTop = 0;
}

function closeDetail() {
  document.getElementById('photo-detail').classList.remove('open');
}

/* ── Init ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initStars('stars-1');
  initFloats();
});

/* ── Cake & Candles ────────────────────────── */
let candlesBlown = false;

function drawCake() {
  const canvas = document.getElementById('cake-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const COLS = 24, ROWS = 18;
  const sx = canvas.width / COLS;
  const sy = canvas.height / ROWS;
  const _ = null, W = '#f0f8ff', B = '#2b7fc1', Bl = '#5ba3d9';
  const P = '#ff8fb5', Y = '#ffe66d', K = '#1a4f7a';
  const g = [
    [_,_,_,_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_,_,_,_],
    [_,_,_,_,W,W,P,W,W,P,W,W,P,W,W,P,W,W,W,W,_,_,_,_],
    [_,_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_,_],
    [_,_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_,_,_],
    [_,_,K,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,K,_,_,_],
    [_,_,K,Bl,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,Bl,K,_,_,_],
    [_,_,K,Bl,B,Y,B,B,P,B,B,Y,B,B,P,B,B,Y,B,Bl,K,_,_,_],
    [_,_,K,Bl,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,Bl,K,_,_,_],
    [_,_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_,_,_],
    [_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_],
    [_,_,W,W,P,W,W,P,W,W,P,W,W,P,W,W,P,W,W,P,W,W,_,_],
    [_,_,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,_,_],
    [_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_,_],
    [_,K,B,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,B,K,_],
    [_,K,B,Bl,B,B,Y,B,B,P,B,B,B,B,P,B,B,Y,B,B,Bl,B,K,_],
    [_,K,B,Bl,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,Bl,B,K,_],
    [_,K,B,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,Bl,B,K,_],
    [_,_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_],
  ];
  g.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(x*sx), Math.round(y*sy), Math.ceil(sx), Math.ceil(sy));
      }
    });
  });
}

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;
  const flames = document.querySelectorAll('.flame');
  const candles = document.querySelectorAll('.candle');
  flames.forEach((flame, i) => {
    setTimeout(() => {
      flame.classList.add('blown');
      setTimeout(() => {
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        candles[i].appendChild(smoke);
        setTimeout(() => smoke.remove(), 1000);
      }, 300);
    }, i * 180);
  });
  setTimeout(() => {
    const btn = document.getElementById('blow-btn');
    btn.querySelector('.btn-label').textContent = '✨';
    setTimeout(goToMain, 800);
  }, flames.length * 180 + 600);
}