import './style.css'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Background Particles Logic ---
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

// Resize Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#E30613', '#8BC83D', '#FFFFFF']; // Dante's Colors

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1; // 1-5px
        this.speedX = (Math.random() * 0.4) - 0.2; // Gentle float
        this.speedY = (Math.random() * 0.4) - 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.4 + 0.1; // 0.1-0.5 Alpha
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 12000; // Medium density
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

// Handle Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start Animation
initParticles();
animateParticles();

// --- End Particles Logic ---

// Splash Screen & Hero Logic (GSAP)
// Splash Screen & Hero Logic (GSAP)
window.addEventListener('load', () => {
    // Splash Screen Timeline
    const tl = gsap.timeline();

    tl.fromTo('.splash-logo',
        { scale: 0.5, rotation: -360, opacity: 0 },
        {
            scale: 1.2,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)"
        }
    )
        .to('.splash-logo', { // Pulse effect after entry
            scale: 1.1,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        })
        .to('#splash-screen', {
            y: '-100%',
            duration: 0.8,
            ease: "power3.inOut",
            delay: 0.2
        })
        .fromTo('.nav-logo',
            { y: -50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5 },
            "-=0.3"
        )
        // Premium Hero Stagger - ROBUST fromTo
        .fromTo('.hero-content h2',
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
            "-=0.3"
        )
        .fromTo('.hero-content p',
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
            "-=0.6"
        )
        .fromTo('.hero-buttons a',
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)" },
            "-=0.4"
        );

    // Parallax Hero Background
    gsap.to(".parallax-hero", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Footer Stagger Reveal
    gsap.fromTo(".footer-col",
        { y: 50, autoAlpha: 0 },
        {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".footer-info-section",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Navigation / Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate Links if active
        if (navLinks.classList.contains('active')) {
            gsap.fromTo('.nav-links li',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.4 }
            );
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Fetch Content - DEPRECATED
// We now link directly to FoodBooking
// async function fetchContent() { ... }


// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close-lightbox');

// Order Modal Logic
const orderModal = document.getElementById('order-modal');
const closeOrderBtn = document.querySelector('.close-order');
const heroOrderBtn = document.getElementById('hero-order-btn');
const navOrderBtn = document.getElementById('nav-order-btn');

function openModal() {
    if (orderModal) {
        orderModal.style.display = 'flex';
        // GSAP might be failing if not imported? Ensure fallback
        if (typeof gsap !== 'undefined') {
            gsap.from('.modal-iframe-container', { y: 50, opacity: 0, duration: 0.4, ease: "power2.out" });
        }
    } else {
        console.error("Order Modal not found in DOM");
    }
}

if (heroOrderBtn) heroOrderBtn.addEventListener('click', openModal);
if (navOrderBtn) navOrderBtn.addEventListener('click', openModal);

if (closeOrderBtn) {
    closeOrderBtn.addEventListener('click', () => {
        orderModal.style.display = 'none';
        // Reload iframe to reset state? No, keep it loaded for speed.
    });
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.style.display = 'none';
    }
});

window.openLightbox = (src, title) => {
    lightbox.style.display = 'flex';
    // Check if placeholder is needed if src is invalid in real scenario, but for now direct assign
    lightboxImg.src = src;
    lightboxCaption.innerText = title;

    // Basic validation to use placeholder if image is missing 
    lightboxImg.onerror = () => {
        lightboxImg.src = 'https://placehold.co/800x600?text=Delicious+Dantes';
    };
};

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Initialize
// fetchContent();

// PWA Logic
let deferredPrompt;
const installBanner = document.getElementById('pwa-install-banner');
const installBtn = document.getElementById('install-btn');
const closeInstallBtn = document.getElementById('close-install');

// Register SW
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW Registered'))
            .catch(err => console.log('SW Failed', err));
    });
}

// Handle Install Prompt
// 1-Hour Snooze Logic
const checkBannerDismissal = () => {
    const dismissedTime = localStorage.getItem('dantes_pwa_dismissed');
    if (!dismissedTime) return false;

    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 Hour in ms

    if (now - parseInt(dismissedTime) < oneHour) {
        return true; // Still snoozed
    }
    return false; // Show it
};

// Handle Install Prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show the banner if not snoozed
    if (installBanner && !checkBannerDismissal()) {
        installBanner.style.display = 'flex';

        // Optional: Add entrance animation class if desired
        installBanner.classList.add('animate__animated', 'animate__fadeInUp');
    }
});

// Close Banner Logic
if (closeInstallBtn) {
    closeInstallBtn.addEventListener('click', () => {
        if (installBanner) installBanner.style.display = 'none';
        // Save dismissal time
        localStorage.setItem('dantes_pwa_dismissed', Date.now());
    });
}

if (installBtn) {
    installBtn.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
                installBanner.style.display = 'none';
            });
        }
    });
}

// Contact Form Handler (Mock)
const contactForm = document.getElementById('dantes-contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = "SENDING...";
        btn.disabled = true;

        // Simulate network request
        setTimeout(() => {
            alert("Thanks! We've received your message. We'll get back to you shortly.");
            contactForm.reset();
            btn.innerText = "SENT!";

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// --- Gallery Rotation Logic ---
const galleryImages = [
    '/images/pizza1.jpg',
    '/images/pizza2.jpg',
    '/images/pasta1.jpg',
    '/images/hero-pizza.jpg',
    '/images/fb-pizza-1.jpg',
    '/images/fb-pizza-2.jpg',
    '/images/fb-pizza-3.jpg',
    '/images/fb-pizza-4.jpg',
    '/images/fb-pizza-5.jpg',
    '/images/fb-pizza-7.jpg',
    '/images/fb-pizza-8.jpg',
    '/images/fb-pizza-10.jpg',
    '/images/fb-pizza-11.jpg',
    '/images/fb-pizza-12.jpg',
    '/images/fb-pizza-13.jpg',
    '/images/fb-pizza-14.jpg',
    '/images/fb-pizza-15.jpg'
];

// Wait for DOM to be sure
window.addEventListener('load', () => {
    const gridImages = document.querySelectorAll('.gallery-grid img');

    if (gridImages.length > 0) {
        setInterval(() => {
            // Pick a random grid slot to update
            const randomSlotIndex = Math.floor(Math.random() * gridImages.length);
            const imgElement = gridImages[randomSlotIndex];

            // Get currently displayed images to avoid duplicates
            const currentSrcs = Array.from(gridImages).map(img => img.getAttribute('src'));

            // Filter available images to exclude those currently visible
            const availableForSlot = galleryImages.filter(src => !currentSrcs.includes(src));

            if (availableForSlot.length > 0) {
                // Pick a new random image
                const randomNewImg = availableForSlot[Math.floor(Math.random() * availableForSlot.length)];

                // Animate the swap using GSAP
                if (typeof gsap !== 'undefined') {
                    gsap.to(imgElement, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            imgElement.src = randomNewImg;
                            gsap.to(imgElement, {
                                opacity: 1,
                                duration: 0.5
                            });
                        }
                    });
                } else {
                    // Fallback if GSAP fails
                    imgElement.style.opacity = 0;
                    setTimeout(() => {
                        imgElement.src = randomNewImg;
                        imgElement.style.opacity = 1;
                    }, 500);
                }
            }
        }, 3000); // Swap every 3 seconds
    }
});
// --- AI Chat Logic & Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const chatFab = document.getElementById('chat-fab');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatWidget = document.getElementById('ai-chat-widget');

    if (chatFab && chatWindow && closeChatBtn && chatWidget) {

        // Close function (collapse to bubble)
        const closeChat = () => {
            gsap.to(chatWindow, {
                opacity: 0,
                y: 100,
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    chatWindow.classList.add('hidden');
                    chatWindow.style.display = 'none';
                }
            });
        };

        // Open function (slide up)
        const openChat = () => {
            chatWindow.classList.remove('hidden');
            chatWindow.style.display = 'flex';
            gsap.fromTo(chatWindow,
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
            );
        };

        // Toggle on FAB click
        chatFab.addEventListener('click', () => {
            const isHidden = chatWindow.classList.contains('hidden');
            if (isHidden) {
                openChat();
            } else {
                closeChat();
            }
        });

        // Close button
        closeChatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeChat();
        });

        // AUTO-OPEN on page load: Slide entire widget up, then open chat window
        gsap.set(chatWidget, { y: 100, opacity: 0 });

        const autoOpenWidget = () => {
            // First, slide widget into view
            gsap.to(chatWidget, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.5,
                onComplete: () => {
                    // Then auto-open the chat window
                    openChat();
                }
            });
        };

        if (document.readyState === 'complete') {
            autoOpenWidget();
        } else {
            window.addEventListener('load', autoOpenWidget);
        }

        // --- Chat Message Handling ---
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const chatMessages = document.getElementById('chat-messages');

        // Restaurant info for AI responses
        const restaurantInfo = {
            hours: "Mon: 12h00–21h00, Tue-Sat: 10h30–21h00, Sun: Closed",
            address: "La Piazza Square, 26 Central Avenue, Flamwood, Klerksdorp",
            phone: "018 468 2727 or 073 018 6502",
            menu: "We serve authentic Italian pizzas, pastas, and more! Order online via our website or Mr D.",
            specials: "Check our website for daily specials and combo deals!"
        };

        // Simple AI response based on keywords
        const getAIResponse = (message) => {
            const msg = message.toLowerCase();

            if (msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('time')) {
                return `🕒 Our operating hours are:\n${restaurantInfo.hours}`;
            }
            if (msg.includes('address') || msg.includes('location') || msg.includes('where') || msg.includes('find')) {
                return `📍 You can find us at:\n${restaurantInfo.address}`;
            }
            if (msg.includes('phone') || msg.includes('call') || msg.includes('contact') || msg.includes('number')) {
                return `📞 Call us at:\n${restaurantInfo.phone}`;
            }
            if (msg.includes('menu') || msg.includes('food') || msg.includes('pizza') || msg.includes('pasta') || msg.includes('eat')) {
                // Open the menu modal after a short delay
                setTimeout(() => {
                    const orderModal = document.getElementById('order-modal');
                    if (orderModal) orderModal.style.display = 'flex';
                }, 1000);
                return `🍕 Opening our full menu for you now! Browse our delicious pizzas and pastas.`;
            }
            if (msg.includes('special') || msg.includes('deal') || msg.includes('offer') || msg.includes('discount')) {
                window.chatWaitingForMenu = true;
                return `🎉 We have amazing daily specials and combo deals! Would you like me to show you our full menu?`;
            }
            // Check if waiting for menu confirmation
            if (window.chatWaitingForMenu && (msg.includes('yes') || msg.includes('sure') || msg.includes('ok') || msg.includes('please') || msg.includes('yeah'))) {
                window.chatWaitingForMenu = false;
                setTimeout(() => {
                    const orderModal = document.getElementById('order-modal');
                    if (orderModal) orderModal.style.display = 'flex';
                }, 500);
                return `🍕 Opening our menu for you now! Check out all our delicious options!`;
            }
            if (window.chatWaitingForMenu && (msg.includes('no') || msg.includes('nah') || msg.includes('cancel'))) {
                window.chatWaitingForMenu = false;
                return `No problem! Is there anything else I can help you with?`;
            }
            if (msg.includes('delivery') || msg.includes('deliver')) {
                // Set waiting state for Mr D confirmation
                window.chatWaitingForMrD = true;
                return `🛵 We deliver through Mr D! Would you like me to open the Mr D app for you?`;
            }
            if (msg.includes('order')) {
                return `🛵 You can order online through our website (click ORDER ONLINE & COLLECT) or use Mr D Delivery for home delivery! Just ask me about "delivery" if you want Mr D.`;
            }
            // Check if waiting for Mr D confirmation
            if (window.chatWaitingForMrD && (msg.includes('yes') || msg.includes('sure') || msg.includes('ok') || msg.includes('please') || msg.includes('yeah'))) {
                window.chatWaitingForMrD = false;
                setTimeout(() => {
                    window.open('https://www.mrd.com/delivery/restaurant/mrd/18663', '_blank');
                }, 500);
                return `🚀 Opening Mr D for you now! Enjoy your delivery from Dante's! 🍕`;
            }
            if (window.chatWaitingForMrD && (msg.includes('no') || msg.includes('nah') || msg.includes('cancel'))) {
                window.chatWaitingForMrD = false;
                return `No problem! Is there anything else I can help you with?`;
            }
            if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('ciao')) {
                return `Ciao! 👋 Welcome to Dante's Pizza & Pasta! How can I help you today? Ask me about:\n• Opening hours\n• Location\n• Menu & specials\n• How to order`;
            }
            if (msg.includes('thank')) {
                return `Prego! 🇮🇹 You're welcome! Enjoy your meal at Dante's!`;
            }

            return `I'm here to help! You can ask me about:\n• 🕒 Opening hours\n• 📍 Our location\n• 📞 Contact info\n• 🍕 Menu & specials\n• 🛵 How to order`;
        };

        // Add message to chat
        const addMessage = (text, isUser = false) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = isUser ? 'user-msg' : 'bot-msg';
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        // Show typing indicator
        const showTyping = () => {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typing';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        // Remove typing indicator
        const hideTyping = () => {
            const typing = document.getElementById('typing');
            if (typing) typing.remove();
        };

        // Handle send
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, true);
            chatInput.value = '';

            // Show typing indicator
            showTyping();

            // Simulate AI thinking time
            setTimeout(() => {
                hideTyping();
                const response = getAIResponse(message);
                addMessage(response);
            }, 800 + Math.random() * 700); // 0.8-1.5s delay
        };

        // Event listeners
        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}); // End DOMContentLoaded for Chat Widget
