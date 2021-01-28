function arrowUp (selector) {
     const arrow = document.querySelector(selector);

     arrow.addEventListener('click', () => {
 
         const main = setInterval(scrollToMain, 10);
 
         function scrollToMain() {
             document.documentElement.scrollTop -= 50;
 
             if (document.documentElement.scrollTop == 0) {
                 clearInterval(main);
             }
         }
     });
}

export default arrowUp;