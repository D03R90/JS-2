$(document).ready(() => {
   //Товары
   let product1 = new Product(123, 'Ноутбук', 45600);
   let product2 = new Product(124, 'Клавиатура', 1200);
   let product3 = new Product(125, 'Мышь', 600);

   //Корзина
    let mycart = new Cart('getCart.json');

    //Добавление товара
    $('#products').on('click', '.buyBtn', e => {
        mycart.addProduct(e.target);
    });

    //Отзывы
    let myfeed = new Feedback('feedback.json');
});