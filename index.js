const readLineSync = require('readline-sync');
let deck = []
let suits = ['Hearts❤️', 'Clubs♣️', 'Diamonds💎', 'Spades♠️']
let cardNumbers = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen','King']
let shuffledDeck = []
let userHand = []
let dealerHand = []
let userScore = []
let userCurrentScore, userNewScore
let dealerNewScore
let dealerCurrentScore
let addScore = []
const [USER, DEALER] = ['user', 'dealer']

// Creates deck of cards using the suits and cardNumbers arrays.
// We are calling for each on each item in the suits array then using the for loop to push the values of each card into a new array called DECK. This will run soon as the program starts.

suits.forEach(function(suitName){
  for (let i = 0; i < cardNumbers.length; i++) {
    deck.push({number: cardNumbers[i], suit: suitName })
  }
})
console.log(deck);

// Here we are taking the deck we just created and passing it as an argument into the newDeck function.
// We pass in the deck of cards unshuffled and we call the for loop to

function newDeck(deckOfCards){
  for (let i = 0; i < deckOfCards.length; i++) {
    rand = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
    shuffledDeck.push(rand)
  }
}

// Calls newDeck to shuffle cards
newDeck(deck)

// ****** Want to see the shuffled deck? Use the console.log below *****
// console.log(shuffledDeck)
function dealCard(dealerOrUser){
  if (dealerOrUser == USER) {
    userHand.push(shuffledDeck.pop())
  }else if (dealerOrUser == DEALER) {
    dealerHand.push(shuffledDeck.pop())
  }
}

// Here we are starting the game for the user.
//
let userName = readLineSync.question("What's your name?\n").trim()
console.log(`Lets play BlackJack ${userName}`);
console.log(`Here are you cards ${userName}`);
dealCard(USER)
dealCard(USER)
dealCard(DEALER)

console.log(`Your cards are: \n ${userHand[0].number} of ${userHand[0].suit}\n ${userHand[1].number} of ${userHand[1].suit} `);

console.log(`\nThe dealer has: \n ${dealerHand[0].number} of ${dealerHand[0].suit}\n`);

wannaHit()

function wannaHit() {
  getUserScore()
  console.log(userNewScore);
  let hitMeBaby = readLineSync.question( 'Would you like a hit? y or n\n ').trim();
  newCard(hitMeBaby)
}

function newCard(hitMeBaby) {
  if (hitMeBaby.toLowerCase() === "y") {
    dealCard(USER)
    console.log('You now have: \n',userHand);
    didUserWin()
  } else if (hitMeBaby.toLowerCase() === "n"){
      dealCard(DEALER)
      stay()
  }
}
function stay() {
  getDealerScore()
  if(dealerNewScore < userNewScore) {
    dealCard(DEALER)
    console.log('The Dealer has:\n',dealerHand);
    stay()
  }else if (dealerNewScore > userNewScore && dealerNewScore < 21) {
    console.log('House Wins!');
  } else if (dealerNewScore == 21 && userNewScore == 21) {
    console.log('Push!');
  } else if (dealerNewScore > 21) {
    console.log("You win!");
  }else if (dealerNewScore == 21) {
    console.log('House Wins!!');
  }else if (dealerNewScore === userNewScore) {
    console.log('Push!');
  }
}
function isFaceCard(card){
  return [
    card.number === 'Queen',
    card.number === 'King',
    card.number === 'Jack'
  ].some(i => i)
}
function isAce(card){
  return card.number === 'Ace'
}
function getUserScore(){
     addScore = userHand.map( userCard => {
        if (isFaceCard(userCard)) {
          userCard.number = 10
          return userCard.number
        }else if (isAce(userCard)) {
          userCard.number = 1
          return userCard.number
        }else{
          return userCard.number
        }
        })
        addScore.reduce((a, b) =>{
          userNewScore =  a + b
          return userNewScore
        })
      }


function getDealerScore(){
  let newScore = []
     newScore = dealerHand.map( dealerCard => {
        if (isFaceCard(dealerCard)) {
          dealerCard.number = 10
          return dealerCard.number
        }else if (isAce(dealerCard)) {
          dealerCard.number = 1
          return dealerCard.number
        }else{
          return dealerCard.number
        }
        })
        newScore.reduce((a, b) =>{
          dealerNewScore =  a + b
          return dealerNewScore
        })
        console.log('Dealer Current Score: \n',dealerNewScore)
      }

function didUserWin() {
    getUserScore()
    if (userNewScore > 21) {
      console.log('You Lose!');
    } else if (userNewScore < 21){
      wannaHit()
    }
  }
