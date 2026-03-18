// 1. INISIALISASI SWIPER (Carousel)
const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 800,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// 2. FUNGSI PENGECEKAN KONTEN (Memastikan main muncul)
window.addEventListener('load', () => {
    console.log("Website Loaded - BR Bumbu Betutu");
    // Paksa scroll ke atas saat refresh
    window.scrollTo(0, 0);
});
