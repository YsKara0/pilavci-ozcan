document.addEventListener('DOMContentLoaded', () => {

    // ----- Mobil Menü Toggle -----
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Menü açıkken body scroll'u engelle (isteğe bağlı)
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Mobil menü linklerine tıklanınca menüyü kapat
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Scroll'u tekrar aç
            });
        });
    }

    // ----- Sabit Header Rengi Değişimi (Scroll'da) -----
    const header = document.getElementById('header');
    if (header) {
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

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50; // Header yüksekliği + biraz pay
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

         // Eğer hiçbir section aktif değilse (en üstte veya en altta) hero'yu aktif yap
        if (current === '' && scrollY < sections[0].offsetTop - header.offsetHeight - 50) {
             current = 'hero';
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            // Linkin href'indeki # işaretini kaldırıp section id ile karşılaştır
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
         // Eğer Hero bölümündeysek Ana Sayfa linkini aktif yap
        if (current === 'hero') {
            const homeLink = document.querySelector('#navbar ul li a[href="#hero"]');
            if(homeLink) homeLink.classList.add('active');
        }
    });


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

            // Basit Geri Bildirim:
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

}); // DOMContentLoaded Sonu