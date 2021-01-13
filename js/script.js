document.addEventListener('DOMContentLoaded',() => {

    const contentText = document.querySelectorAll('.tabcontent'),
          tabClass = document.querySelectorAll('.tabheader__item'),
          tabParent = document.querySelector('.tabheader__items');

    function tabHide() {
        contentText.forEach(value => {
            value.classList.add("hide");
            value.classList.remove("show");
        });

        tabClass.forEach(value => {
            value.classList.remove('tabheader__item_active');
        });
    }

    function showTab(i = 0) {
        contentText[i].classList.remove("hide");
        contentText[i].classList.add("show");

        tabClass[i].classList.add('tabheader__item_active');
    }

    tabParent.addEventListener('click',(e) => {
        const currentTarget = e.target;
        if(currentTarget && currentTarget.matches('div.tabheader__item')) {
            tabClass.forEach((value,i) => {
              if(value == currentTarget) {
                tabHide();
                showTab(i);
              }
            });
        }
    });


    tabHide();
    showTab();
});