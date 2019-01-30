class Cart {
    constructor(source, container = '#cart') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров
        this.cartItems = []; // Массив с товарами
        this._init(this.source);
    }
    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalGoods = $('<div/>', {
            class: 'cart-summary sum-amount'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalGoods.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
    }
    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб.</p>`));
        //$container.append($(`<button class="remowBtn" data-id="${product.id_product}" >Удалить</button>`))
        let $remowBtn = $(`<button class="remowBtn">&times</button>`);
        $container.append($remowBtn);
        $remowBtn.click( () => {
            this._remove(product.id_product);
        })
        $container.appendTo($('.cart-items-wrap'));
    }
    _renderSum() {
        $('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Общая сумма: ${this.amount} руб.`);
    }
    _init(source) {
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum();
            })
    }
    _updateCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
    }

    /***
     *
     * @param element Добавление продукта в корзину.
     */
    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.countGoods += product.quantity;
            this.amount += product.price;
            this._renderItem(product);
        }
        this._renderSum();
    }

    /****
     *
     * @private _remove Метод для удаления товара
     */
    _remove() {

    //     $('.cart-items-wrap').on('click', '.remowBtn', e => {
    //         // перебираем весь массив покупок
    //         for (let i = 0; i < this.cartItems.length; i++) {
    //             // если находим товар, который удаляется
    //             if (this.cartItems[i].id_product === e.target.dataset.id) {
    //                 // убираем 1 из quantity
    //                 this.cartItems[i].quantity--;
    //                 // если больше нет товара такого то убираем совсем
    //                 if (this.cartItems[i].quantity <= 0) {
    //                     this.cartItems.splice(i, 1);
    //                 }
    //                 // Доп.
    //                 this.countGoods--;
    //                 this.amount -= find.price;
    //                 this._updateCart(this.cartItems[i]);
    //             }
    //         }
    //     });
    }

}
