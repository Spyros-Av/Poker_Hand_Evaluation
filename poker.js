const hand = [
  {
    rank: "10",
    suit: "diamonds",
  },
  {
    rank: "q",
    suit: "diamonds",
  },
  {
    rank: "q",
    suit: "diamonds",
  },
  {
    rank: "q",
    suit: "diamonds",
  },
  {
    rank: "Q",
    suit: "diamonds",
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

const groupedHand = (hand) =>
  hand.reduce((groups, group) => {
    if (!groups[group]) {
      groups[group] = 0;
    }
    groups[group]++;
    //console.log(groups);
    return groups;
  }, {});

const getValues = (groupedHand, maped) => {
  let valueOfHand = groupedHand(maped);
  return Object.values(valueOfHand);
};

const suit = hand.map((item) => item.suit);
// console.log('----Suit----')
// console.log(suit);

const rank = hand.map((item) => item.rank);
for (let i = 0; i < rank.length; i++) {
  rank[i] === "J" || rank[i] === "j"
    ? (rank[i] = 11)
    : rank[i] === "Q" || rank[i] === "q"
    ? (rank[i] = 12)
    : rank[i] === "K" || rank[i] === "k"
    ? (rank[i] = 13)
    : rank[i] === "A" || rank[i] === "a"
    ? (rank[i] = 14)
    : false;
}
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
}

const highCard = (rank) => {
  let highestCard = 0;
  for (let elem of rank) {
    highestCard < elem ? (highestCard = Number(elem)) : highestCard;
  }
  return highestCard;
};

const PlayerHand = function (handType, strength) {
  this.hand = handType;
  this.highCard = strength;
};

function evaluate(hand) {
  const strength = highCard(rank);
  if (
    suitHand.find((num) => num === 5) &&
    isSorted.every((num) => num === -1) &&
    isSorted.length === 4 &&
    strength === 14
  ) {
    console.log("Your hand is Royal Flush");
    const player = new PlayerHand(handType.ROYAL_FLUSH, strength);
    return player;
  } else if (
    suitHand.find((num) => num === 5) &&
    isSorted.every((num) => num === -1) &&
    isSorted.length === 4
  ) {
    console.log("Your hand is Straight Flush");
    const player = new PlayerHand(handType.STRAIGHT_FLUSH, strength);
    return player;
  } else if (rankHand.find((num) => num === 4)) {
    console.log("Your hand is Four of A Kind");
    const player = new PlayerHand(handType.FOUR_OF_A_KIND, strength);
    return player;
  } else if (
    rankHand.find((num) => num === 3) &&
    rankHand.find((num) => num === 2)
  ) {
    console.log("Your hand is Full House");
    const player = new PlayerHand(handType.FOUL_HOUSE, strength);
    return player;
  } else if (suitHand.find((num) => num === 5)) {
    console.log("Your hand is Flush");
    const player = new PlayerHand(handType.FLUSH, strength);
    return player;
  } else if (isSorted.every((num) => num === -1) && isSorted.length === 4) {
    console.log("Your hand is Straight");
    const player = new PlayerHand(handType.STRAIGHT, strength);
    return player;
  } else if (rankHand.find((num) => num === 3)) {
    console.log("Your hand is Three of A Kind");
    const player = new PlayerHand(handType.THREE_OF_A_KIND, strength);
    return player;
  } else if (rankHand.find((num) => num === 2) && rankHand.length === 3) {
    console.log("Your hand is Two Pairs");
    const player = new PlayerHand(handType.TWO_PAIRS, strength);
    return player;
  } else if (rankHand.find((num) => num === 2)) {
    console.log("Your hand is One Pair");
    const player = new PlayerHand(handType.ONE_PAIR, strength);
    return player;
  } else {
    console.log("Your hand is High Card");
    const player = new PlayerHand(handType.HIGH_CARD, strength);
    return player;
  }
}

const playerHand = evaluate(hand);
console.log(playerHand);

module.exports = {
  evaluate,
  handType,
};
