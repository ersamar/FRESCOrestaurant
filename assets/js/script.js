// Add Event Listeners for Debugging
document.addEventListener('DOMContentLoaded', function () {
    updateCartButton();
    
    console.log("DOM fully loaded and parsed");

    // chatBoxSendMessage
    const messageInput = document.getElementById("messageInput");
    if (messageInput) {
        messageInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    document.querySelector(".icon-send").addEventListener("click", sendMessage);

    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
        fileInput.addEventListener("change", handleFileSelection);
    }

    if (messageInput) {
        messageInput.addEventListener("input", hideSendIcon);
    }
});

// Function to update the cart button
function updateCartButton() {
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        // Your logic to update the cart button goes here
        console.log("Cart button updated");

        // Example: update the button text with the number of items in the cart
        const cartItemCount = document.querySelectorAll('.cart-item').length;
        cartButton.textContent = `Cart (${cartItemCount})`;
    } else {
        console.warn("Cart button not found");
    }
}

// Initialize custom select
function initializeCustomSelect(customSelectWrapper) {
    const selectTrigger = customSelectWrapper.querySelector('.custom-select-trigger');
    const selectOptions = customSelectWrapper.querySelector('.custom-select-options');
    const selectArrow = customSelectWrapper.querySelector('.custom-select-arrow');
    
    const options = selectOptions.querySelectorAll('span');

    if (!selectTrigger || !selectOptions || !selectArrow) {
        console.error('Custom select elements not found');
        return;
    }

    selectTrigger.addEventListener('click', function() {
        selectOptions.classList.toggle('active');
        selectArrow.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!selectTrigger.contains(e.target) && !selectOptions.contains(e.target)) {
            selectOptions.classList.remove('active');
            selectArrow.classList.remove('active');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            selectTrigger.querySelector('span').textContent = this.textContent;
            selectOptions.classList.remove('active');
            selectArrow.classList.remove('active');
        });
    });
}

document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
    initializeCustomSelect(wrapper);
});

// Initialize date picker
function initializeDatePicker(datePicker) {
    const dateInput = datePicker.querySelector('.custom-date-input');
    const calendar = datePicker.querySelector('.calendar');
    const currentMonth = calendar.querySelector('.current-month');
    const prevMonth = calendar.querySelector('.prev-month');
    const nextMonth = calendar.querySelector('.next-month');
    const calendarBody = calendar.querySelector('.calendar-body');
    let selectedDate = null;
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonthIndex = date.getMonth();

    if (!dateInput || !calendar || !currentMonth || !prevMonth || !nextMonth || !calendarBody) {
        console.error('Date picker elements not found');
        return;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function generateCalendar(year, month) {
        calendarBody.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarBody.innerHTML += `<div></div>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            calendarBody.innerHTML += `<div class="date">${i}</div>`;
        }

        document.querySelectorAll('.calendar-body .date').forEach(dateElement => {
            dateElement.addEventListener('click', function () {
                selectedDate = new Date(year, month, this.textContent);
                dateInput.value = selectedDate.toDateString();
                calendar.querySelector('.selected')?.classList.remove('selected');
                this.classList.add('selected');
                calendar.classList.remove('active');
            });
        });

        currentMonth.textContent = `${months[month]} ${year}`;
    }

    dateInput.addEventListener('click', function () {
        calendar.classList.toggle('active');
        generateCalendar(currentYear, currentMonthIndex);
    });

    prevMonth.addEventListener('click', function () {
        currentMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
        currentYear = currentMonthIndex === 11 ? currentYear - 1 : currentYear;
        generateCalendar(currentYear, currentMonthIndex);
    });

    nextMonth.addEventListener('click', function () {
        currentMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
        currentYear = currentMonthIndex === 0 ? currentYear + 1 : currentYear;
        generateCalendar(currentYear, currentMonthIndex);
    });

    generateCalendar(currentYear, currentMonthIndex);
}

document.querySelectorAll('.custom-date-picker').forEach(datePicker => {
    initializeDatePicker(datePicker);
});

// Chatbox Code
function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector(".open-button").style.display = "none";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector(".open-button").style.display = "block";
}

function showSendIcon() {
    document.getElementById("linkIcon").style.display = "none";
    document.getElementById("sendIcon").style.display = "inline-block";
}

function hideSendIcon() {
    const messageInput = document.getElementById("messageInput").value;
    if (messageInput.trim() === "" && !document.getElementById("messageImage").src) {
        document.getElementById("linkIcon").style.display = "inline-block";
        document.getElementById("sendIcon").style.display = "none";
    }
}

function handleFileSelection(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const messageImage = document.getElementById("messageImage");
    const fileLink = document.getElementById("fileLink");

    if (file) {
        const fileType = file.type;

        if (fileType.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                messageImage.src = e.target.result;
                messageImage.style.display = "block";
                fileLink.style.display = "none";
            }
            reader.readAsDataURL(file);
        } else {
            messageImage.style.display = "none";
            fileLink.href = URL.createObjectURL(file);
            fileLink.textContent = file.name;
            fileLink.style.display = "block";
        }

        showSendIcon();
    } else {
        messageImage.style.display = "none";
        fileLink.style.display = "none";
    }
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    const imagePreview = document.getElementById("messageImage");

    if (message !== "" || imagePreview.src !== "") {
        const chatBody = document.querySelector(".chat-body");
        const newMessage = document.createElement("div");
        newMessage.classList.add("message", "right");

        let messageContent = "";
        if (message !== "") {
            messageContent += `<p>${message}</p>`;
        }
        if (imagePreview.src !== "") {
            messageContent += `<img src="${imagePreview.src}" class="message-image" />`;
        }

        newMessage.innerHTML = messageContent;

        const timeElement = document.createElement("div");
        timeElement.classList.add("time-status-container");
        timeElement.innerHTML = `
            <span class="time">${getCurrentTime()}</span>
            <span class="status">Sent</span>
        `;

        chatBody.appendChild(newMessage);
        chatBody.appendChild(timeElement);

        // Clear input field and image preview
        messageInput.value = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
        document.getElementById("linkIcon").style.display = "inline-block";
        document.getElementById("sendIcon").style.display = "none";
        chatBody.scrollTop = chatBody.scrollHeight;
    } else {
        console.log("No message or image to send");
    }
}
