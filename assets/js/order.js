// Modal Code
function showPickup() {
    document.getElementById('pickupContent').style.display = 'block';
    document.getElementById('deliveryContent').style.display = 'none';
    const orderModalLabel = document.getElementById('orderModalLabel');
    if (orderModalLabel) {
        orderModalLabel.innerText = 'How would you like to receive your order ?';
    }
}

function showDelivery() {
    document.getElementById('pickupContent').style.display = 'none';
    document.getElementById('deliveryContent').style.display = 'block';
    const orderModalLabel = document.getElementById('orderModalLabel');
    if (orderModalLabel) {
        orderModalLabel.innerText = 'How would you like to receive your order ?';
    }
}
function showPickupFromOutside() {
    showPickup();
    var modal = new bootstrap.Modal(document.getElementById('orderModal'));
    modal.show();
}

function showDeliveryFromOutside() {
    showDelivery();
    var modal = new bootstrap.Modal(document.getElementById('orderModal'));
    modal.show();
}
function toggleTimeSelector(show) {
    document.getElementById('timeSelector').style.display = show ? 'block' : 'none';
}
// savetime&dateOfPickup
function savePickupDetails() {
    const pickupTimeSpan = document.querySelector('p span');
    const pickup30Min = document.getElementById('pickup-30min');
    const pickupSchedule = document.getElementById('pickup-schedule');
    const timeSelector = document.getElementById('timeSelector');
    const dateInput = timeSelector.querySelector('input[type="text"]').value;
    const timeInput = timeSelector.querySelector('input[type="time"]').value;

    if (pickup30Min.checked) {
        pickupTimeSpan.textContent = 'Upto 30 minutes';
    } else if (pickupSchedule.checked) {
        const formattedDate = dateInput ? `on ${dateInput}` : '';
        const formattedTime = timeInput ? ` at ${timeInput}` : '';
        pickupTimeSpan.textContent = `Scheduled for later${formattedDate}${formattedTime}`;
    }
}

// Add event listener to the save button
document.getElementById('saveButton').addEventListener('click', function () {
    savePickupDetails();
    
    // Hide the modal using Bootstrap's Modal API
    var modalElement = document.getElementById('orderModal');
    var modal = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
    if (modal) {
        modal.hide(); // Hide the modal
    }
});

// deliveryCodeCountryPicker
const data = [
    { city: 'New York', country: 'United States' },
    { city: 'Los Angeles', country: 'United States' },
    { city: 'Toronto', country: 'Canada' },
    { city: 'Vancouver', country: 'Canada' },
    { city: 'London', country: 'United Kingdom' },
    { city: 'Manchester', country: 'United Kingdom' }
    // Add more cities and countries as needed
];

document.getElementById('location').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    
    if (input.length > 1) {
        const filteredData = data.filter(item => 
            item.city.toLowerCase().includes(input) || 
            item.country.toLowerCase().includes(input)
        );

        filteredData.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.city}, ${item.country}`;
            div.style.cursor = 'pointer';
            div.addEventListener('click', function() {
                document.getElementById('location').value = `${item.city}, ${item.country}`;
                document.getElementById('pickup-address').textContent = `${item.city}, ${item.country}`;
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(div);
        });

        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
});

document.addEventListener('click', function(e) {
    if (!document.getElementById('suggestions').contains(e.target) && 
        e.target !== document.getElementById('location')) {
        document.getElementById('suggestions').style.display = 'none';
    }
});

// Cart State
function getCart() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Ensure to call this function after items are added or updated
function updateCartButton() {
    const cart = getCart();
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Update the cart button in index.html
    const cartButtonIndex = document.querySelector('.nav-link-cart .cart');
    if (cartButtonIndex) {
        cartButtonIndex.innerHTML = `<i class="bi bi-cart"></i> (${itemCount})`;
    }

    // Update the cart button in order.html
    const cartButtonOrder = document.querySelector('.view-btn .btn-warning');
    if (cartButtonOrder) {
        cartButtonOrder.textContent = `View Cart (${itemCount})`;
    }
}

function addToCart(itemName, itemPrice, quantity) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity });
    }
    saveCart(cart);
    updateCartButton();
}


// Function to handle clicking on an item
document.querySelectorAll('.col-lg-2').forEach(item => {
    item.addEventListener('click', function() {
        let itemName = this.querySelector('h5').innerText;
        let itemPrice = parseFloat(this.getAttribute('data-price'));

        document.getElementById('itemModalLabel').innerText = itemName;
        document.getElementById('itemPrice').innerText = `$${itemPrice.toFixed(2)}`;

        document.getElementById('itemQuantity').value = 1;
        updatePrice(itemPrice);

        let modal = new bootstrap.Modal(document.getElementById('itemModal'));
        modal.show();

        document.querySelector('.modal-body .btn-primary').onclick = function() {
            const quantity = parseInt(document.getElementById('itemQuantity').value);
            addToCart(itemName, itemPrice, quantity);
            let modalInstance = bootstrap.Modal.getInstance(document.getElementById('itemModal'));
            modalInstance.hide();
        };
    });
});

function updatePrice(price) {
    let quantity = parseInt(document.getElementById('itemQuantity').value);
    let totalPrice = (price * quantity).toFixed(2);
    document.querySelector('.modal-body .btn-primary').innerText = `Add to Cart - $${totalPrice}`;
}

function changeQuantity(amount) {
    const quantityInput = document.getElementById('itemQuantity');
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity + amount > 0) {
        quantityInput.value = currentQuantity + amount;
        const itemPrice = parseFloat(document.getElementById('itemPrice').innerText.replace('$', ''));
        updatePrice(itemPrice);
    }
}
