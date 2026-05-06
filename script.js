// --- 1. Custom Fluid Cursor ---
const cursor = document.getElementById('custom-cursor') || document.createElement('div');
if (!document.getElementById('custom-cursor')) {
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2; // Snappier follow
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Hover States
const interactables = document.querySelectorAll('a, button, input, textarea, .media-item');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// --- 2. Magnetic Buttons Physics ---
const magneticButtons = document.querySelectorAll('.btn-magnetic');
magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const h = rect.width / 2;
        const v = rect.height / 2;
        // Calculate distance from center of button
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - v;
        
        // Pull the button towards the mouse (strength = 0.3)
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        // Snap back to original position
        btn.style.transform = `translate(0px, 0px)`;
        // Reset transition temporarily for smooth snap
        btn.style.transition = "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
        setTimeout(() => { btn.style.transition = ""; }, 500);
    });
});

// --- 3. Advanced Particle Engine ---
// (Keep your existing particle engine code from the previous iteration here)
// ... [Insert Particle Engine Code] ...

// --- 4. UI Scroll Reveal ---
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
reveals.forEach(reveal => revealOnScroll.observe(reveal));

// --- 5. 3D Card Tilt (FIXED FOR FORMS) ---
const cards = document.querySelectorAll('.card:not(.no-tilt)'); // Ignore forms!
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; 
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});
