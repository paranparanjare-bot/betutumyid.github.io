// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'light';

function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
}
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Chatbox Logic
const chatModal = document.getElementById('chatModal');
const openChatBtn = document.getElementById('openChatBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

openChatBtn.addEventListener('click', () => chatModal.classList.remove('hidden'));
closeChatBtn.addEventListener('click', () => chatModal.classList.add('hidden'));

function addMessage(text, sender) {
    const msg = document.createElement('p');
    msg.classList.add(sender);
    msg.innerHTML = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value;
    if (!text) return;
    addMessage(text, 'user');
    userInput.value = '';
    setTimeout(() => addMessage("Terima kasih! Admin kami akan segera membalas via WhatsApp.", 'bot'), 600);
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const checkReveal = () => {
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
    });
};
window.addEventListener('scroll', checkReveal);
checkReveal();
