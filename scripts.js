document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0)';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0)';
            }
        });
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const lazyLoad = function() {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0 && getComputedStyle(img).display !== 'none') {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        };
        
        // Initial check
        lazyLoad();
        
        // Listen to scroll events
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.main-nav a');
    
    navLinksAll.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});