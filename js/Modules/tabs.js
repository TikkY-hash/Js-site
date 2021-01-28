function tabs(tabText,selectorClass,selectorParent,activeClass) {
    const contentText = document.querySelectorAll(tabText),
        tabClass = document.querySelectorAll(selectorClass),
        tabParent = document.querySelector(selectorParent);

    function tabHide() {
        contentText.forEach(value => {
            value.classList.add("hide");
            value.classList.remove("show");
        });

        tabClass.forEach(value => {
            value.classList.remove(activeClass);
        });
    }

    function showTab(i = 0) {
        contentText[i].classList.remove("hide");
        contentText[i].classList.add("show");

        tabClass[i].classList.add(activeClass);
    }

    tabParent.addEventListener('click', (e) => {
        const currentTarget = e.target;
        if (currentTarget && currentTarget.matches(`div${selectorClass}`)) {
            tabClass.forEach((value, i) => {
                if (value == currentTarget) {
                    tabHide();
                    showTab(i);
                }
            });
        }
    });


    tabHide();
    showTab();
}

export default tabs;