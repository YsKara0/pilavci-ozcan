document.addEventListener('DOMContentLoaded', () => {

    // ----- Mobil Menü Toggle -----
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // ----- Sabit Header Rengi Değişimi -----
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'var(--light-color)';
                header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // ----- Scroll Animasyonları -----
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // ----- Aktif Navigasyon -----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar ul li a');
    const headerOffset = header ? header.offsetHeight + 20 : 90;

    function setActiveLink() {
        let current = 'hero';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // ----- FORMSPREE İLETİŞİM FORMU (TEK VERSİYON) -----
    const contactForm = document.getElementById('main-contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const form = this;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Buton durumunu değiştir
            submitButton.disabled = true;
            submitButton.textContent = 'Gönderiliyor...';
            formStatus.textContent = 'Mesajınız gönderiliyor...';
            formStatus.className = 'form-message';
            
            // Form verilerini topla
            const formData = new FormData(form);
            
            // Formspree'ye gönder
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
                    formStatus.className = 'form-message success';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            formStatus.textContent = 'Form hatası: ' + data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.textContent = 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.';
                        }
                        formStatus.className = 'form-message error';
                    });
                }
            })
            .catch(error => {
                formStatus.textContent = 'Ağ hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.';
                formStatus.className = 'form-message error';
                console.error('Form gönderim hatası:', error);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }

    // ----- Menü Modalı -----
    const menuItems = document.querySelectorAll('.menu-item');
    const modal = document.getElementById('menu-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const title = this.getAttribute('data-title');
            const img = this.getAttribute('data-img');
            const description = this.getAttribute('data-description');
            const priceNote = this.getAttribute('data-price-note');
            
            document.getElementById('modal-img').src = img;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;
            document.getElementById('modal-price-note').textContent = priceNote;
            
            const priceList = document.getElementById('modal-price-list');
            priceList.innerHTML = '';
            
            if(this.hasAttribute('data-price-50')) {
                const li = document.createElement('li');
                li.textContent = '50 kişi: ' + this.getAttribute('data-price-50');
                priceList.appendChild(li);
            }
            
            if(this.hasAttribute('data-price-100')) {
                const li = document.createElement('li');
                li.textContent = '100 kişi: ' + this.getAttribute('data-price-100');
                priceList.appendChild(li);
            }
            
            if(this.hasAttribute('data-price-200')) {
                const li = document.createElement('li');
                li.textContent = '200 kişi: ' + this.getAttribute('data-price-200');
                priceList.appendChild(li);
            }
            
            if(this.hasAttribute('data-price-500')) {
                const li = document.createElement('li');
                li.textContent = '500 kişi: ' + this.getAttribute('data-price-500');
                priceList.appendChild(li);
            }
            
            if(this.hasAttribute('data-price-1000')) {
                const li = document.createElement('li');
                li.textContent = '1000 kişi: ' + this.getAttribute('data-price-1000');
                priceList.appendChild(li);
            }
            
            modal.style.display = 'block';
        });
    });
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const modalContactBtn = document.querySelector('.modal-contact-btn');
    if (modalContactBtn) {
        modalContactBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

}); // DOMContentLoaded Sonu