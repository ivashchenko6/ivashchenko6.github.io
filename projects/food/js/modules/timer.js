function timer(id, deadline) {
    

    function beautifyData(num) {
        return (String(num).length >=2) ? num : `0${num}`
    }

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date);

        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days =Math.floor( t / (1000 * 60 * 60 * 24));
            hours =Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes =Math.floor(( t / 1000 / 60) % 60 );
            seconds  =Math.floor((t / 1000) % 60);
        }

    

        return {
            total: t,
            days,
            hours, 
            minutes, 
            seconds
        }

    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');


        const timeInterval = setInterval(updateClock, 1000)

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = beautifyData(t.days);
            hours.textContent = beautifyData(t.hours);
            minutes.textContent = beautifyData(t.minutes);
            seconds.textContent = beautifyData(t.seconds);

            if(total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);


    
}


export default timer;