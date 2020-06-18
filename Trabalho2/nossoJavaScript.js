var editando = false;
const baseRequestURL = 'http://rest-api-employees.jmborges.site/api/v1/';

function criarEmpregado(nome, salario, idade, avatar) {
    let requestURL = `${baseRequestURL}create`;
    let request = new XMLHttpRequest();
    request.open('POST', requestURL);
    request.responseType = 'json';
    let params = `{ "name": "${nome}", "salary": "${salario}", "age": "${idade}", "profile_image": "${avatar}" }`;
    request.setRequestHeader('Content-type', 'application/json');

    request.send(params);

    request.onload = function() {
        let retorno = request.response;
        if (retorno.status = "success") {
            alert("Empregado cadastrado com sucesso!");
            buscarEmpregados();
            limparValores();
        } else {
            alert("Ocorreu um erro ao tentar cadastrar o empregado! Favor tentar novamente.");
        }
    }
}

function editaEmpregado(nome, salario, idade, avatar, id) {
    let requestURL = `${baseRequestURL}update/${id}`;
    let request = new XMLHttpRequest();
    request.open('PUT', requestURL);
    request.responseType = 'json';
    let params = `{ "name": "${nome}", "salary": "${salario}", "age": "${idade}", "profile_image": "${avatar}" }`;
    request.setRequestHeader('Content-type', 'application/json');

    request.send(params);

    request.onload = function() {
        let retorno = request.response;
        if (retorno.status = "success") {
            alert("Empregado editado com sucesso!");
            buscarEmpregados();
        } else {
            alert("Ocorreu um erro ao tentar editar o empregado! Favor tentar novamente.");
        }
    }
}

function excluirEmpregado(id) {
    let resposta = confirm(`Deseja excluir o empregado #${id}?`);

    if (!resposta) {
        return;
    }

    let requestURL = `${baseRequestURL}delete/${id}`;
    let request = new XMLHttpRequest();
    request.open('DELETE', requestURL);
    request.responseType = 'json';

    request.onload = () => {
        let retorno = request.response;
        if (retorno.status = "success") {
            alert("Empregado excluído com sucesso!");
            buscarEmpregados();
        } else {
            alert("Ocorreu um erro ao tentar excluir o empregado! Favor tentar novamente.");
        }
    }

    request.send();
}

function buscarEmpregados() {
    let requestURL = `${baseRequestURL}employees`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.onload = function() {
        let retorno = request.response;
        mostarEmpregados(retorno.data);
    }
    request.responseType = 'json';
    request.send();
}

function buscarEmpregado(id) {
    let requestURL = `${baseRequestURL}employee/${id}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.onload = function() {
        editaEmpregadoDeAntemao(id, request.response.data);
    }
    request.responseType = 'json';
    request.send();
}

function mostarEmpregados(jsonEmpregados) {
    let tabelaDeEmpregados = document.getElementById('tabelaDeValores');
    let [, , ...resto] = tabelaDeEmpregados.children;

    resto.forEach(tdAtual => {
        if (tdAtual) {
            tabelaDeEmpregados.removeChild(tdAtual);
        }
    });

    let propriedadesDoObjeto = ['id', 'employee_name', 'employee_salary', 'employee_age', 'profile_image'];
    jsonEmpregados.forEach(objeto => {
        if (objeto) {
            let linha = document.createElement('tr');

            propriedadesDoObjeto.forEach(propriedade => {
                linha.appendChild(criarElementoTD(objeto[propriedade]))
            });

            let acoesEmpregador = document.createElement('td');
            let div = document.createElement('div');
            let separador = document.createElement('label');
            separador.innerText = '|';

            div.appendChild(criarElementoButton('editar', (id) => { buscarEmpregado(id) }, objeto.id));
            div.appendChild(separador);
            div.appendChild(criarElementoButton('excluir', (id) => { excluirEmpregado(id) }, objeto.id));


            acoesEmpregador.appendChild(div);
            linha.appendChild(acoesEmpregador);

            tabelaDeEmpregados.appendChild(linha);
        }
    });
}

function criarElementoTD(valorElemento) {
    let elemento = document.createElement('td');
    elemento.innerText = valorElemento;
    return elemento;
}

function criarElementoButton(valorLegenda, funcaoBotao, id) {
    let botao = document.createElement('input');
    botao.type = 'button';
    botao.value = valorLegenda;
    botao.onclick = () => { funcaoBotao(id) };
    botao.classList.add('botoesAcoes');

    return botao;
}

function editaEmpregadoDeAntemao(idEmpregado, empregado) {

    let novaLegenda = document.getElementById('legendaEmpregado');
    novaLegenda.innerText = `Editando dados do Empregado #${idEmpregado}`;

    document.getElementById('nomeEmpregadoFormulario').value = empregado.employee_name;
    document.getElementById('salarioEmpregadoFormulario').value = empregado.employee_salary;
    document.getElementById('idadeEmpregadoFormulario').value = empregado.employee_age;
    document.getElementById('avatarEmpregadoFormulario').value = empregado.profile_image;

    document.getElementById('salvarAlteracao').onclick = () => { editarEmpregadoExistente(idEmpregado) };
    editando = true;

    window.scroll(0, 0);

    buscarEmpregados();
}

function criarNovoEmpregado() {
    let nomeEmpregado = document.getElementById('nomeEmpregadoFormulario');
    let salarioEmpregado = document.getElementById('salarioEmpregadoFormulario');
    let idadeEmpregado = document.getElementById('idadeEmpregadoFormulario');
    let avatarEmpregado = document.getElementById('avatarEmpregadoFormulario');

    criarEmpregado(nomeEmpregado.value, salarioEmpregado.value, idadeEmpregado.value, avatarEmpregado.value);

}

function editarEmpregadoExistente(id) {
    let nomeEmpregado = document.getElementById('nomeEmpregadoFormulario');
    let salarioEmpregado = document.getElementById('salarioEmpregadoFormulario');
    let idadeEmpregado = document.getElementById('idadeEmpregadoFormulario');
    let avatarEmpregado = document.getElementById('avatarEmpregadoFormulario');

    editaEmpregado(nomeEmpregado.value, salarioEmpregado.value, idadeEmpregado.value, avatarEmpregado.value, id);
}

function limparValores() {
    let nomeEmpregado = document.getElementById('nomeEmpregadoFormulario');
    let salarioEmpregado = document.getElementById('salarioEmpregadoFormulario');
    let idadeEmpregado = document.getElementById('idadeEmpregadoFormulario');
    let avatarEmpregado = document.getElementById('avatarEmpregadoFormulario');

    nomeEmpregado.value = '';
    salarioEmpregado.value = '';
    idadeEmpregado.value = '';
    avatarEmpregado.value = '';

    if (editando) {
        editando = false;
        document.getElementById('legendaEmpregado').innerText = 'Adicionando novo Empregado';
    }
}

buscarEmpregados();