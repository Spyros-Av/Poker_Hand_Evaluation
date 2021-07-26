const hand = [
  {
    rank: '9',
    suit: 'diamonds',
  },
  {
    rank: '9',
    suit: 'diamonds',
  },
  {
    rank: '3',
    suit: 'diamonds',
  },
  {
    rank: '9',
    suit: 'diamonds',
  },
  {
    rank: '9',
    suit: 'diamonds',
  },

];



const handType = {
  STRAIGHT_FLUSH: 10,
  FOUR_OF_A_KIND: 9,
  FOUL_HOUSE: 8,
  FLUSH: 7,
  STRAIGHT: 6,
  THREE_OF_A_KIND: 5,
  TWO_PAIRS: 4,
  ONE_PAIR: 3,
  HIGH_CARD: 2,
};

const groupedHand = (hand) => hand.reduce(
  (groups, group) => {
    if (!groups[group]) {
      groups[group] = 0;
    }
    groups[group]++;
    //console.log(groups);
    return groups;
  },
  {},
);

const getValues = (groupedHand, maped) => {
  let valueOfHand = (groupedHand(maped));
  return Object.values(valueOfHand);
};

const suit = hand.map(item => item.suit);
// console.log('----Suit----')
// console.log(suit);
const rank = hand.map(item => item.rank);
for (let i = 0; i < rank.length; i++) {
  (rank[i] === 'J' || rank[i] === 'j') ? rank[i] = 11 :
    (rank[i] === 'Q' || rank[i] === 'q') ? rank[i] = 12 :
      (rank[i] === 'K' || rank[i] === 'k') ? rank[i] = 13 :
        (rank[i] === 'A' || rank[i] === 'a') ? rank[i] = 14 : false;
};

// console.log('----Rank----')
// console.log(rank);
const rankHand = getValues(groupedHand, rank);
// console.log('----RankHand----')
// console.log(rankHand);
const suitHand = getValues(groupedHand, suit);
// console.log('----SuitHand----');
// console.log(suitHand);


const sorted = rank.sort((a, b) => a - b);
const isSorted = [];
//console.log(sorted);
for (let i = 0; i < sorted.length - 1; i++) {
  if (sorted[i] - sorted[i + 1] === -1) {
    isSorted[i] = -1;
    //console.log(isSorted)
  } else break;
};

const highCard = (rank) => {
  let highestCard = 0;
  for (let elem of rank) {
    highestCard < elem ? highestCard = elem : highestCard;
  }
  return highestCard;
};

function evaluate(hand) {
  if (suitHand.find(num => num === 5) && isSorted.every(num => num === -1) && isSorted.length === 4) {
    console.log('Your hand is Straight Flush');
    return [handType.STRAIGHT_FLUSH, highCard(rank)];

  } else if (rankHand.find(num => num === 4)) {
    console.log('Your hand is Four of A Kind')
    return [handType.FOUR_OF_A_KIND, highCard(rank)];

  } else if (rankHand.find(num => num === 3) && rankHand.find(num => num === 2)) {
    console.log('Your hand is Full House')
    return [handType.FOUL_HOUSE, highCard(rank)];

  } else if (suitHand.find(num => num === 5)) {
    console.log('Your hand is Flush')
    return [handType.FLUSH, highCard(rank)];

  } else if (isSorted.every(num => num === -1) && isSorted.length === 4) {
    console.log('Your hand is Straight');
    return [handType.STRAIGHT, highCard(rank)];

  } else if (rankHand.find(num => num === 3)) {
    console.log('Your hand is Three of A Kind')
    return [handType.THREE_OF_A_KIND, highCard(rank)];

  } else if (rankHand.find(num => num === 2) && rankHand.length === 3) {
    console.log('Your hand is Two Pairs')
    return [handType.TWO_PAIRS, highCard(rank)];
    
  } else if (rankHand.find(num => num === 2)) {
    console.log('Your hand is One Pair')
    return [handType.ONE_PAIR, highCard(rank)];

  } else {
    console.log('Your hand is High Card')
    return [handType.HIGH_CARD, highCard(rank)];;
  }
};

const playerHand = evaluate(hand);
console.log(playerHand);