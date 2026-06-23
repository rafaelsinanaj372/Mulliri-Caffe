// ===== Numri i WhatsApp =====
const WA_NUMBER = "355694826135";

// ===== Produktet e menusë =====
const IMG = "https://images.unsplash.com/";
const products = [
  {icon:"☕", name:"Espresso",        desc:"Shot i fortë dhe aromatik, klasiku italian.",                price:"140 L", img:IMG+"photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&q=80"},
  {icon:"🥛", name:"Cappuccino",      desc:"Espresso me qumësht të shkumëzuar dhe shkumë kremoze.",      price:"230 L", img:IMG+"photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80"},
  {icon:"🥛", name:"Latte",           desc:"Kafe e butë me shumë qumësht dhe aromë delikate.",           price:"260 L", img:IMG+"photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=600&q=80"},
  {icon:"☕", name:"Americano",       desc:"Espresso i zbutur me ujë të nxehtë, shije e pastër.",        price:"170 L", img:IMG+"photo-1551030173-122aabc4489c?auto=format&fit=crop&w=600&q=80"},
  {icon:"🫖", name:"Kafe Turke",      desc:"Kafe tradicionale e përgatitur ngadalë në xezve.",           price:"120 L", img:IMG+"photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=600&q=80"},
  {icon:"🥐", name:"Croissant",       desc:"Brumë francez i freskët, i krisur dhe i shijshëm.",          price:"190 L", img:IMG+"photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"},
  {icon:"🍰", name:"Ëmbëlsira",       desc:"Përzgjedhje e ëmbëlsirave të ditës, të bëra në shtëpi.",     price:"320 L", img:IMG+"photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80"},
  {icon:"🧊", name:"Pije të Ftohta",  desc:"Ice latte, frappe dhe pije freskuese verore.",               price:"290 L", img:IMG+"photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"}
];

// Render kartat e menusë (vetëm nëse ekziston grid)
const grid = document.getElementById("menuGrid");
if (grid) {
  products.forEach(p => {
    const msg = encodeURIComponent(`Përshëndetje Mulliri Caffe! Dëshiroj të porosis: ${p.name} (${p.price}).`);
    const card = document.createElement("div");
    card.className = "card reveal";
    card.innerHTML = `
      <div class="card-top">
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.parentElement.classList.add('noimg');this.remove();">
        <span class="ph">${p.icon}</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="card-foot">
          <span class="price">${p.price}</span>
          <a href="https://wa.me/${WA_NUMBER}?text=${msg}" target="_blank" rel="noopener" class="btn-order">Porosit 💬</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ===== Header scroll & back to top =====
const header = document.getElementById("header");
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 50);
  if (backTop) backTop.classList.toggle("show", window.scrollY > 400);
});

// ===== Hamburger menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
function closeMenu(){
  hamburger.classList.remove("active");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("active", open);
    document.body.classList.toggle("menu-open", open);
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
}

// ===== Back to top =====
if (backTop) backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

// ===== Contact form -> mailto =====
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent("Mesazh nga website Mulliri Caffe");
    const body = encodeURIComponent(`Emri: ${name}\nEmail: ${email}\n\nMesazhi:\n${message}`);
    window.location.href = `mailto:info@mulliricaffe.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
  });
}, {threshold:0.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
