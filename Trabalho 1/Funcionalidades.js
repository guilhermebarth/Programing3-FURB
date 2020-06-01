class TodasAsFuncionalidades {
    constructor() {
        this.formDeLogin = document.getElementById('formLogin');
        this.motivoFeedback = document.getElementById('motivoFeedback');

        this.legendaLogin = document.getElementById('legendaLogin');
        this.divConfirmarSenha = document.getElementById('divConfirmarSenha');
        this.btnCadastrar = document.getElementById('btnCadastrar');
        this.campoEmail = document.getElementById('campoEmail');
        this.campoSenha = document.getElementById('campoSenha');
        this.campoConfirmarSenha = document.getElementById('campoConfirmarSenha');

        this.camposDentroDoLogin = document.getElementById('identacaoLogin');
        this.divConectado = document.getElementById('divConectado');

        this.conectado = false;
    }


    mostraFormLogin() {
        let ehFlex = this.formDeLogin.style['display'] == 'flex';
        this.formDeLogin.style['display'] = (ehFlex ? 'none' : 'flex');
    }

    funcaoCadastrar() {
        this.divConfirmarSenha.style.display = 'inline-flex';

        this.legendaLogin.textContent = 'Cadastrar-se';
        this.btnCadastrar.onclick = () => { this.funcaoCadastrarDefinitivo() };
    }

    funcaoCadastrarDefinitivo() {
        if (!this.campoEmail.value) {
            alert('Você deve preencher o campo de Email.');
            return;
        }

        if (!this.campoSenha.value) {
            alert('Você deve preencher o campo senha.');
            return;
        }
        if (!this.campoConfirmarSenha.value) {
            alert('Você deve preencher o campo de confirmar senha.');
            return;
        }

        if (this.campoSenha.value != this.campoConfirmarSenha.value) {
            alert('As senhas devem ser iguais');
            return;
        }

        alert('Usuário cadastrado com sucesso.');
        this.campoEmail.value = '';
        this.campoSenha.value = '';
        this.campoConfirmarSenha.value = '';
        this.divConfirmarSenha.style.display = 'none';
        this.legendaLogin.textContent = 'Entrar';
        this.btnCadastrar.onclick = () => { this.funcaoCadastrar() };
    }

    funcaoEntrar() {
        if (!this.campoEmail.value) {
            alert('Você deve preencher o campo de Email.');
            return;
        }

        if (!this.campoSenha.value) {
            alert('Você deve preencher o campo senha.');
            return;
        }

        if (this.campoEmail.value == 'admin@gmail.com' && this.campoSenha.value == 'admin') {
            alert('Usuário autenticado com sucesso!');
        } else {
            alert('Usuário ou senha incorretos.');
            return;
        }

        for (let i = 0; i < this.camposDentroDoLogin.childElementCount; i++) {
            this.camposDentroDoLogin.children[i].style.display = 'none';
        }

        this.divConectado.style.display = 'inline-flex';
        this.conectado = true;
    }
}