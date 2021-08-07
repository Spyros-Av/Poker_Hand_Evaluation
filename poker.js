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

const suit = (hand) => hand.map(item => item.suit);
const rank = (hand) => hand.map(item => item.rank);
const lettersToNumber = (suit, hand) => {
  const rankArr = suit(hand);
  for (let i = 0; i < rankArr.length; i++) {
    (rankArr[i].toLowerCase() === 'j') ? rankArr[i] = 11 :
      (rankArr[i].toLowerCase() === 'q') ? rankArr[i] = 12 :
        (rankArr[i].toLowerCase() === 'k') ? rankArr[i] = 13 :
          (rankArr[i].toLowerCase() === 'a') ? rankArr[i] = 14 : false;
  }
  return rankArr;
}

const getValues = (groupedHand, maped) => {
  let valueOfHand = (groupedHand(maped));
  return Object.values(valueOfHand);
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

const sorted = (rankArr) => {
  rankArr.sort((a, b) => a - b)
  return rankArr;
};
const isSorted = [];
for (let i = 0; i < sorted.length - 1; i++) {
  if (sorted[i] - sorted[i + 1] === -1) {
    isSorted[i] = -1;
  } else break;
};

const highCard = (rankArr) => {
  let highestCard = 0;
  for (let elem of rankArr) {
    highestCard < elem ? highestCard = Number(elem) : highestCard;
  }
  return highestCard;
};

const PlayerHand = (hand, highCard) => ({
  hand,
  highCard,
});

const isRoyalFlush = (hand) => { //(suitHand, isSorted, strength)
  const rankArr = lettersToNumber(rank, hand);
  const suitHand = getValues(groupedHand, suit(hand));
  const sort = sorted(rankArr);
  const isSorted = [];
  for (let i = 0; i < sort.length - 1; i++) {
    if (sort[i] - sort[i + 1] === -1) {
      isSorted[i] = -1;
    } else break;
  };
  const strength = highCard(rankArr);
  return (suitHand.find(num => num === 5) && isSorted.every(num => num === -1) && isSorted.length === 4 && strength === 14);
};

const isStraightFlush = (hand) => { //(suitHand, rank, isSorted)
  const rankArr = lettersToNumber(rank, hand);
  const suitHand = getValues(groupedHand, suit(hand));
  const sort = sorted(rankArr);
  const isSorted = [];
  for (let i = 0; i < sort.length - 1; i++) {
    if (sort[i] - sort[i + 1] === -1) {
      isSorted[i] = -1;
    } else break;
  };
  return (suitHand.find(num => num === 5) && isSorted.every(num => num === -1) && isSorted.length === 4) || (suitHand.find(num => num === 5) && rankArr.find(num => num === '5') && rankArr.find(num => num === '4') && rankArr.find(num => num === '3') && rankArr.find(num => num === '2') && rankArr.find(num => num === 14));
};

const isFourOfaKind = (hand) => { //(rankHand)
  const rankHand = getValues(groupedHand, rank(hand));
  return (rankHand.find(num => num === 4));
};

const isFullHouse = (hand) => { //(rankHand)
  const rankHand = getValues(groupedHand, rank(hand));
  return (rankHand.find(num => num === 3) && rankHand.find(num => num === 2) && rankHand.length === 2);
};

const isFlush = (hand) => { //(suitHand)
  const suitHand = getValues(groupedHand, suit(hand));
  return (suitHand.find(num => num === 5));
};

const isStraight = (hand) => { //(isSorted, rank)
  const rankArr = lettersToNumber(rank, hand);
  const sort = sorted(rankArr);
  const isSorted = [];
  for (let i = 0; i < sort.length - 1; i++) {
    if (sort[i] - sort[i + 1] === -1) {
      isSorted[i] = -1;
    } else break;
  };
  return (isSorted.every(num => num === -1) && isSorted.length === 4) || (rankArr.find(num => num === '5') && rankArr.find(num => num === '4') && rankArr.find(num => num === '3') && rankArr.find(num => num === '2') && rankArr.find(num => num === 14));
};

const isThreeOfaKind = (hand) => { //(rankHand)
  const rankHand = getValues(groupedHand, rank(hand));
  return (rankHand.find(num => num === 3) && rankHand.length === 3);
};

const isTwoPair = (hand) => { //(rankHand)
  const rankHand = getValues(groupedHand, rank(hand));
  return (rankHand.find(num => num === 2) && rankHand.length === 3);
};

const isOnePair = (hand) => { //(rankHand)
  const rankHand = getValues(groupedHand, rank(hand));
  return (rankHand.find(num => num === 2));
};

const isHighCard = (hand) => { //(rankHand)
  const rankHand = getValues(groupedHand, rank(hand));
  return rankHand.find(num => num === 1);
};


const evaluate = (hand) => {
  const rankArr = lettersToNumber(rank, hand);
  const strength = highCard(rankArr)
  if (isRoyalFlush(hand)) {
    const playerHand = PlayerHand(handType.ROYAL_FLUSH, strength);
    return playerHand;
  };
  if (isStraightFlush(hand)) {
    const playerHand = PlayerHand(handType.STRAIGHT_FLUSH, strength);
    return playerHand;
  };
  if (isFourOfaKind(hand)) {
    const playerHand = PlayerHand(handType.FOUR_OF_A_KIND, strength);
    return playerHand;
  };
  if (isFullHouse(hand)) {
    const playerHand = PlayerHand(handType.FULL_HOUSE, strength);
    return playerHand;
  };
  if (isFlush(hand)) {
    const playerHand = PlayerHand(handType.FLUSH, strength)
    return playerHand;
  };
  if (isStraight(hand)) {
    const playerHand = PlayerHand(handType.STRAIGHT, strength);
    return playerHand;
  };
  if (isThreeOfaKind(hand)) {
    const playerHand = PlayerHand(handType.THREE_OF_A_KIND, strength);
    return playerHand;
  };
  if (isTwoPair(hand)) {
    const playerHand = PlayerHand(handType.TWO_PAIR, strength);
    return playerHand;
  };
  if (isOnePair(hand)) {
    const playerHand = PlayerHand(handType.ONE_PAIR, strength);
    return playerHand;
  }
  if (isHighCard(hand)) {
    const playerHand = PlayerHand(handType.HIGH_CARD, strength);
    return playerHand;
  }
};


module.exports = {
  evaluate,
  handType,
};
