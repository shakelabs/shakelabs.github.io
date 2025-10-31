// Smooth scrolling for navigation links
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

// Parallax scroll effect for background text
function updateParallax() {
    const backgroundText = document.querySelector('.background-text');
    const scrolled = window.pageYOffset;
    backgroundText.style.transform = `translateX(${scrolled * 0.1}px)`;
}

// Header background and mobile menu
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(12px)';
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
    updateParallax();
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Tab functionality removed - now using separate sections

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // 画面内に入ったらrevealedクラスを追加
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
        } else {
            // 画面外に出たらrevealedクラスを削除して再度アニメーション可能にする
            entry.target.classList.remove('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Contact form handling
document.getElementById('simpleContactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        alert('すべての項目を入力してください。');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('有効なメールアドレスを入力してください。');
        return;
    }
    
    const submitBtn = this.querySelector('.simple-submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('お問い合わせありがとうございます！確認次第ご返信いたします。');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Interactive effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1)';
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Footer scroll to top
document.querySelector('.footer-top-icon').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Performance optimization: Debounce scroll events
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

window.addEventListener('scroll', debounce(updateParallax, 10));

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('shakelabs website loaded successfully!');
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 968) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Progressive enhancement
if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('revealed');
    });
}

// Skills Radar Charts
function createRadarChart(canvasId, labels, data, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Skill Level',
                data: data,
                backgroundColor: `rgba(${color}, 0.2)`,
                borderColor: `rgba(${color}, 0.8)`,
                borderWidth: 2,
                pointBackgroundColor: `rgba(${color}, 1)`,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: `rgba(${color}, 1)`,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        },
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(250, 128, 114, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(250, 128, 114, 0.2)'
                    },
                    pointLabels: {
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#333'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Front-end skills (pink/salmon)
    createRadarChart('frontendChart',
        ['HTML/CSS', 'JavaScript', 'jQuery', 'Vue.js/Vue CLI', 'CSS FW', 'WordPress'],
        [5, 4, 4, 3, 3, 2],
        '255, 182, 193'
    );

    // Back-end skills (green)
    createRadarChart('backendChart',
        ['Python', 'Django', 'Go', 'PostgreSQL', 'MySQL', 'Nginx'],
        [5, 4, 3, 3, 2, 2],
        '144, 238, 144'
    );

    // DevOps skills (yellow/orange)
    createRadarChart('devopsChart',
        ['Linux', 'Git/ GitHub', 'Docker', 'Docker Compose', 'Vim', 'AWS'],
        [5, 4, 4, 3, 2, 2],
        '255, 215, 0'
    );
});
