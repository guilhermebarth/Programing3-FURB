(function() {

    let $target = $('.animacao'),
        $anotherTarget = $('.produtosIdentacaoEntreSi'),

        outraClasseDeAnimacao = 'produtosIdentacaoEntreSi-start',
        classeDeAnimacao = 'animacao-start',

        $targetMenu = $('.divsMenu'),
        classeDeAnimacaoDoMenu = 'AsMenus-start',

        offset = $(window).height() * 3 / 4;

    function animacaoDoScroll() {
        percorrendoEfeitos($target, classeDeAnimacao);
        percorrendoEfeitos($anotherTarget, outraClasseDeAnimacao);

        let posicaoMenuNaTela = window.innerHeight * 0.35;

        for (let o = $targetMenu.length - 1; o >= 0; o--) {
            let posicaoUltimoMenu = $targetMenu[o].offsetTop + posicaoMenuNaTela;

            if ($('#divContato').offset().top - $(document).scrollTop() < posicaoUltimoMenu) {
                $($targetMenu[o].children[0]).removeClass(classeDeAnimacaoDoMenu);
            } else if ($anotherTarget.offset().top - $(document).scrollTop() <= posicaoUltimoMenu) {
                $($targetMenu[o].children[0]).addClass(classeDeAnimacaoDoMenu);
            } else {
                $($targetMenu[o].children[0]).removeClass(classeDeAnimacaoDoMenu);
            }
        }
    }

    function percorrendoEfeitos(target, classe) {
        let windowTop = $(document).scrollTop();

        target.each(function() {
            let itemTop = $(this).offset().top;

            if (windowTop > itemTop - offset) {
                $(this).addClass(classe);
            }

            let idDivAtual = $(this)[0].id;
            if (windowTop + (windowTop * 5 / 100) > itemTop) {
                if (idDivAtual == 'divSobre' || idDivAtual == 'divObjetivo') {
                    $('nav')[0].style.background = '#d7bbbb';

                    if (!$(this).hasClass('produtosIdentacaoEntreSi')) {
                        let icone = document.getElementById('loginico');
                        icone.src = 'imagens/person.png';
                    }
                } else {
                    if ($(this).hasClass('produtosIdentacaoEntreSi')) {
                        let icone = document.getElementById('loginico');
                        icone.src = 'imagens/personwhite.png';
                    }
                    $('nav')[0].style.background = 'transparent';
                }
            }
        });
    }

    animacaoDoScroll();

    $(document).scroll(function() {
        animacaoDoScroll()
    });

}());


$('ul a').click(function(event) {
    event.preventDefault();
    let id = $(this).attr('href'),
        targetOffset = $(id).offset().top;

    $('html, body').animate({
        scrollTop: targetOffset
    }, 500);
});