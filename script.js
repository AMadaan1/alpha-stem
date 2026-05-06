// --- Particle Engine ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let particlesArray = [];
let mouse = { x: null, y: null }

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x; mouse.y = event.y;
    for (let i = 0; i < 2; i++) particlesArray.push(new Particle());
});
window.addEventListener('touchmove', (event) => {
    mouse.x = event.touches[0].clientX; mouse.y = event.touches[0].clientY;
    for (let i = 0; i < 2; i++) particlesArray.push(new Particle());
});
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

class Particle {
    constructor() {
        this.x = mouse.x; this.y = mouse.y;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -2 - 0.5;
        this.size = Math.random() * 4 + 1;
        this.life = 1;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
        this.life -= 0.02;
    }
    draw() {
        ctx.fillStyle = `rgba(0, 255, 204, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(); particlesArray[i].draw();
        if (particlesArray[i].life <= 0) { particlesArray.splice(i, 1); i--; }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}
animate();

// --- UI/UX Scroll Reveal Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});
