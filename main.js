// Main JavaScript file for BR Jalan Securities website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initTypedText();
    initInvestmentCalculator();
    initStatsCounter();
    initScrollAnimations();
    initParticles();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Typed Text Animation
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Your Wealth, Our Expertise',
                'Invest with Confidence',
                'Building Financial Futures'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Investment Calculator
function initInvestmentCalculator() {
    const amountSlider = document.getElementById('investment-amount');
    const periodSlider = document.getElementById('investment-period');
    const riskSelect = document.getElementById('risk-profile');
    
    const amountDisplay = document.getElementById('amount-display');
    const periodDisplay = document.getElementById('period-display');
    const totalInvestment = document.getElementById('total-investment');
    const expectedReturns = document.getElementById('expected-returns');
    const totalValue = document.getElementById('total-value');
    
    if (amountSlider && periodSlider && riskSelect) {
        function updateCalculator() {
            const amount = parseInt(amountSlider.value);
            const period = parseInt(periodSlider.value);
            const risk = riskSelect.value;
            
            // Update displays
            amountDisplay.textContent = formatCurrency(amount);
            periodDisplay.textContent = period + 'Y';
            totalInvestment.textContent = formatCurrency(amount);
            
            // Calculate returns based on risk profile
            let rate;
            switch(risk) {
                case 'conservative':
                    rate = 0.09; // 9% average
                    break;
                case 'balanced':
                    rate = 0.135; // 13.5% average
                    break;
                case 'aggressive':
                    rate = 0.18; // 18% average
                    break;
                default:
                    rate = 0.135;
            }
            
            // Compound interest calculation
            const returns = calculateCompoundInterest(amount, rate, period);
            const total = amount + returns;
            
            expectedReturns.textContent = formatCurrency(returns);
            totalValue.textContent = formatCurrency(total);
            
            // Animate the numbers
            animateNumber(expectedReturns, returns);
            animateNumber(totalValue, total);
        }
        
        // Add event listeners
        amountSlider.addEventListener('input', updateCalculator);
        periodSlider.addEventListener('input', updateCalculator);
        riskSelect.addEventListener('change', updateCalculator);
        
        // Initial calculation
        updateCalculator();
    }
}

// Calculate compound interest
function calculateCompoundInterest(principal, rate, time) {
    // A = P(1 + r/n)^(nt) - P
    // Using annual compounding (n=1)
    return principal * (Math.pow(1 + rate, time) - 1);
}

// Format currency in Indian Rupees
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Animate number changes
function animateNumber(element, targetValue) {
    const currentValue = parseInt(element.textContent.replace(/[₹,]/g, '')) || 0;
    
    anime({
        targets: { value: currentValue },
        value: targetValue,
        duration: 1000,
        easing: 'easeOutExpo',
        update: function(anim) {
            element.textContent = formatCurrency(anim.animatables[0].target.value);
        }
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                anime({
                    targets: counter,
                    innerHTML: [0, target],
                    duration: 2000,
                    easing: 'easeOutExpo',
                    round: 1,
                    update: function(anim) {
                        counter.innerHTML = Math.round(anim.animatables[0].target.innerHTML);
                    }
                });
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Animate cards on scroll
    const cards = document.querySelectorAll('.card-hover');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(200)
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
}

// Particle Effect for Hero Section
function initParticles() {
    const heroSection = document.querySelector('section');
    if (!heroSection) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    heroSection.appendChild(canvas);
    
    // Particle system
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(245, 158, 11, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    initParticles();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero section
    anime({
        targets: '.hero-title',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedResize = debounce(() => {
    // Handle resize events
    if (typeof initParticles === 'function') {
        initParticles();
    }
}, 250);

window.addEventListener('resize', debouncedResize);