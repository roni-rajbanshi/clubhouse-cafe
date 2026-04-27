/* ═══════════ MENU DATA ═══════════ */
const menuData = {
    coffee: [
        { name: 'Classic Espresso', price: '₹180', desc: 'Bold, rich double shot pulled from single-origin beans.', tag: 'Bestseller' },
        { name: 'Caramel Macchiato', price: '₹280', desc: 'Vanilla-infused espresso layered with steamed milk and caramel drizzle.' },
        { name: 'Matcha Latte', price: '₹260', desc: 'Ceremonial-grade matcha whisked with oat milk and honey.' },
        { name: 'Cold Brew', price: '₹220', desc: '20-hour steeped cold brew served over artisan ice.', tag: 'Popular' },
        { name: 'Chai Spice Latte', price: '₹200', desc: 'Masala-spiced black tea with frothy steamed milk.' },
        { name: 'Flat White', price: '₹240', desc: 'Velvety micro-foam poured over a ristretto base.' },
    ],
    food: [
        { name: 'Avocado Toast', price: '₹320', desc: 'Sourdough topped with smashed avocado, cherry tomatoes & microgreens.', tag: 'Healthy' },
        { name: 'Truffle Mushroom Panini', price: '₹380', desc: 'Grilled ciabatta with truffle cream, sautéed mushrooms & gruyère.' },
        { name: 'Açaí Bowl', price: '₹350', desc: 'Blended açaí base with granola, banana, berries & chia seeds.' },
        { name: 'Smoked Salmon Bagel', price: '₹420', desc: 'Everything bagel with cream cheese, smoked salmon & capers.' },
        { name: 'Mediterranean Wrap', price: '₹340', desc: 'Hummus, falafel, pickled veggies & tahini in a warm tortilla.' },
        { name: 'Eggs Benedict', price: '₹360', desc: 'Poached eggs on English muffin with hollandaise & smoked ham.', tag: 'Brunch' },
    ],
    desserts: [
        { name: 'Tiramisu', price: '₹300', desc: 'Classic Italian layers of mascarpone, espresso-soaked ladyfingers & cocoa.', tag: 'Signature' },
        { name: 'Crème Brûlée', price: '₹280', desc: 'Vanilla bean custard with a caramelised sugar crust.' },
        { name: 'Dark Chocolate Fondant', price: '₹340', desc: '70% Belgian dark chocolate with a molten center, served warm.' },
        { name: 'New York Cheesecake', price: '₹320', desc: 'Creamy baked cheesecake with a buttery biscuit base & berry coulis.' },
        { name: 'Pistachio Croissant', price: '₹220', desc: 'Butter croissant filled with pistachio cream and toasted nuts.' },
        { name: 'Affogato', price: '₹250', desc: 'A scoop of vanilla gelato drowned in a hot espresso shot.' },
    ],
    specials: [
        { name: 'Lavender Honey Latte', price: '₹300', desc: 'Dried lavender and raw honey blended with espresso and oat milk.', tag: 'Limited' },
        { name: 'Rose Cardamom Cold Brew', price: '₹280', desc: 'Cold brew infused with rose water, cardamom and a splash of cream.' },
        { name: 'Clubhouse Brunch Platter', price: '₹650', desc: 'Eggs, bacon, toast, pancakes, fresh fruit & a drink of your choice.', tag: 'Weekend' },
        { name: 'Saffron Pistachio Shake', price: '₹340', desc: 'Creamy milkshake with real saffron, crushed pistachios & cardamom.' },
        { name: 'Charcoal Latte', price: '₹260', desc: 'Activated charcoal with vanilla and coconut milk — detox in a cup.' },
        { name: 'Seasonal Fruit Tart', price: '₹320', desc: 'Buttery shortcrust filled with pastry cream and fresh seasonal fruits.', tag: 'Chef\'s Pick' },
    ]
};

/* ═══════════ DOM READY ═══════════ */
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroParticles();
    initMenuTabs();
    renderMenu('coffee');
    initScrollAnimations();
    initCountUp();
    initContactForm();
});

/* ═══════════ NAVBAR ═══════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        updateActiveLink();
    });

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}

/* ═══════════ HERO PARTICLES ═══════════ */
function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        container.appendChild(p);
    }
}

/* ═══════════ MENU ═══════════ */
function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenu(tab.dataset.tab);
        });
    });
}

function renderMenu(category) {
    const grid = document.getElementById('menu-grid');
    const items = menuData[category] || [];

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(15px)';

    setTimeout(() => {
        grid.innerHTML = items.map(item => `
            <div class="menu-item">
                <div class="menu-item-header">
                    <span class="menu-item-name">${item.name}</span>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <p class="menu-item-desc">${item.desc}</p>
                ${item.tag ? `<span class="menu-item-tag">${item.tag}</span>` : ''}
            </div>
        `).join('');

        requestAnimationFrame(() => {
            grid.style.transition = 'opacity .4s ease, transform .4s ease';
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
        });
    }, 200);
}

/* ═══════════ SCROLL ANIMATIONS ═══════════ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

/* ═══════════ COUNT UP ═══════════ */
function initCountUp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCount(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

function animateCount(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = target >= 1000 ? value.toLocaleString() + '+' : value;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target >= 1000 ? target.toLocaleString() + '+' : target;
    }

    requestAnimationFrame(update);
}

/* ═══════════ CONTACT FORM ═══════════ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message sent! We\'ll get back to you soon ☕');
        form.reset();
    });
}

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}
