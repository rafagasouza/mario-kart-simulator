const personagens = [
  {
    nome: "Peach",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
  },
  {
    nome: "Yoshi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
     pontos: 0
  }
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

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
  for(let round = 1 ; round <= 5; round++){
    console.log(`Round: ${round}`)

    let bloco = await getRandomBlock()
    console.log(`O bloco sorteado foi ${bloco}`)

    //vamos sortear os dados

    let rollDice1Result = await rollDice()
    let rollDice2Result = await rollDice()

    //teste de habilidades
    let totalTesteSkill1 = 0
    let totalTesteSkill2 = 0

    if(bloco === 'RETA'){
      totalTesteSkill1 = rollDice1Result + character1.velocidade
      totalTesteSkill2 = rollDice2Result + character2.velocidade

      await logRollResult(character1.nome, 'Velocidade', rollDice1Result, character1.velocidade)
      await logRollResult(character2.nome, 'Velocidade', rollDice2Result, character2.velocidade)
      
      
    }

    if(bloco === 'CURVA'){
      totalTesteSkill1 = rollDice1Result + character1.manobrabilidade
      totalTesteSkill2 = rollDice2Result + character2.manobrabilidade

      await logRollResult(character1.nome, 'Manobrabilidade', rollDice1Result, character1.manobrabilidade)
      await logRollResult(character2.nome, 'Manobrabilidade', rollDice2Result, character2.manobrabilidade)
    }

    if(bloco === 'CONFRONTO'){
      poderTesteSkill1 = rollDice1Result + character1.poder
      poderTesteSkill2 = rollDice2Result + character2.poder

      console.log(`O ${character1.nome} confrontou o ${character2.nome}`)

      await logRollResult(character1.nome, 'poder', rollDice1Result, character1.poder)
      await logRollResult(character2.nome, 'poder', rollDice2Result, character2.poder)

      //verificando quem ganha um confronto baseasdo no poder

      if(poderTesteSkill1 > poderTesteSkill2 && character2.pontos > 0){
        console.log(`${character1.nome} venceu o confronto. ${character2.nome} perdeu 1 ponto.`)
        character2.pontos--
      }

      if(poderTesteSkill2 > poderTesteSkill1 && character1.pontos > 0){
        console.log(`${character2.nome} venceu o confronto. ${character1.nome} perdeu 1 ponto.`)
        character1.pontos--
      }
    
      
      console.log(poderTesteSkill1 === poderTesteSkill2 ? 'Confronto empatado! Sem pontos perdidos!' : '')
    
    }

   if(totalTesteSkill1 > totalTesteSkill2){
    console.log(`${character1.nome} marcou um ponto`)
    character1.pontos++
   }else if(totalTesteSkill2 > totalTesteSkill1){
    console.log(`${character2.nome} marcou um ponto`)
    
    character2.pontos++
   }
   console.log(`-----------------------------------`)

  }

}

async function declareWinner(character1, character2){
  console.log('Resultado final: ')
  console.log(`${character1.nome}: ${character1.pontos}`)
  console.log(`${character2.nome}: ${character2.pontos}`)

  if(character1.pontos > character2.pontos)
    console.log(`${character1.nome} venceu a corrida! Parabéns`)
  else if(character2.pontos > character1.pontos)
    console.log(`${character2.nome} venceu a corrida!`)
  else
    console.log('Empatou!!')
  


}

(async function main() {
  player1.pontos = 0
  player2.pontos = 0
  console.log(`Corrida entre ${player1.nome} e ${player2.nome} começou \n`); //para ficar mais dinamico os personagens escolhidos

  //queremos que a função racing rode primeiro antes de executar o restante
  await playRaceEngine(player1, player2)
  await declareWinner(player1, player2)
})();
