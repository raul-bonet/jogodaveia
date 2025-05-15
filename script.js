// script.js
const cells = document.querySelectorAll('[data-cell]');  //Seleciona todas as células do tabuleiro.
const statusDisplay = document.getElementById('status');  //Seleciona a div onde mostra mensagens de vitória ou empate.
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';  //Guarda o jogador atual, e começa com o jogador X
let gameActive = true;  //Varíavel que indica se o jogo ainda está ativo, e quando não está, impede outras jogadas.
let gameState = ['', '', '', '', '', '', '', '', ''];  //Vetor do tabuleiro

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],  //Vetor das jogadas possíveis para vitória.
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {  //Verifica se a célula já esta ocupada
  if (gameState[clickedCellIndex] !== '' || !gameActive) {  //Atualiza o estado do jogo
    return;
  }
  gameState[clickedCellIndex] = currentPlayer;  //Exibe o símbolo X ou O na célula clicada
  clickedCell.textContent = currentPlayer;  //Chama a funçao que verifica se o jogo acabou
  checkResult();
}

function checkResult() {  //Função que é um loop que verifica todas as combinações vencedoras. Se alguém ganhou, mostra a mensagem, desativa o jogo e exibe o botão. Se não ganhou e não há mais espaços vazios, mostra empate, desativa o jogo e exibe botão.
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    restartButton.style.display = 'block';
    return;
  }
  if (!gameState.includes('')) {
    statusDisplay.textContent = 'Empate!';
    gameActive = false;
    restartButton.style.display = 'block';
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleRestartGame() {  //Função que reinicia o jogo. Ela apaga as "mensagens" visíveis e esconde o botão de reiniciar o jogo.
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = '';
  restartButton.style.display = 'none';
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach((cell, index) => {  //Cria as ações do clique.
  cell.addEventListener('click', () => handleCellClick(cell, index));
});
restartButton.addEventListener('click', handleRestartGame);
