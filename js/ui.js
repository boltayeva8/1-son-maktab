// =========================================================================
// ui.js - Interfeys mantiqlari (Scroll, Tablar, Menyu, Bildirishnomalar)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobil Menyu boshqaruvi
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Navigatsiya tizimi (Single Page Application - SPA uslubida)
    function handleNavigation() {
        const hash = window.location.hash || '#home';
        const targetId = hash.substring(1);
        
        // Barcha qismlarni yashirish
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Faqat tanlangan qismni ko'rsatish
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (document.getElementById('home')) {
            document.getElementById('home').classList.add('active');
        }

        // Active klassni linkga qo'shish
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash || (hash === '' && link.getAttribute('href') === '#home')) {
                link.classList.add('active');
            }
        });
        
        // Mobil menyu ochiq bo'lsa uni yopish
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    window.addEventListener('hashchange', handleNavigation);
    
    // Ilk yuklanganida to'g'ri qismni ochish
    if(!window.location.hash) {
        window.location.hash = '#home';
    } else {
        handleNavigation();
    }

    // 3. O'quvchilar hayoti bo'limida Tablarni boshqarish
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Avval hammasidan active olib tashlanadi
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Tanlanganiga active qo'shiladi
            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });

    // 4. Aloqa Formasini jo'natish
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Formani tizimga junatish o'rniga, Toast chiqaramiz
            window.showToast("Xabaringiz muvaffaqiyatli yuborildi. Rahmat!", "success");
            contactForm.reset();
        });
    }
});

// Toast xabarlarni chiqaruvchi global funksiya
window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle text-danger"></i>';
    
    toast.innerHTML = `
        <div style="font-size: 1.5rem; color: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'}">
            ${icon}
        </div>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // 3 soniyadan keyin xabarni yo'qotish
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};
