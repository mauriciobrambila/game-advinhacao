const creatures = [{
  'name': 'octopus',
  'img': 'img/octopus.png',
  'fact': "Um polvo tem 8 membros longos chamados tentáculos."
},
{
  'name': 'crab',
  'img': 'img/crab.png',
  'fact': "Os caranguejos podem conversar entre si agitando as pinças."
},
{
  'name': 'fish',
  'img': 'img/fish.png',
  'fact': "Um grupo de peixes é chamado de cardume."
},
{
  'name': 'jellyfish',
  'img': 'img/jellyfish.png',
  'fact': "As medusas existiam antes dos dinossauros."
},
{
  'name': 'turtle',
  'img': 'img/turtle.png',
  'fact': "Uma tartaruga pode viver mais de 80 anos"
},
{
  'name': 'seahorse',
  'img': 'img/seahorse.png',
  'fact': "Os cavalos-marinhos gostam de nadar em pares e unir as caudas."
},
{
  'name': 'starfish',
  'img': 'img/starfish.png',
  'fact': "Estrelas do mar não têm cérebro nem sangue."
},
{
  'name': 'whale',
  'img': 'img/whale.png',
  'fact': "Um filhote de baleia é chamado de bezerro."
}
];
//gerador de fatos aleatórios
const randomFact = creatures[Math.floor(Math.random() * 8)].fact; // retorna índice em número aleatório
document.getElementById("randomFact").innerHTML = randomFact;

// duplica o array e o salva como gameGrid
const gameGrid = creatures
  .concat(creatures)
  .sort (() => 0.5 - Math.random()); // classifica aleatoriamente o array gameGrid
// configurar iniciais
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let matchedpairs = 0;

const game = document.getElementById('game'); // obtenha div com id do jogo
const grid = document.createElement('section'); // cseção reate com classe de grade
grid.setAttribute('class', 'grid');
game.appendChild(grid); // adicionar seção de grade ao div do jogo

gameGrid.forEach(item => {
  const { name, img } = item;
  // cria div de cartão para cada item no gameGrid
  const card = document.createElement('div'); // cria div
  card.classList.add('card'); // adiciona classe de cartão ao div
  card.dataset.name = name; // define o atributo data-name como o nome da criatura
  // configura a frente do cartão
  const front = document.createElement('div'); // criar div
  front.classList.add('front'); // define a classe de div para frente
  // configura o verso do cartão
  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`; // sets image to image in array
  // adiciona novo div à grade e frente e verso de cada cartão
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

// se uma correspondência for encontrada, faça isso ...
const match = () => {
  const selected =
  document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match'); // adicionar classe de correspondência ao cartão
    matchedpairs += 1; // se as cartas corresponderem, adicione ao contador
    if (matchedpairs == 16) { // ou seja. jogo completo
      Swal.fire({
        title: 'WOOHOO!!!',
        text: 'Yvocê conseguiu! Você pegou todos eles!',
        width: 600,
        padding: '3em',
        background: '#fff',
        backdrop: 'rgba(0,0,123,0.4)',
        timer: 5000
        })
        setTimeout(function() {
          location.reload();
        }, 3000); // recarga automática de página
    }

  });
};

// se não for compatível, vire os berços de volta
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected =
  document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected'); // remove a classe selecionada do cartão
  });
};

// listens for click in grid
grid.addEventListener('click', event => {

  const clicked = event.target; // event.target é item clicado

  if (
    clicked.nodeName === 'SECTION' || // não consigo selecionar a própria seção da grade
    clicked === previousTarget || // não é possível selecionar o cartão que já está selecionado
    clicked.parentNode.classList.contains('selected') || // não é possível virar cartas já combinadas
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }
  if ( count < 2 ) { // só permite que dois cartões sejam selecionados
    count ++; // incrementar adicione 1 para contar
    if (count === 1) { // definir como primeira seleção
      firstGuess =
      clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected'); // adiciona a classe selecionada ao item
    } else { // definir como segunda coleção
      secondGuess =
      clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected'); // agrupa appendChilds como seleção única
    }

    if (firstGuess && secondGuess) { // se duas cartas forem selecionadas
      if (firstGuess === secondGuess) { // se eles combinarem
        setTimeout(match, delay); // execute a partida se eles corresponderem
      }
      setTimeout(resetGuesses, delay); // execute resetGuesses se não
    }
    previousTarget = clicked; // não consigo clicar duas vezes no mesmo cartão
  }



});
