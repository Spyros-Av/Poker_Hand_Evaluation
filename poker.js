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

const getValues = (mapped) => {
  let valueOfHand = groupedHand(mapped);
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

const highCard = (rankArr) => rankArr.reduce(
  (highestCardSoFar, rank) => {
    highestCardSoFar < rank ? highestCardSoFar = rank : highestCardSoFar;
    return Number(highestCardSoFar);
  });

const PlayerHand = (hand, highCard) => ({
  hand,
  highCard,
});

const hasNOfAKind = (num, length) => (hand) => {
  const rankHand = getValues(rank(hand));
  return rankHand.find(rank => rank === num) && rankHand.length === length;
};

const isRoyalFlush = (hand) => {
  const rankArr = lettersToNumber(hand);
  const suitHand = getValues(suit(hand));
  const strength = highCard(rankArr);
  return (suitHand.find(num => num === 5) && isStraight(hand) && strength === 14);
};

const isStraightFlush = (hand) => {
  const rankArr = lettersToNumber(hand);
  const suitHand = getValues(suit(hand));
  return (suitHand.find(num => num === 5) && isStraight(hand) || (suitHand.find(num => num === 5) && rankArr.find(num => num === '5') && rankArr.find(num => num === '4') && rankArr.find(num => num === '3') && rankArr.find(num => num === '2') && rankArr.find(num => num === 14)));
};

const isFourOfaKind = hasNOfAKind(4,2);
const isFullHouse = hasNOfAKind(3,2);

const isFlush = (hand) => {
  const suitHand = getValues(suit(hand));
  return (suitHand.find(num => num === 5));
};

const isStraight = (hand) => {
  const onlyNumbers = lettersToNumber(hand);
  const sortRankArr = onlyNumbers.sort((a, b) => a - b);
  const areSortRankArrElementsConsecutive = sortRankArr.reduce(
    (acc, cv) => {
      if (acc - cv === -1) {
        return cv;
      }
      return false;
    });
  return areSortRankArrElementsConsecutive;
};

const isThreeOfaKind = hasNOfAKind(3,3);
const isTwoPair = hasNOfAKind(2,3);
const isOnePair = hasNOfAKind(2,4);
const isHighCard = hasNOfAKind(1,5);

const evaluate = (hand) => {
  const rankArr = lettersToNumber(hand);
  const strength = highCard(rankArr);
  if (isRoyalFlush(hand)) {
     return PlayerHand(handType.ROYAL_FLUSH, strength);
  };
  if (isStraightFlush(hand)) {
     return PlayerHand(handType.STRAIGHT_FLUSH, strength);
  };
  if (isFourOfaKind(hand)) {
     return PlayerHand(handType.FOUR_OF_A_KIND, strength);
  };
  if (isFullHouse(hand)) {
     return PlayerHand(handType.FULL_HOUSE, strength);
  };
  if (isFlush(hand)) {
    return PlayerHand(handType.FLUSH, strength);
  };
  if (isStraight(hand)) {
     return PlayerHand(handType.STRAIGHT, strength);
  };
  if (isThreeOfaKind(hand)) {
     return PlayerHand(handType.THREE_OF_A_KIND, strength);
  };
  if (isTwoPair(hand)) {
     return PlayerHand(handType.TWO_PAIR, strength);
  };
  if (isOnePair(hand)) {
     return PlayerHand(handType.ONE_PAIR, strength);
  };
  if (isHighCard(hand)) {
    return PlayerHand(handType.HIGH_CARD, strength);
  };
};

module.exports = {
  evaluate,
  handType,
};
