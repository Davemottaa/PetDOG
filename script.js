// JavaScript Vanilla para PetDOG Landing Page
// Animações e interações de alta conversão

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const header = document.querySelector('.header');
    
    menuToggle.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animação do hambúrguer
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar menu ao clicar em link
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            menuToggle.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima
            header.style.transform = 'translateY(0)';
        }
        
        // Adicionar sombra ao header quando scroll
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .gallery-grid img, .section-title, .section-subtitle');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('reveal', 'active');
            }
        });
    }
    
    // Adicionar classe reveal inicial
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Ativar animação no scroll
    window.addEventListener('scroll', revealOnScroll);
    // Ativar uma vez no carregamento
    revealOnScroll();
    
    // ===== SMOOTH SCROLL =====
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== CTA BUTTONS ANIMATION =====
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-primary-large');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique
        button.addEventListener('click', function(e) {
            // Criar ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Analytics tracking (simulado)
            console.log('CTA clicado:', this.textContent.trim());
        });
    });
    
    // ===== SERVICE CARDS INTERACTION =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            
            // Adicionar brilho ao card
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = '#ffffff';
        });
    });
    
    // ===== TESTIMONIALS CAROUSEL =====
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            } else {
                testimonial.style.opacity = '0.5';
                testimonial.style.transform = 'translateX(-20px)';
            }
        });
    }
    
    // Auto-rotacionar depoimentos a cada 5 segundos
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // ===== GALLERY INTERACTION =====
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Criar modal para ampliar imagem
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Estilos do modal
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const modalImg = modal.querySelector('img');
            modalImg.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            `;
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 40px;
                cursor: pointer;
                z-index: 2001;
            `;
            
            // Mostrar modal
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Fechar modal
            const closeModal = () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            
            // Fechar com ESC
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
        });
        
        // Efeito hover na galeria
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
    });
    
    // ===== FORM VALIDATION =====
    // Se houver formulários no futuro
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Remover classe de erro após 3 segundos
                    setTimeout(() => {
                        input.classList.remove('error');
                    }, 3000);
                }
            });
            
            if (isValid) {
                // Simular envio
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Enviado com sucesso!';
                    submitBtn.style.background = '#27AE60';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== ANALYTICS E TRACKING =====
    // Simular tracking de eventos
    function trackEvent(eventName, properties = {}) {
        console.log('Evento:', eventName, properties);
        // Aqui seria integrado com Google Analytics, Facebook Pixel, etc.
    }
    
    // Tracking de cliques em CTAs
    document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-nav, .btn-nav-mobile').forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('cta_click', {
                text: this.textContent.trim(),
                href: this.href,
                timestamp: new Date().toISOString()
            });
        });
    });
    
    // Tracking de scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Enviar evento a cada 25% de scroll
            if (maxScroll % 25 === 0) {
                trackEvent('scroll_depth', { percentage: maxScroll });
            }
        }
    });
    
    // ===== EFEITOS VISUAIS ADICIONAIS =====
    // Parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px) scale(1.02)`;
        }
    });
    
    // Animação de contador (se houver números no futuro)
    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // ===== INICIALIZAÇÃO FINAL =====
    // Adicionar classe loaded ao body
    document.body.classList.add('loaded');
    
    // Mostrar mensagem de boas-vindas no console
    console.log('%c🐾 PetDOG - Landing Page Carregada com Sucesso!', 'color: #FF6B35; font-size: 16px; font-weight: bold;');
    console.log('%cPronto para converter visitantes em clientes! 🚀', 'color: #4ECDC4; font-size: 14px;');
    
    // Simular carregamento de conteúdo dinâmico
    setTimeout(() => {
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }
    }, 500);
    
});

// ===== FUNÇÕES UTILITÁRIAS =====

// Debounce para otimizar eventos
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

// Verificar se elemento está visível
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Formatar telefone
function formatPhone(phone) {
    return phone.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

// ===== CSS DINÂMICO =====
const dynamicStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #e74c3c !important;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    .hero-image img {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
`;

// Adicionar estilos dinâmicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);