//Для горизонтальной
$(function () {

    $('#tabs').on('click', '.tab', function () {

        let tabs = $('#tabs .tab'),
            cont = $('#tabs .tab-cont');

        // Удаляем классы active
        tabs.removeClass('active');
        cont.removeClass('active');
        // Добавляем классы active
        $(this).addClass('active');
        cont.eq($(this).index()).addClass('active');

        return false;
    });
});
//Для вертикальной
$(function () {

    $('#tabs_vertically').on('click', '.tab', function () {

        let tabs = $('#tabs_vertically .tab'),
            cont = $('#tabs_vertically .tab-cont');

        // Удаляем классы active
        tabs.removeClass('active');
        cont.removeClass('active');
        // Добавляем классы active
        $(this).addClass('active');
        cont.eq($(this).index()).addClass('active');

        return false;
    });
});