import {showWindow,closeModal} from './modal';
import {dataPost} from '../Services/services';

function form(selector,form) {
   

    const forms = document.querySelectorAll(form);
    forms.forEach(item => sendRequest(item,selector));

    const resultRequest = {
        load: 'img/form/spinner.svg',
        success: 'Данные успешно отправленны',
        error: 'Ошибка'
    };

    function sendRequest(form,selector) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const requestMessage = document.createElement('img');
            requestMessage.src = resultRequest.load;
            requestMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', requestMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            dataPost('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data.data);
                    requestModal(resultRequest.success,selector);
                    requestMessage.remove();
                })
                .catch(() => {
                    requestModal(resultRequest.error,selector);
                })
                .finally(() => form.reset());
        });
    }

    function requestModal(message,selector) {
        const modal = document.querySelector(selector);

        const dialog = document.querySelector('.modal__dialog');
        dialog.classList.add('hide');
        showWindow(selector);

        const modalRequestMessage = document.createElement('div');
        modalRequestMessage.classList.add('modal__dialog');
        modalRequestMessage.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        modal.append(modalRequestMessage);

        setTimeout(() => {
            modalRequestMessage.remove();
            dialog.classList.remove('hide');
            dialog.classList.add('show');
            closeModal(selector);
        }, 3000);
    }
}

export default form;