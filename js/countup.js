/**
 * Count Up Animation
 * Counts up to a number when the element enters the viewport
 * 
 * Usage:
 * <span class="countup" data-speed="2">1,234</span>
 * 
 * Options:
 * - class="countup" (required) - element to animate
 * - data-speed (optional) - animation duration in seconds (default: 2)
 */

function initCountUp() {
    gsap.utils.toArray(".countup").forEach((element) => {
        const targetText = element.textContent.trim();
        const targetNumber = parseInt(targetText.replace(/,/g, ''));
        const speed = parseFloat(element.getAttribute('data-speed')) || 2;
        
        // Skip if not a valid number
        if (isNaN(targetNumber)) return;
        
        // Set initial opacity to 0
        gsap.set(element, { opacity: 0 });
        
        // Create an object to animate
        const counter = { value: 0 };
        
        gsap.to(counter, {
            value: targetNumber,
            duration: speed,
            ease: "power2.out",
            onStart: function() {
                // Set opacity to 1 immediately when counting starts
                element.style.opacity = 1;
            },
            onUpdate: function() {
                // Format number with commas
                element.textContent = Math.floor(counter.value).toLocaleString();
            },
            scrollTrigger: {
                trigger: element,
                start: "bottom bottom",
                end: "bottom 50%",
                scrub: false,
                markers: false,
                once: true, // Only animate once
            }
        });
    });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initCountUp);
