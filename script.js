// 1. PENGATURAN AUTO SCROLL (LEBIH HALUS)
function startAutoScroll(speed) {
    // Speed ditingkatkan agar tidak memberatkan browser saat memuat AI
    let scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); 
        
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            clearInterval(scrollInterval);
        }
    }, speed);

    const stopScroll = () => clearInterval(scrollInterval);
    window.addEventListener('wheel', stopScroll);
    window.addEventListener('touchstart', stopScroll);
}

// 2. INISIALISASI SWIPER
const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 800,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000, // Diperlambat sedikit agar lebih elegan
        disableOnInteraction: false,
    },
});

// 3. LOGIKA SCROLL REVEAL
const observerOptions = {
    threshold: 0.15,
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

// 4. JALANKAN SAAT LOAD
window.addEventListener('load', () => {
    // Beri jeda 1 detik sebelum auto-scroll agar widget AI siap lebih dulu
    setTimeout(() => {
        startAutoScroll(40); // Kecepatan sedang agar konten tidak terlihat "loncat"
    }, 1000);
});
