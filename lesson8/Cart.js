class Cart{
    constructor(source, container = '#cart') {
        this.container = container;
        this.source = source;
        this.countGoods = 0; // Общее кол-во товаров
        this.amount = 0; // Сумма товаров в корзине
        this.basketItems = []; // Товары в корзине
    }
    static async _create(source){
        let cart = new Cart(source);
        await cart._init(cart.source);
        return cart
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalAmount = $('<div/>', {
            class: 'cart-summary sum-amount'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
        $(this.container).droppable({
            drop: (event, ui) => {
                this.addProduct(ui.draggable.find('.buyBtn'));
            }
        })
    }
    async _init(source){
        this._render();
        await fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.basketItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum()
            });

    }
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб</p>`));
        let $delBtn = $('<button class="delBtn">&times;</button>');
        $container.append($delBtn);
        $delBtn.click(() => {
            this._remove(product.id_product);
        });
        $container.appendTo($('.cart-items-wrap'));
    }
    _renderSum(){
        $('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Общая сумма: ${this.amount} руб`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.basketItems.find(product => product.id_product === productId);
        if (find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find)
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1
            };
            this.basketItems.push(product);
            this.countGoods += product.quantity;
            this.amount += product.price;
            this._renderItem(product);
        }
        this._renderSum();
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб`);
    }
    _remove(productId){
        //TODO: реализовать удаление элемента корзины
        let find = this.basketItems.find(product => product.id_product === productId);
        if(find.quantity > 1){
            find.quantity--;
            this._updateCart(find);
        } else {
            let $container = $(`div[data-product="${productId}"]`);
            this.basketItems.splice(this.basketItems.indexOf(find), 1);
            $container.remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        this._renderSum();
    }
}