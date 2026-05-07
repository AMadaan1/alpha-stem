// --- 7. Authentic Typewriter Effect ---
const typewriterElement = document.getElementById('typewriter');

if (typewriterElement) {
    const textToType = "ALPHA";
    let charIndex = 0;
    
    // Start with just the blinking cursor
    typewriterElement.innerHTML = '<span class="blinking-cursor"></span>';
    
    // Wait half a second before typing
    setTimeout(() => {
        const typingInterval = setInterval(() => {
            if (charIndex < textToType.length) {
                // Type next letter and keep the cursor at the end
                typewriterElement.innerHTML = textToType.substring(0, charIndex + 1) + '<span class="blinking-cursor"></span>';
                charIndex++;
            } else {
                // Done typing, stop the interval
                clearInterval(typingInterval);
                
                // Wait 1.5 seconds, then permanently delete the cursor
                setTimeout(() => {
                    typewriterElement.innerHTML = textToType;
                }, 1500);
            }
        }, 150); // 150ms delay between each letter
    }, 500); 
}
