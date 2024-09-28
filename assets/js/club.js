document.addEventListener('DOMContentLoaded', () => {
    // Form validation for booking and contact forms
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        return isValid;
    };

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

     // BOGO offer countdown
     const countDownDateBOGO = new Date("Sep 30, 2024 23:59:59").getTime();
    
     const xBOGO = setInterval(function() {
         const now = new Date().getTime();
         const distanceBOGO = countDownDateBOGO - now;
         const daysBOGO = Math.floor(distanceBOGO / (1000 * 60 * 60 * 24));
         const hoursBOGO = Math.floor((distanceBOGO % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutesBOGO = Math.floor((distanceBOGO % (1000 * 60 * 60)) / (1000 * 60));
         const secondsBOGO = Math.floor((distanceBOGO % (1000 * 60)) / 1000);
 
         document.getElementById("daysBOGO").textContent = String(daysBOGO).padStart(2, '0');
         document.getElementById("hoursBOGO").textContent = String(hoursBOGO).padStart(2, '0');
         document.getElementById("minutesBOGO").textContent = String(minutesBOGO).padStart(2, '0');
         document.getElementById("secondsBOGO").textContent = String(secondsBOGO).padStart(2, '0');
 
         if (distanceBOGO < 0) {
             clearInterval(xBOGO);
             document.querySelector("#countdownBOGO").innerHTML = "The offer has ended!";
         }
     }, 1000);
 
     // Free Gift offer countdown
     const countDownDateGift = new Date("Sep 25, 2024 23:59:59").getTime();
     
     const xGift = setInterval(function() {
         const now = new Date().getTime();
         const distanceGift = countDownDateGift - now;
         const daysGift = Math.floor(distanceGift / (1000 * 60 * 60 * 24));
         const hoursGift = Math.floor((distanceGift % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutesGift = Math.floor((distanceGift % (1000 * 60 * 60)) / (1000 * 60));
         const secondsGift = Math.floor((distanceGift % (1000 * 60)) / 1000);
 
         document.getElementById("daysGift").textContent = String(daysGift).padStart(2, '0');
         document.getElementById("hoursGift").textContent = String(hoursGift).padStart(2, '0');
         document.getElementById("minutesGift").textContent = String(minutesGift).padStart(2, '0');
         document.getElementById("secondsGift").textContent = String(secondsGift).padStart(2, '0');
 
         if (distanceGift < 0) {
             clearInterval(xGift);
             document.querySelector("#countdownGift").innerHTML = "The free gift offer has ended!";
         }
     }, 1000);

       // Bundle Deals Timer - 1 week
    const countDownDateBundle = new Date("Sep 22, 2024 23:59:59").getTime();

    const xBundle = setInterval(function() {
        const now = new Date().getTime();
        const distanceBundle = countDownDateBundle - now;
        
        const daysBundle = Math.floor(distanceBundle / (1000 * 60 * 60 * 24));
        const hoursBundle = Math.floor((distanceBundle % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesBundle = Math.floor((distanceBundle % (1000 * 60 * 60)) / (1000 * 60));
        const secondsBundle = Math.floor((distanceBundle % (1000 * 60)) / 1000);

        document.getElementById("daysBundle").textContent = String(daysBundle).padStart(2, '0');
        document.getElementById("hoursBundle").textContent = String(hoursBundle).padStart(2, '0');
        document.getElementById("minutesBundle").textContent = String(minutesBundle).padStart(2, '0');
        document.getElementById("secondsBundle").textContent = String(secondsBundle).padStart(2, '0');

        if (distanceBundle < 0) {
            clearInterval(xBundle);
            document.getElementById("countdownBundle").innerHTML = "The offer has ended!";
        }
    }, 1000);

    // Limited Availability Timer - 4 days
    const countDownDateLimited = new Date("Sep 19, 2024 23:59:59").getTime();

    const xLimited = setInterval(function() {
        const now = new Date().getTime();
        const distanceLimited = countDownDateLimited - now;
        
        const daysLimited = Math.floor(distanceLimited / (1000 * 60 * 60 * 24));
        const hoursLimited = Math.floor((distanceLimited % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLimited = Math.floor((distanceLimited % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLimited = Math.floor((distanceLimited % (1000 * 60)) / 1000);

        document.getElementById("daysLimited").textContent = String(daysLimited).padStart(2, '0');
        document.getElementById("hoursLimited").textContent = String(hoursLimited).padStart(2, '0');
        document.getElementById("minutesLimited").textContent = String(minutesLimited).padStart(2, '0');
        document.getElementById("secondsLimited").textContent = String(secondsLimited).padStart(2, '0');

        if (distanceLimited < 0) {
            clearInterval(xLimited);
            document.getElementById("countdownLimited").innerHTML = "The offer has ended!";
        }
    }, 1000);
});
