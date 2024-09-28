document.addEventListener('DOMContentLoaded', function() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartItemsBody = document.getElementById('cartItemsBody');
    let totalAmount = 0;
    let pickupCharge = 1.00;
    let cartTable = document.querySelector('table');
    let cartForm = document.querySelector('form');
    let emptyMessage = document.getElementById('emptyMessage');
    let checkoutSection = document.getElementById('checkoutSection');
    let loading = document.getElementById('loading');
    let promoBtn = document.querySelector('.promo-btn');
    let promoApplied = false;

    function calculateTotal() {
        totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('pickupChargeText').innerText = `Pickup Charge: $${pickupCharge.toFixed(2)}`;
        totalAmount += pickupCharge;
        document.getElementById('cartTotal').innerText = `Grand Total: $${totalAmount.toFixed(2)}`;
    }

    if (cartItems.length === 0) {
        // Cart is empty
        console.log('Cart is empty');
        cartTable.classList.add('d-none');
        cartForm.classList.add('d-none');
        emptyMessage.classList.remove('d-none');
        checkoutSection.classList.add('d-none');
        promoBtn.style.display = 'none';
    } else {
        // Cart has items
        console.log('Cart has items');
        cartTable.classList.remove('d-none');
        cartForm.classList.remove('d-none');
        emptyMessage.classList.add('d-none');
        checkoutSection.classList.remove('d-none');
        promoBtn.style.display = 'inline-block';
        loading.style.display = 'flex'; 
        cartItemsBody.innerHTML = '';

        setTimeout(() => {
            cartItems.forEach((item, index) => {
                let row = document.createElement('tr');
                let totalPrice = (item.price * item.quantity).toFixed(2);
                totalAmount += parseFloat(totalPrice);

                row.innerHTML = `
                    <td><i class="fa-solid fa-utensils"></i>&nbsp;&nbsp; ${item.name}</td>
                    <td class="item-price">$${item.price.toFixed(2)}</td>
                    <td>
                        <div class="quantity-box">
                            <button class="btn btn-outline-secondary btn-decrease" data-index="${index}">-</button>
                            <input type="text" class="form-control text-center d-inline-block quant-inp" value="${item.quantity}" readonly style="width: 50px;">
                            <button class="btn btn-outline-secondary btn-increase" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td><button class="btn btn-outline-danger btn-delete" data-index="${index}"><i class="fa-solid fa-trash"></i></button></td>
                    <td class="item-price">$${totalPrice}</td>
                `;
                cartItemsBody.appendChild(row);
            });

            calculateTotal();
            loading.style.display = 'none';

            document.querySelectorAll('.btn-decrease').forEach(button => {
                button.addEventListener('click', function() {
                    updateQuantity(parseInt(this.getAttribute('data-index')), -1);
                });
            });

            document.querySelectorAll('.btn-increase').forEach(button => {
                button.addEventListener('click', function() {
                    updateQuantity(parseInt(this.getAttribute('data-index')), 1);
                });
            });

            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    deleteItem(parseInt(this.getAttribute('data-index')));
                });
            });
        }, 500);
    }

    document.querySelector('.promo-btn').addEventListener('click', function() {
        document.getElementById('promoSection').classList.toggle('d-none');
    });

    document.getElementById('applyPromoBtn').addEventListener('click', function() {
        if (promoApplied) {
            alert('A promo code has already been applied.');
            return;
        }

        let promoInput = document.getElementById('promoInput').value.trim().toUpperCase();
        if (promoInput === 'WELCOME' || promoInput === 'DISCOUNT') {
            loading.style.display = 'flex'; 

            setTimeout(() => {
                let discountAmount = totalAmount * 0.20;
                totalAmount -= discountAmount;
                document.getElementById('cartTotal').innerText = `Grand Total: $${totalAmount.toFixed(2)}`;
                document.getElementById('promoAppliedText').innerText = `Promo code "${promoInput}" applied.`;
                document.getElementById('promoAppliedText').classList.remove('d-none');
                promoApplied = true;
                loading.style.display = 'none'; 
            }, 1000);
        } else {
            alert('Invalid promo code.');
        }
    });

});

function updateQuantity(index, change) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let item = cartItems[index];
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload();
    }
}

function deleteItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload(); 
}
