const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Set canvas to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let mouse = {
    x: null,
    y: null
}

// Update mouse coordinates on move
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // Spawn 2 particles per mouse movement frame
    for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle());
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Particle Class Engine
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // Random velocity for the antigravity drift
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -2 - 0.5; // Always drift slightly upwards
        this.size = Math.random() * 4 + 1;
        this.color = '#00ffcc'; // Neon Green
        this.life = 1; // Opacity
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Decrease life to fade out
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

// Animation Loop
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Remove dead particles to prevent memory leaks
        if (particlesArray[i].life <= 0) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    // Clear canvas every frame with slight trail effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();
