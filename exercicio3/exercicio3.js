class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    const situacao = this.isAprovado() ? 'Aprovado' : 'Reprovado';
    return `Aluno: ${this.nome}, Idade: ${this.idade} anos, Curso: ${this.curso}, Nota Final: ${this.notaFinal}, Situação: ${situacao}`;
  }
}

const alunos = [];
let editandoIndex = -1;

const limparFormulario = () => {
  document.getElementById('nome').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('curso').value = '';
  document.getElementById('notaFinal').value = '';
};

const cancelarEdicao = () => {
  editandoIndex = -1;
  limparFormulario();
  console.log('Edição cancelada');
};

const cadastrarAluno = () => {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;
  const notaFinal = document.getElementById('notaFinal').value;

  if (!nome || !idade || !curso || !notaFinal) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const aluno = new Aluno(nome, parseInt(idade), curso, parseFloat(notaFinal));

  if (editandoIndex === -1) {
    alunos.push(aluno);
    alert(`Aluno ${nome} cadastrado com sucesso!`);
    console.log('Novo aluno cadastrado:', aluno.toString());
  } else {
    alunos[editandoIndex] = aluno;
    alert(`Aluno ${nome} atualizado com sucesso!`);
    console.log('Aluno atualizado:', aluno.toString());
    editandoIndex = -1;
  }

  limparFormulario();
  renderizarTabela();
  exibirDetalhes();
};

const renderizarTabela = () => {
  const corpoTabela = document.getElementById('corpoTabela');
  corpoTabela.innerHTML = '';

  alunos.forEach((aluno, index) => {
    const linha = document.createElement('tr');
    const situacao = aluno.isAprovado() ? 'Aprovado' : 'Reprovado';

    linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>${situacao}</td>
            <td>
                <button class="btnEditar" data-index="${index}">Editar</button>
                <button class="btnExcluir" data-index="${index}">Excluir</button>
            </td>
        `;

    corpoTabela.appendChild(linha);
  });

  adicionarEventListenersBotoes();
};

const adicionarEventListenersBotoes = () => {
  document.querySelectorAll('.btnEditar').forEach(botao => {
    botao.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      editarAluno(index);
    });
  });

  document.querySelectorAll('.btnExcluir').forEach(botao => {
    botao.addEventListener('click', e => {
      const index = parseInt(e.target.getAttribute('data-index'));
      excluirAluno(index);
    });
  });
};

const editarAluno = index => {
  const aluno = alunos[index];

  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('notaFinal').value = aluno.notaFinal;

  editandoIndex = index;
  console.log('Editando aluno:', aluno.toString());
};

const excluirAluno = index => {
  const aluno = alunos[index];

  if (confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
    alunos.splice(index, 1);
    alert(`Aluno ${aluno.nome} excluído com sucesso!`);
    console.log('Aluno excluído:', aluno.toString());
    renderizarTabela();
    exibirDetalhes();
  }
};

const exibirDetalhes = () => {
  const detalhesDiv = document.getElementById('detalhesAlunos');
  detalhesDiv.innerHTML = '';

  if (alunos.length === 0) {
    detalhesDiv.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
    return;
  }

  alunos.forEach(aluno => {
    const p = document.createElement('p');
    p.textContent = aluno.toString();
    detalhesDiv.appendChild(p);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('btnCadastrar')
    .addEventListener('click', function () {
      cadastrarAluno();
    });

  document.getElementById('btnCancelar').addEventListener('click', () => {
    cancelarEdicao();
  });

  console.log('Sistema iniciado com sucesso!');
});
