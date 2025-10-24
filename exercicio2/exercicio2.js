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

function cadastrarAluno() {
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
  } else {
    alunos[editandoIndex] = aluno;
    editandoIndex = -1;
  }

  limparFormulario();
  renderizarTabela();
  exibirDetalhes();
}

function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('curso').value = '';
  document.getElementById('notaFinal').value = '';
}

function cancelarEdicao() {
  editandoIndex = -1;
  limparFormulario();
}

function renderizarTabela() {
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
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;

    corpoTabela.appendChild(linha);
  });
}

function editarAluno(index) {
  const aluno = alunos[index];

  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('notaFinal').value = aluno.notaFinal;

  editandoIndex = index;
}

function excluirAluno(index) {
  if (confirm('Tem certeza que deseja excluir este aluno?')) {
    alunos.splice(index, 1);
    renderizarTabela();
    exibirDetalhes();
  }
}

function exibirDetalhes() {
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
}
