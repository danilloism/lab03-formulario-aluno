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

  const aluno = {
    nome: nome,
    idade: parseInt(idade),
    curso: curso,
    notaFinal: parseFloat(notaFinal),
  };

  if (editandoIndex === -1) {
    alunos.push(aluno);
  } else {
    alunos[editandoIndex] = aluno;
    editandoIndex = -1;
  }

  limparFormulario();
  renderizarTabela();
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

    linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
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
  }
}
