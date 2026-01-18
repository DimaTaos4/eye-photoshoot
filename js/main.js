/**
 * ============================================
 * MAIN JAVASCRIPT FILE
 * Safe & Modular Version
 * ============================================
 * Работает корректно даже если
 * некоторых секций нет на странице
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       SIMPLE IMAGE SLIDER (если есть)
    ======================================== */

    const sliderImage = document.getElementById('sliderImage');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (sliderImage && nextBtn && prevBtn) {

        const images = [
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=1600&q=80"
        ];

        let currentIndex = 0;

        const changeImage = (index) => {
            sliderImage.classList.add('fade-out');

            setTimeout(() => {
                sliderImage.src = images[index];
                sliderImage.classList.remove('fade-out');
            }, 200);
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            changeImage(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            changeImage(currentIndex);
        });
    }

    /* ========================================
       SWIPER – GALLERY
    ======================================== */

    if (document.querySelector('.gallerySwiper')) {
        new Swiper('.gallerySwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            loop: true,
            grabCursor: true
        });
    }

    /* ========================================
       SWIPER – STORIES
    ======================================== */

    if (document.querySelector('.storiesSwiper')) {
        new Swiper('.storiesSwiper', {
            slidesPerView: 1,
            effect: 'fade',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            loop: true,
            speed: 800
        });
    }

    /* ========================================
       FAQ ACCORDION
    ======================================== */

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (!question || !answer || !icon) return;

        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';

        const toggle = () => {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(i => {
                i.classList.remove('active');
                const a = i.querySelector('.faq-answer');
                const ic = i.querySelector('.faq-icon');
                if (a && ic) {
                    a.style.maxHeight = '0';
                    ic.textContent = '+';
                }
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
            }
        };

        question.addEventListener('click', toggle);
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    /* ========================================
       SMOOTH SCROLL
    ======================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
