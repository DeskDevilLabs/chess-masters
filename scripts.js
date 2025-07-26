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

    // Initialize image loading with spinners
    initImageLoading();
});

// Image loading with spinners
function initImageLoading() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;
        
        // Create spinner container
        const spinnerContainer = document.createElement('div');
        spinnerContainer.className = 'loading-spinner';
        
        // Create spinner
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinnerContainer.appendChild(spinner);
        
        // Insert spinner before the image
        item.insertBefore(spinnerContainer, img);
        
        // Set image to be invisible initially
        img.style.opacity = '0';
        
        // Handle image loading based on loading attribute
        if (img.loading === 'lazy') {
            // For lazy-loaded images
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        if (lazyImage.dataset.src) {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.removeAttribute('data-src');
                        }
                        observer.unobserve(lazyImage);
                    }
                });
            }, {
                rootMargin: '200px' // Load images 200px before they come into view
            });
            
            observer.observe(img);
        } else {
            // For eagerly loaded images
            if (img.complete) {
                imageLoaded(img, spinnerContainer);
            }
        }
        
        // Load event handler for all images
        img.addEventListener('load', function() {
            imageLoaded(img, spinnerContainer);
        });
        
        // Error handling
        img.addEventListener('error', function() {
            spinnerContainer.remove();
            img.alt = 'Failed to load image';
            img.style.opacity = '1'; // Show error state
        });
    });
}

// Helper function to handle loaded image
function imageLoaded(img, spinnerContainer) {
    // Show image
    img.style.opacity = '1';
    
    // Remove spinner after a small delay
    setTimeout(() => {
        spinnerContainer.style.opacity = '0';
        setTimeout(() => {
            spinnerContainer.remove();
        }, 300);
    }, 300);
}