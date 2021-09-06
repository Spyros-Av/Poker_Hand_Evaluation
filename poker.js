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

const lettersToNumber = (hand) => {
  const rankArr = rank(hand);
  const lettersToNumbersArray = rankArr.map(rank => {
    if (rank.toLowerCase() === 'j') return 11;
    if (rank.toLowerCase() === 'q') return 12;
    if (rank.toLowerCase() === 'k') return 13;
    if (rank.toLowerCase() === 'a') return 14;
    return rank;
  });
  return lettersToNumbersArray;
};

const getValues = (maped) => {
  let valueOfHand = groupedHand(maped);
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

const straight = (hand) => {
  const onlyNumbers = lettersToNumber(hand);
  const sortRankArr = onlyNumbers.sort((a, b) => a - b);
  const truthComparison = sortRankArr.reduce(
    (acc, cv) => {
      if (acc - cv === -1) {
        return cv;
      } else return false;
    });
  return truthComparison;
};

const highCard = (rankArr) => rankArr.reduce(
  (acc, rank) => {
    let highestCard = acc;
    highestCard < rank ? highestCard = rank : highestCard;
    return Number(highestCard);
  });

const PlayerHand = (hand, highCard) => ({
  hand,
  highCard,
});

const isRoyalFlush = (hand) => {
  const rankArr = lettersToNumber(hand);
  const suitHand = getValues(suit(hand));
  const isStraight = straight(hand);
  const strength = highCard(rankArr);
  return (suitHand.find(num => num === 5) && isStraight && strength === 14);
};

const isStraightFlush = (hand) => {
  const rankArr = lettersToNumber(hand);
  const suitHand = getValues(suit(hand));
  const isStraight = straight(hand);
  return (suitHand.find(num => num === 5) && isStraight === 4 || (suitHand.find(num => num === 5) && rankArr.find(num => num === '5') && rankArr.find(num => num === '4') && rankArr.find(num => num === '3') && rankArr.find(num => num === '2') && rankArr.find(num => num === 14)));
};

const isFlush = (hand) => {
  const suitHand = getValues(suit(hand));
  return (suitHand.find(num => num === 5));
};

const isStraight = (hand) => {
  const isStraight = straight(hand);
  return (isStraight);
};

const fullOfAKindAndPairs = (hand) => {
  const rankArr = lettersToNumber(hand);
  const strength = highCard(rankArr);
  const rankHand = getValues(rank(hand));
  if (rankHand.find(num => num === 3) && rankHand.find(num => num === 2) && rankHand.length === 2) {
    const playerHand = PlayerHand(handType.FULL_HOUSE, strength);
    return playerHand
  }
  if (rankHand.find(num => num === 4)) {
    const playerHand = PlayerHand(handType.FOUR_OF_A_KIND, strength);
    return playerHand
  };
  if (rankHand.find(num => num === 3) && rankHand.length === 3) {
    const playerHand = PlayerHand(handType.THREE_OF_A_KIND, strength);
    return playerHand;
  }
  if (rankHand.find(num => num === 2) && rankHand.length === 3) {
    const playerHand = PlayerHand(handType.TWO_PAIR, strength);
    return playerHand;
  }
  if (rankHand.find(num => num === 2)) {
    const playerHand = PlayerHand(handType.ONE_PAIR, strength);
    return playerHand;
  };
  if (rankHand.find(num => num === 1)) {
    const playerHand = PlayerHand(handType.HIGH_CARD, strength);
    return playerHand;
  }
};

const evaluate = (hand) => {
  const rankArr = lettersToNumber(hand);
  const strength = highCard(rankArr);
  if (isRoyalFlush(hand)) {
    const playerHand = PlayerHand(handType.ROYAL_FLUSH, strength);
    return playerHand;
  };
  if (isStraightFlush(hand)) {
    const playerHand = PlayerHand(handType.STRAIGHT_FLUSH, strength);
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
  return fullOfAKindAndPairs(hand);
};

module.exports = {
  evaluate,
  handType,
};
