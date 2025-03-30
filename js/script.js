document.addEventListener('DOMContentLoaded', () => {

    // ----- Mobil Menü Toggle -----
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body; // Body elementini seç

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Menü açıkken body scroll'u engelle
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Mobil menü linklerine tıklanınca menüyü kapat
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = ''; // Scroll'u tekrar aç
            });
        });
    }

    // ----- Sabit Header Rengi Değişimi (Scroll'da) -----
    const header = document.getElementById('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // 50px aşağı kayınca
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; // Hafif transparan beyaz
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'var(--light-color)'; // Orijinal renk
                header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // ----- Scroll Animasyonları (Intersection Observer API) -----
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Animasyon bir kere çalışsın
                }
            });
        }, {
            threshold: 0.1 // %10 görünür olduğunda tetikle
            // rootMargin: "-50px 0px -50px 0px" // İsteğe bağlı: Tetikleme alanını ayarla
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Intersection Observer desteklenmiyorsa tüm animasyonları direkt göster
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }


    // ----- Aktif Navigasyon Linkini Belirleme (Scroll'da) -----
    const sections = document.querySelectorAll('section[id]'); // ID'si olan tüm section'lar
    const navLinks = document.querySelectorAll('#navbar ul li a');
    const headerOffset = header ? header.offsetHeight + 20 : 90; // Header yüksekliği + biraz pay (header yoksa varsayılan)

    function setActiveLink() {
        let current = 'hero'; // Varsayılan olarak hero aktif
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
            // Linkin href'indeki # işaretini kaldırıp section id ile karşılaştır
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    // Sayfa yüklendiğinde ve scroll edildiğinde aktif linki ayarla
     window.addEventListener('scroll', setActiveLink);
     setActiveLink(); // İlk yüklemede de çalıştır


    // ----- İletişim Formu Gönderimi (Basit Örnek - Backend Gerekir!) -----
    const contactForm = document.getElementById('main-contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Formun varsayılan gönderimini engelle

            // ---- ÖNEMLİ ----
            // Bu kısım sadece bir örnektir. Gerçek bir form gönderimi için
            // bir backend (PHP, Node.js, Python vb.) veya
            // Formspree, Netlify Forms gibi bir servis kullanmanız gerekir.
            // Aşağıdaki kod sadece kullanıcıya bir geri bildirim verir.
            // ----------------

            formStatus.textContent = 'Mesajınız gönderiliyor...';
            formStatus.className = 'form-message'; // Reset class

            // Simülasyon (2 saniye sonra başarılı gibi göster)
            setTimeout(() => {
                formStatus.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.';
                formStatus.classList.add('success');
                contactForm.reset(); // Formu temizle
            }, 2000);

            // Hata durumunu simüle etmek için:
            // setTimeout(() => {
            //    formStatus.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            //    formStatus.classList.add('error');
            // }, 2000);
        });
    }

    // ----- Menü modalı için kod -----
    const menuItems = document.querySelectorAll('.menu-item');
    const modal = document.getElementById('menu-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Her menü öğesine tıklama olayı ekle
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Eğer tıklanan yer "Teklif Al" butonu ise, modalı açma
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Menü verilerini al
            const title = this.getAttribute('data-title');
            const img = this.getAttribute('data-img');
            const description = this.getAttribute('data-description');
            const priceNote = this.getAttribute('data-price-note');
            
            // Modal içeriğini ayarla
            document.getElementById('modal-img').src = img;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;
            document.getElementById('modal-price-note').textContent = priceNote;
            
            // Fiyat listesini temizle
            const priceList = document.getElementById('modal-price-list');
            priceList.innerHTML = '';
            
            // Fiyatları ekle
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
            
            // Modalı göster
            modal.style.display = 'block';
        });
    });
    
    // Kapat butonuna tıklandığında modalı kapat
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Modal dışına tıklandığında modalı kapat
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // "Bu Menü İçin Teklif Al" butonuna tıklayınca modalı kapat
    const modalContactBtn = document.querySelector('.modal-contact-btn');
    if (modalContactBtn) {
        modalContactBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

}); // DOMContentLoaded Sonu