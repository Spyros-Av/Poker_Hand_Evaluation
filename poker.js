
const handType = {
  ROYAL_FLUSH: 10,
  STRAIGHT_FLUSH: 9,
  FOUR_OF_A_KIND: 8,
  FULL_HOUSE: 7,
  FLUSH: 6,
  STRAIGHT: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

const groupedHand = (hand) => hand.reduce(
  (groups, group) => {
    if (!groups[group]) {
      groups[group] = 0;
    }
    groups[group]++;
    return groups;
  },
  {},
);

const getValues = (groupedHand, maped) => {
  let valueOfHand = (groupedHand(maped));
  return Object.values(valueOfHand);
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

const isRoyalFlush = (suitHand, isSorted, strength) => {
  return (suitHand.find(num => num === 5) && isSorted.every(num => num === -1) && isSorted.length === 4 && strength === 14) ? true : false;
};

const isStraightFlush = (suitHand, rank, isSorted) => {
  console.log(rank);
  return (suitHand.find(num => num === 5) && isSorted.every(num => num === -1) && isSorted.length === 4) || (suitHand.find(num => num === 5) && rank.find(num => num === '5') && rank.find(num => num === '4') && rank.find(num => num === '3') && rank.find(num => num === '2') && rank.find(num => num === 14)) != undefined ? true : false;
};

const isFourOfaKind = (rankHand) => {
  return (rankHand.find(num => num === 4)) ? true : false;
}

const isFullHouse = (rankHand) => {
  return (rankHand.find(num => num === 3) && rankHand.find(num => num === 2) && rankHand.length === 2) ? true : false;
}

const isFlush = (suitHand) => {
  return (suitHand.find(num => num === 5)) ? true : false;
}

const isStraight = (isSorted, rank) => {
  return (isSorted.every(num => num === -1) && isSorted.length === 4) || (rank.find(num => num === '5') && rank.find(num => num === '4') && rank.find(num => num === '3') && rank.find(num => num === '2') && rank.find(num => num === 14)) != undefined ? true : false;
}

const isTreeOfaKind = (rankHand) => {
  return (rankHand.find(num => num === 3) && rankHand.length === 3) ? true : false;
}

const isTwoPair = (rankHand) => {
  return (rankHand.find(num => num === 2) && rankHand.length === 3) ? true : false;
}

const isOnePair = (rankHand) => {
  return (rankHand.find(num => num === 2)) ? true : false;
}

const isHighCard = (rankHand) => {
  return rankHand.find(num => num === 1) ? true : false;
}


const evaluate = (hand) => {

  const suit = hand.map(item => item.suit);
  const rank = hand.map(item => item.rank);
  for (let i = 0; i < rank.length; i++) {
    (rank[i].toLowerCase() === 'j') ? rank[i] = 11 :
      (rank[i].toLowerCase() === 'q') ? rank[i] = 12 :
        (rank[i].toLowerCase() === 'k') ? rank[i] = 13 :
          (rank[i].toLowerCase() === 'a') ? rank[i] = 14 : false;
  };

  const rankHand = getValues(groupedHand, rank);
  const suitHand = getValues(groupedHand, suit);

  const sorted = rank.sort((a, b) => a - b);
  const isSorted = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i] - sorted[i + 1] === -1) {
      isSorted[i] = -1;
    } else break;
  };

  let strength = highCard(rank);

  if (isRoyalFlush(suitHand, isSorted, strength)) {
    const playerHand = PlayerHand(handType.ROYAL_FLUSH, strength);
    return playerHand;
  }
  if (isStraightFlush(suitHand, rank, isSorted)) {
    const playerHand = PlayerHand(handType.STRAIGHT_FLUSH, strength);
    return playerHand;
  }
  if (isFourOfaKind(rankHand)) {
    const playerHand = PlayerHand(handType.FOUR_OF_A_KIND, strength);
    return playerHand;
  }
  if (isFullHouse(rankHand)) {
    const playerHand = PlayerHand(handType.FULL_HOUSE, strength);
    return playerHand;
  }
  if (isFlush(suitHand)) {
    const playerHand = PlayerHand(handType.FLUSH, strength)
    return playerHand;
  }
  if (isStraight(isSorted, rank)) {
    const playerHand = PlayerHand(handType.STRAIGHT, strength);
    return playerHand;
  }
  if (isTreeOfaKind(rankHand)) {
    const playerHand = PlayerHand(handType.THREE_OF_A_KIND, strength);
    return playerHand;
  }
  if (isTwoPair(rankHand)) {
    const playerHand = PlayerHand(handType.TWO_PAIR, strength);
    return playerHand;
  }
  if (isOnePair(rankHand)) {
    const playerHand = PlayerHand(handType.ONE_PAIR, strength);
    return playerHand;
  }
  if (isHighCard(rankHand)) {
    const playerHand = PlayerHand(handType.HIGH_CARD, strength);
    return playerHand;
  }
};


module.exports = {
  evaluate,
  handType,
};
