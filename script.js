// --- 1. Konfigurasi Carousel (Swiper) ---
var swiper = new Swiper(".mySwiper", {
    effect: "slide",       // Efek geser
    loop: true,            // Bisa berputar terus tanpa henti
    centeredSlides: true,
    autoplay: {
        delay: 3000,       // Gambar ganti otomatis setiap 3 detik
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination", // Titik-titik navigasi
        clickable: true,
    },
    grabCursor: true,      // Kursor berubah jadi tangan
});

// --- 2. Konfigurasi Animasi Scroll (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});