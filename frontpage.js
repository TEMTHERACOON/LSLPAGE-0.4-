window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    mainContent.style.display = 'block';
  }, 1500);
});

document.addEventListener('DOMContentLoaded', function() {
    const facultySlider = document.querySelector('.card');
    if (facultySlider) {
        let currentSlide = 1;
        const totalSlides = 11;
       
        setInterval(() => {
            currentSlide = currentSlide % totalSlides + 1;
            const slideRadio = document.getElementById(`slide_${currentSlide}`);
            if (slideRadio) {
                slideRadio.checked = true;
            }
        }, 3000);
       
        const slideLabels = document.querySelectorAll('.slider .slide');
        slideLabels.forEach((label, index) => {
            label.addEventListener('click', () => {
                currentSlide = index + 1;
            });
        });
    }
   
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 120,
            behavior: 'smooth'
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

   
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);
     //problem 
    
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
   
    fadeElements.forEach(el => fadeObserver.observe(el));
   
    const dropdowns = document.querySelectorAll('.dropdown');
    let timeoutId;
   
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = 'block';
        });
       
        dropdown.addEventListener('mouseleave', () => {
            const content = dropdown.querySelector('.dropdown-content');
            timeoutId = setTimeout(() => {
                content.style.display = 'none';
            }, 300);
        });
    });
   
    const adminProfiles = document.querySelectorAll('.admin-profile');
    adminProfiles.forEach(profile => {
        profile.addEventListener('mouseenter', () => {
            const img = profile.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05) rotate(2deg)';
            }
        });
       
        profile.addEventListener('mouseleave', () => {
            const img = profile.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
   
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            document.body.appendChild(modal);
           
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            `;
           
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                position: relative;
            `;
           
            modal.querySelector('.modal-content img').style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 10px;
            `;
           
            modal.querySelector('.close').style.cssText = `
                position: absolute;
                top: -40px;
                right: -40px;
                color: white;
                font-size: 40px;
                cursor: pointer;
                transition: color 0.3s;
            `;
           
            modal.querySelector('.close').addEventListener('mouseenter', function() {
                this.style.color = 'var(--lsl-yellow)';
            });
           
            modal.querySelector('.close').addEventListener('mouseleave', function() {
                this.style.color = 'white';
            });
           
            modal.querySelector('.close').addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
           
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
           
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                    document.removeEventListener('keydown', closeModal);
                }
            });
        });
    });
   
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
       
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
       
        .nav-links a.active {
            color: var(--lsl-yellow);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
       
        .close:hover {
            color: var(--lsl-yellow) !important;
        }
    `;
    document.head.appendChild(style);
   
    const firstSlide = document.getElementById('slide_1');
    if (firstSlide) {
        firstSlide.checked = true;
    }
   
    console.log('Admin & Faculty page JavaScript loaded successfully!');
});

