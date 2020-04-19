
afterLoadManeira = () => {
    let divManeiraUL = document.getElementById('divListaNaoOrdenada');

    let listaDeValores = [
        'No entanto, não podemos esquecer que a consolidação das estruturas faz parte de um processo de gerenciamento dos índices pretendidos.',
        'A nível organizacional, a expansão dos mercados mundiais representa uma abertura para a melhoria do sistema de participação geral.',
        'A prática cotidiana prova que a complexidade dos estudos efetuados é uma das consequências das posturas dos órgãos dirigentes com relação às suas atribuições.',
        'O incentivo ao avanço tecnológico, assim como a contínua expansão de nossa atividade é uma das consequências do fluxo de informações.',
        'Circo de soled.'
    ]

    listaDeValores.forEach(item => {
        if (item) {
            let anotherElement = document.createElement('ul');
            anotherElement.innerText = item;
            anotherElement.classList.add('ulDinamica');
            divManeiraUL.appendChild(anotherElement);
        }
    });

    let divManeiraFilme = document.getElementById('divObjetosDeFilme');

    let listaDeObjetos = [
        { titulo: 'Os incríveis 2', ano: 2018, genero: 'Animação/Comédia' },
        { titulo: 'Mulher-maravilha', ano: 2017, genero: 'Ação' },
        { titulo: 'Jogador Nº1', ano: 2018, genero: 'Ação' },
    ];

    listaDeObjetos.forEach(items => {
        if (items) {
            let filme = new Filme(items);
            divManeiraFilme.append(filme.createMyComponent());
        }
    });
}

maracutaisDoBotao = () => {
    let numero1 = document.getElementById('hdnNumero1').value || 0;
    let numero2 = document.getElementById('hdnNumero2').value || 0;
    let numero3 = document.getElementById('hdnNumero3').value || 0;

    // O '+' é equivalente ao parseInt,
    // Deixei assim para ficar mais curta a escrita.
    let resultado = +numero1 + +numero2 + +numero3;

    alert('O resultado da soma é ' + (resultado % 2 == 0 ? 'Par' : 'Ímpar') + ', resultado: ' + resultado);
}

function resultadoFatorial(num) {
    if (num <= 1) {
        return 1;
    }

    return num * resultadoFatorial(num - 1);
}

controleFatorial = (num) => {
    let resultadoFatorialFinal = resultadoFatorial(+num) || 0;
    let campoResultadoFatorial = document.getElementById('resultadoFatorial');
    let divResultadoFatorial = document.getElementById('divDoResultadoFatorial');


    campoResultadoFatorial.value = resultadoFatorialFinal;
    divResultadoFatorial.classList.add('campoFatorialVisible');
}

class Filme {
    constructor(valores) {
        this.titulo = document.createElement('p');
        this.ano = document.createElement('p');
        this.genero = document.createElement('p');

        this.titulo.innerText = valores?.titulo || 'Título não informado';
        this.ano.innerText = valores?.ano || 'Ano não informado';
        this.genero.innerText = valores?.genero || 'Genêro não informado';
    }

    createMyComponent() {
        let divManeira = document.createElement('div');

        divManeira.classList.add('divManeiraDeControleDeFilme');
        divManeira.appendChild(this.titulo);
        divManeira.appendChild(this.genero);
        divManeira.appendChild(this.ano);


        return divManeira;
    }
}