
function showWindow(selector) {
    const modal = document.querySelector(selector);
    
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

}

function closeModal(selector) {
    const modal = document.querySelector(selector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal (selector,trigger) {
    const modal = document.querySelector(selector);
    document.querySelector('body').addEventListener('click', (e) => {
        if (e.target && e.target.matches(trigger)) {
            callModalWindow();
        }
    });

    window.addEventListener('scroll', showScroll);

    function showScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            callModalWindow();
            window.removeEventListener('scroll', showScroll);
        }
    }

    const result = setTimeout(callModalWindow, 500000);

    function callModalWindow() {
        showWindow(selector);
        hideWindow();
        clearInterval(result);
    }


    function hideWindow() {
        modal.addEventListener('click', (event) => {
            const t = event.target;
            if (t && t.matches('[data-close]')) {
                closeModal(selector);
            }
        });

    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

export default modal;
export {showWindow,closeModal};