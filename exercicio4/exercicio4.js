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
  }
};

const exibirResultado = (titulo, conteudo) => {
  const divResultado = document.getElementById('resultadoRelatorios');
  divResultado.innerHTML = `<h4>${titulo}</h4>${conteudo}`;
};

const listarAprovados = () => {
  const aprovados = alunos.filter(aluno => aluno.isAprovado());

  if (aprovados.length === 0) {
    exibirResultado('Alunos Aprovados', '<p>Nenhum aluno aprovado.</p>');
    return;
  }

  let html = '<ul>';
  aprovados.forEach(aluno => {
    html += `<li>${aluno.nome} - Nota: ${aluno.notaFinal}</li>`;
  });
  html += '</ul>';

  exibirResultado(`Alunos Aprovados (${aprovados.length} aluno(s))`, html);
};

const calcularMediaNotas = () => {
  if (alunos.length === 0) {
    exibirResultado('Média das Notas', '<p>Nenhum aluno cadastrado.</p>');
    return;
  }

  const somaNotas = alunos.reduce((soma, aluno) => soma + aluno.notaFinal, 0);
  const media = somaNotas / alunos.length;

  exibirResultado(
    'Média das Notas',
    `<p>A média das notas finais é: <strong>${media.toFixed(2)}</strong></p>`
  );
};

const calcularMediaIdades = () => {
  if (alunos.length === 0) {
    exibirResultado('Média das Idades', '<p>Nenhum aluno cadastrado.</p>');
    return;
  }

  const somaIdades = alunos.reduce((soma, aluno) => soma + aluno.idade, 0);
  const media = somaIdades / alunos.length;

  exibirResultado(
    'Média das Idades',
    `<p>A média das idades é: <strong>${media.toFixed(2)}</strong> anos</p>`
  );
};

const listarOrdemAlfabetica = () => {
  if (alunos.length === 0) {
    exibirResultado('Ordem Alfabética', '<p>Nenhum aluno cadastrado.</p>');
    return;
  }

  const nomesOrdenados = alunos
    .map(aluno => aluno.nome)
    .sort((a, b) => a.localeCompare(b));

  let html = '<ol>';
  nomesOrdenados.forEach(nome => {
    html += `<li>${nome}</li>`;
  });
  html += '</ol>';

  exibirResultado('Alunos em Ordem Alfabética', html);
};

const alunosPorCurso = () => {
  if (alunos.length === 0) {
    exibirResultado('Alunos por Curso', '<p>Nenhum aluno cadastrado.</p>');
    return;
  }

  const contagemPorCurso = alunos.reduce((contador, aluno) => {
    contador[aluno.curso] = (contador[aluno.curso] || 0) + 1;
    return contador;
  }, {});

  let html = '<ul>';
  Object.keys(contagemPorCurso)
    .sort()
    .forEach(curso => {
      html += `<li><strong>${curso}:</strong> ${contagemPorCurso[curso]} aluno(s)</li>`;
    });
  html += '</ul>';

  exibirResultado('Quantidade de Alunos por Curso', html);
};

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('btnCadastrar')
    .addEventListener('click', () => cadastrarAluno());
  document
    .getElementById('btnCancelar')
    .addEventListener('click', () => cancelarEdicao());

  document
    .getElementById('btnAprovados')
    .addEventListener('click', () => listarAprovados());
  document
    .getElementById('btnMediaNotas')
    .addEventListener('click', () => calcularMediaNotas());
  document
    .getElementById('btnMediaIdades')
    .addEventListener('click', () => calcularMediaIdades());
  document
    .getElementById('btnOrdemAlfabetica')
    .addEventListener('click', () => listarOrdemAlfabetica());
  document
    .getElementById('btnAlunosPorCurso')
    .addEventListener('click', () => alunosPorCurso());

  console.log('Sistema iniciado com sucesso!');
});
