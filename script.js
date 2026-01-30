// 1. PENGATURAN AUTO SCROLL
// Fungsi ini akan menjalankan gulir otomatis saat halaman dibuka
function startAutoScroll(speed) {
    // speed dalam milidetik. Semakin kecil angkanya, semakin cepat jalannya.
    let scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); // Geser 1 pixel ke bawah
        
        // Berhenti otomatis jika sudah mencapai ujung bawah halaman
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            clearInterval(scrollInterval);
        }
    }, speed);

    // Berhenti scroll otomatis jika pengguna melakukan interaksi manual (scroll/sentuh)
    const stopScroll = () => clearInterval(scrollInterval);
    window.addEventListener('wheel', stopScroll);
    window.addEventListener('touchstart', stopScroll);
}

// 2. INISIALISASI SWIPER (Untuk Carousel Gambar)
// Mengacu pada elemen .mySwiper di index.html Anda
const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
});

// 3. LOGIKA SCROLL REVEAL (Efek Muncul Saat Scroll)
// Menangani elemen dengan class .reveal agar muncul halus saat terlihat di layar
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

// Daftarkan semua elemen .reveal ke observer
document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});

// 4. MENJALANKAN FUNGSI SAAT HALAMAN SELESAI DIMUAT
window.addEventListener('load', () => {
    // Sesuaikan kecepatan di sini: 
    // 20 = Cepat, 40 = Sedang, 70 = Lambat
    startAutoScroll(10); 
});
