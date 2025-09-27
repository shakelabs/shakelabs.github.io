// スプラッシュスクリーン関連
let splashShown = false;

// サイトに入る機能
function enterSite() {
    const splash = document.getElementById('hero-splash');
    const header = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');
    
    // スプラッシュをフェードアウト
    splash.classList.add('fade-out');
    
    // 1秒後にメインコンテンツを表示
    setTimeout(() => {
        splash.style.display = 'none';
        header.style.display = 'block';
        mainContent.style.display = 'block';
        
        // ページ内リンクを有効化
        enablePageNavigation();
        
        // メインコンテンツにフェードイン効果
        mainContent.style.opacity = '0';
        header.style.opacity = '0';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease';
            header.style.transition = 'opacity 0.5s ease';
            mainContent.style.opacity = '1';
            header.style.opacity = '1';
        }, 100);
        
        splashShown = true;
    }, 1000);
}

// スクロールでもサイトに入れるように
let scrollThreshold = 100;
let scrollAmount = 0;

window.addEventListener('scroll', () => {
    if (!splashShown) {
        scrollAmount += Math.abs(window.scrollY);
        if (scrollAmount > scrollThreshold) {
            enterSite();
        }
    }
});

// スプラッシュ画面でのキーボード操作
document.addEventListener('keydown', (e) => {
    if (!splashShown && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
        e.preventDefault();
        enterSite();
    }
});

// ページ内ナビゲーションを有効化
function enablePageNavigation() {
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
}

// 鮭のクリックインタラクション
document.addEventListener('DOMContentLoaded', () => {
    const salmons = document.querySelectorAll('.salmon');
    
    salmons.forEach((salmon, index) => {
        salmon.addEventListener('click', () => {
            // クリックエフェクト
            salmon.style.transform = 'scaleX(-1) scale(1.5) rotate(360deg)';
            salmon.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                salmon.style.transform = '';
                salmon.style.transition = '';
            }, 500);
            
            // 早めにサイトに入る
            if (!splashShown) {
                setTimeout(() => {
                    enterSite();
                }, 300);
            }
        });
    });
});

// パフォーマンス最適化：アニメーションの無効化オプション
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

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

// Header background and mobile menu
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (splashShown) {
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
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
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
    
    // Simulate email sending
    setTimeout(() => {
        alert('お問い合わせありがとうございます！確認次第ご返信いたします。');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Footer scroll to top
document.querySelector('.footer-top-icon').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle animation
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const spans = menuToggle.querySelectorAll('span');
        menuToggle.classList.toggle('active');
        
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
}

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

// Apply debounce to scroll events for better performance
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations or effects can be added here
}, 10);

if (splashShown) {
    window.addEventListener('scroll', debouncedScrollHandler);
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 968 && navLinks) {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    }
});

// Initialize any additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('shakelabs website loaded successfully!');
});
