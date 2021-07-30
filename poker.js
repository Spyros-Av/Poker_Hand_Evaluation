const hand = [
  {
    rank: '10',
    suit: 'diamonds',
  },
  {
    rank: 'Q',
    suit: 'diamonds',
  },
  {
    rank: 'J',
    suit: 'diamonds',
  },
  {
    rank: 'K',
    suit: 'diamonds',
  },
  {
    rank: 'A',
    suit: 'diamonds',
  },

];

const handType = {
  ROYAL_FLUSH: 10,
  STRAIGHT_FLUSH: 9,
  FOUR_OF_A_KIND: 8,
  FOUL_HOUSE: 7,
  FLUSH: 6,
  STRAIGHT: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIRS: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
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
  (rank[i].toLowerCase() === 'j') ? rank[i] = 11 :
    (rank[i].toLowerCase() === 'q') ? rank[i] = 12 :
      (rank[i].toLowerCase() === 'k') ? rank[i] = 13 :
        (rank[i].toLowerCase() === 'a') ? rank[i] = 14 : false;
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
    highestCard < elem ? highestCard = Number(elem) : highestCard;
  }
  return highestCard;
};

const PlayerHand = (hand, highCard) => ({
  hand,
  highCard,
});

const isRoyalFlush = () => {
  strength = highCard(rank);
  return (suitHand.find(num => num === 5) && isSorted.every(num => num === -1) && isSorted.length === 4 && strength === 14) ? true : false;
};

const isStraightFlush = () => {
  return (suitHand.find(num => num === 5) && isSorted.every(num => num === -1) && isSorted.length === 4) ? true : false;
};

const isFourOfaKind = () => {
  return (rankHand.find(num => num === 4)) ? true : false;
}

const isFullHouse = () => {
  return (rankHand.find(num => num === 3) && rankHand.find(num => num === 2)) ? true : false;
}

const isFlush = () => {
  return (suitHand.find(num => num === 5)) ? true : false;
}

const isStraight = () => {
  return (isSorted.every(num => num === -1) && isSorted.length === 4) ? true : false;
}

const isTreeOfaKind = () => {
  return (rankHand.find(num => num === 3)) ? true : false;
}

const isTwoPairs = () => {
  return (rankHand.find(num => num === 2) && rankHand.length === 3) ? true : false;
}

const isOnePair = () => {
  return (rankHand.find(num => num === 2)) ? true : false;
}

const isHighCard = () => {
  return rankHand.find(num => num === 1) ? true : false;
}


const evaluate = (hand) => {

  let strength = highCard(rank);
  if (isRoyalFlush(suitHand, isSorted, strength)) {
    console.log('Your hand is Royal Flush');
    const playerHand = PlayerHand(handType.ROYAL_FLUSH, strength);
    return playerHand;
  }
  if (isStraightFlush(suitHand, isSorted)) {
    console.log('Your hand is Straight Flush');
    const playerHand = PlayerHand(handType.STRAIGHT_FLUSH, strength);
    return playerHand;
  }
  if (isFourOfaKind(rankHand)) {
    console.log('Your hand is Four of A Kind')
    const playerHand = PlayerHand(handType.FOUR_OF_A_KIND, strength);
    return playerHand;
  }
  if (isFullHouse(rankHand)) {
    console.log('Your hand is Full House');
    const playerHand = PlayerHand(handType.FOUL_HOUSE, strength);
    return playerHand;
  }
  if (isFlush(suitHand)) {
    console.log('Your hand is Flush');
    const playerHand = PlayerHand(handType.FLUSH, strength)
    return playerHand;
  }
  if (isStraight(isSorted)) {
    console.log('Your hand is Straight');
    const playerHand = PlayerHand(handType.STRAIGHT, strength);
    return playerHand;
  }
  if (isTreeOfaKind(rankHand)) {
    console.log('Your hand is Three of A Kind');
    const playerHand = PlayerHand(handType.THREE_OF_A_KIND, strength);
    return playerHand;
  }
  if (isTwoPairs(rankHand)) {
    console.log('Your hand is Two Pairs');
    const playerHand = PlayerHand(handType.TWO_PAIRS, strength);
    return playerHand;
  }
  if (isOnePair(rankHand)) {
    console.log('Your hand is One Pair');
    const playerHand = PlayerHand(handType.ONE_PAIR, strength);
    return playerHand;
  }
  if (isHighCard(rankHand)) {
    console.log('Your hand is High Card');
    const playerHand = PlayerHand(handType.HIGH_CARD, strength);
    return playerHand;
  }
};

console.log(evaluate(hand));





