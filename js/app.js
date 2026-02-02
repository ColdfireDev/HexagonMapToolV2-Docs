document.addEventListener('DOMContentLoaded', function() {
    console.log('Hexagon Map Tool V2 - Documentación cargada');

    // ===== Language Selector =====
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('language') || 'es';

    // Set initial active language
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Language change handler
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to selected button
            button.classList.add('active');
            
            // Save language preference
            localStorage.setItem('language', selectedLang);
            currentLang = selectedLang;
            
            // Apply translations (to be implemented)
            applyTranslations(selectedLang);
        });
    });

    // Translation function (base structure)
    function applyTranslations(lang) {
        const translations = {
            es: {
                hero_subtitle: "Herramienta profesional para crear mapas hexagonales 3D en Unity",
                btn_start: "Comenzar",
                btn_interface: "Ver Interfaz",
                sidebar_nav: "Navegación",
                sidebar_home: "Inicio",
                sidebar_quick: "Inicio Rápido",
                sidebar_interface: "Interfaz",
                sidebar_components: "Componentes",
                sidebar_faq: "Preguntas Frecuentes"
            },
            en: {
                hero_subtitle: "Professional tool to create 3D hexagonal maps in Unity",
                btn_start: "Get Started",
                btn_interface: "View Interface",
                sidebar_nav: "Navigation",
                sidebar_home: "Home",
                sidebar_quick: "Quick Start",
                sidebar_interface: "Interface",
                sidebar_components: "Components",
                sidebar_faq: "FAQ"
            }
        };
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Apply translations on page load
    applyTranslations(currentLang);

    // ===== Toggle Sidebar =====
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    // ===== Accordion Functionality =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = header.nextElementSibling;
            
            // Toggle current accordion
            header.setAttribute('aria-expanded', !isExpanded);
            
            if (content) {
                if (isExpanded) {
                    content.classList.remove('active');
                } else {
                    content.classList.add('active');
                }
            }
        });
    });

    // ===== Tab Functionality =====
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close sidebar on mobile after clicking link
                if (window.innerWidth <= 900 && sidebar) {
                    sidebar.classList.add('hidden');
                }
            }
        });
    });

    // ===== Highlight Active Section in Sidebar =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar nav a');
    
    function highlightActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call

    // ===== Auto-close sidebar on mobile when clicking outside =====
    if (window.innerWidth <= 900) {
        document.addEventListener('click', (e) => {
            if (sidebar && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                if (!sidebar.classList.contains('hidden')) {
                    sidebar.classList.add('hidden');
                }
            }
        });
    }

    // ===== Keyboard Shortcuts for Accordion (Optional Enhancement) =====
    document.addEventListener('keydown', (e) => {
        // Press 'Escape' to close all accordions
        if (e.key === 'Escape') {
            accordionHeaders.forEach(header => {
                header.setAttribute('aria-expanded', 'false');
                const content = header.nextElementSibling;
                if (content) {
                    content.classList.remove('active');
                }
            });
        }
    });

    // ===== Add copy button to code blocks (Optional Enhancement) =====
    const codeBlocks = document.querySelectorAll('code');
    codeBlocks.forEach(code => {
        code.addEventListener('click', () => {
            const text = code.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Optional: Show a temporary "Copied!" message
                const originalText = code.textContent;
                code.textContent = '✓ Copiado!';
                setTimeout(() => {
                    code.textContent = originalText;
                }, 1000);
            });
        });
    });

    console.log('Funcionalidad de la documentación inicializada correctamente');
});

