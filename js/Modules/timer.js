
 function helper(num) {
    if (num < 10) {
        return `0${num}`;
    } else {
        return num;
    }

}

function timer(selector,deadline) {

    function calcTime(endtime) {

        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function showTime(selector, endtime) {
        const parentElement = document.querySelector(selector),
            days = parentElement.querySelector('#days'),
            hours = parentElement.querySelector('#hours'),
            minutes = parentElement.querySelector('#minutes'),
            seconds = parentElement.querySelector('#seconds');

        const time = setInterval(callHide, 1000);

        callHide();

        function callHide() {
            const r = calcTime(endtime);

            days.innerHTML = helper(r.days);
            hours.innerHTML = helper(r.hours);
            minutes.innerHTML = helper(r.minutes);
            seconds.innerHTML = helper(r.seconds);


            if (r.t <= 0) {
                clearInterval(time);
            }
        }
    }
    showTime(selector, deadline);
}

export default timer; 
export {helper};