// Show cart

(function() {
    const $cartInfo = document.querySelector('#cart-info');
    const $cart = document.querySelector('#cart');
    
    $cartInfo.addEventListener('click', function() {
        $cart.classList.toggle('show-cart');
    });
})();

// Add items to cart

(function() {
    const $cartBtns = document.querySelectorAll('.store-item-icon')

    $cartBtns.forEach(cartBtn => {
        cartBtn.addEventListener('click', e => {
            // Avoid Event Bubbling
            if(e.target.parentElement.classList.contains('store-item-icon')) {
                
                let fullPathImage = e.target.parentElement.previousElementSibling.src;
                let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent
                let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent
                let finalPrice = parseInt(price.slice(1).trim())

                const item = {};
                item.img = fullPathImage;
                item.name = name;
                item.price = finalPrice;

                const cartItem = document.createElement('div');
                cartItem.classList.add(
                    'cart-item', 'd-flex', 
                    'justify-content-between', 
                    'text-capitalize', 'my-3'
                    );
                cartItem.innerHTML = `
                        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                        
                        <div class="cart-item-text">
                            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                            <span>$</span>
                            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                        </div>
                        
                        <a href="#" id='cart-item-remove' class="cart-item-remove">
                            <i class="fas fa-trash"></i>
                        </a>
                `

                const $cart = document.querySelector('#cart');
                const $total = document.querySelector('.cart-total-container')

                $cart.insertBefore(cartItem, $total);
                alert(`${item.name} added to the cart`);
                showTotal();
            }
        })
    })

    function showTotal() {
        const total = []
        const $itemsPrice = document.querySelectorAll('.cart-item-price')

        $itemsPrice.forEach(item => {
            total.push(parseFloat(item.textContent))
        })

        const totalPrice = total.reduce((total, item) => { 
            total += item;
            return total
        }, 0).toFixed(2)
        console.log(totalPrice);

        document.querySelector('#cart-total').textContent = totalPrice
        document.querySelector('#item-count').textContent = total.length
        document.querySelector('.item-total').textContent = totalPrice
    }
})()
