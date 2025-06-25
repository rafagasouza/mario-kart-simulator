const personagens = [
  {
    nome: "Peach",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
  },
  {
    nome: "Yoshi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
  },
  {
    nome: "Bowser",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
  },
  {
    nome: "Mario",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
  },
  {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
  },
  {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
  },
];

function randomIndex(dataLenght) {
  return Math.floor(Math.random() * dataLenght); //estou pegando um numero aleatorio no caso de 0 a 5
}

let index1 = randomIndex(personagens.length);
let index2; //o segundo jogador esta sem valor pois vamos gerar e verifcar se cai um numero igual, nao pode, claro cair o mesmo index duas vezes.

//vamos usar um laço para gerar um index enquanto o index que cair for igual ao primeiro ja gerado
do {
  index2 = randomIndex(personagens.length);
} while (index2 === index1);

//agora vamos definir os jogadores
const player1 = personagens[index1];
const player2 = personagens[index2];

async function rollDice() {
  //a função ela está pegando um numero entre 1 e 6
  //usamos a math pra ajudar nesse processo
  return Math.floor(Math.random() * 6 + 1);
}

async function getRandomBlock(){
  //vamos aqui gerar um numero aleatorio usando o Math.random
  let random = Math.random()
  let result

  //usando o switch para definir os blocos
  switch(true){
    case random < 0.33:
      result = 'RETA'
      break
    case random < 0.66:
      result = 'CURVA'
      break
    default:
      result = 'CONFRONTO'
      break
  }
  return result
}

async function playRaceEngine(character1, character2) {
  for(let round = 1 ; round <= 5; round++){
    console.log(`Round: ${round}`)

    let bloco = await getRandomBlock()
    console.log(`O bloco sorteado foi ${bloco}`)
  }
  
}

(async function main() {
  console.log(`Corrida entre ${player1.nome} e ${player2.nome} começou \n`); //para ficar mais dinamico os personagens escolhidos

  //queremos que a função racing rode primeiro antes de executar o restante
  await playRaceEngine(player1, player2)
})();
