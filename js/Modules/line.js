function line(selector) {
     const line = document.querySelector(selector);

     setInterval(change, 10);
 
     function change() {
         line.style.width = `${Math.floor(document.documentElement.scrollTop / 2.9)}px`;
     }
}

export default line;