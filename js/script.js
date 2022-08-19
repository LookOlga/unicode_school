'use stict'

window.addEventListener('load', () => {
    setTimeout(function () {
        document.body.classList.add('loaded');
    }, 400);
})

const bodyTag = document.querySelector('body');

const scrollToTarget = () => {
    const pageUpBtn = document.querySelector('.pageup');

    const trackScroll = () => {
        if (window.pageYOffset > 1000) {
            pageUpBtn.classList.add('visible');
        } else {
            pageUpBtn.classList.remove('visible');
        }
    }

    const scrollToTop = () => {
        document.body.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }

    const scrollToSection = (e) => {

        if (e.target.tagName !== 'A') return;

        const href = e.target.getAttribute('href');
        if (href[0] !== '#') return;
        const el = document.querySelector(href);

        if (!el) return;

        e.preventDefault();
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    window.addEventListener('click', scrollToSection);
    pageUpBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', trackScroll);

}

const menu = () => {
    const burgerBtn = document.querySelector('.hamburger'),
        menu = document.querySelector('.header__menu');

    const openMenu = () => {
        bodyTag.classList.toggle('menu-active');
        if (bodyTag.classList.contains('menu-active')) {
            bodyTag.style.overflow = 'hidden';
        } else {
            bodyTag.style.overflow = 'visible';
        }

    }

    menu.addEventListener('click', (e) => {
        if (e.target.classList.contains('header__menu-link') && bodyTag.classList.contains('menu-active')) {
            bodyTag.classList.remove('menu-active');
            bodyTag.style.overflow = 'visible';
        }
    })

    burgerBtn.addEventListener('click', openMenu);
}

const modal = () => {
    const overlay = document.querySelector('.overlay'),
            pageUpBtn = document.querySelector('.pageup');
            let modal;

    const closeModal = () => {
        modal.style.opacity = 0;
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        bodyTag.style.overflow = 'visible';
        pageUpBtn.disabled = false;
    }

    bodyTag.addEventListener('click', (e) => {
        if (e.target.classList.contains('button')) {
            const attr = e.target.getAttribute('data-modal');
            
            modal = document.querySelector(`#${attr}`);
            if (modal) {
                modal.style.opacity = 1;
                overlay.style.opacity = 1;
                overlay.style.pointerEvents = 'auto';
                bodyTag.style.overflow = 'hidden';

                const modalCloseBtn = modal.querySelector('.modal__close');
                modalCloseBtn.addEventListener('click', closeModal);

                pageUpBtn.disabled = true;
            } 
        }

        if (e.target === overlay && e.target !== modal) {
            closeModal();
        }
    })
}



scrollToTarget();
menu();
modal();