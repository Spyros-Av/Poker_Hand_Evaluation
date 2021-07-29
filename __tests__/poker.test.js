const { evaluate, handType } = require("../poker");

const cardStringToObject = (cardString) => {
  const cardSuit = {
    C: "clubs",
    D: "diamonds",
    H: "hearts",
    S: "spades",
  };

  const numberToRankMap = {
    "02": 2,
    "03": 3,
    "04": 4,
    "05": 5,
    "06": 6,
    "07": 7,
    "08": 8,
    "09": 9,
    10: 10,
    11: "J",
    12: "Q",
    13: "K",
    14: "A",
  };

  const [suit, number] = [cardString[0], cardString.slice(1)];

  return {
    rank: numberToRankMap[number],
    suit: cardSuit[suit],
  };
};

const cardStringsArrayToCardObjects = (cardStringsArr) =>
  cardStringsArr.map(cardStringToObject);

describe("evaluate", () => {
  it('should return "Royal Flush" related result and 14 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H14",
      "H12",
      "H10",
      "H13",
      "H11",
    ]);

    console.log("hand", hand);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.ROYAL_FLUSH,
      highCard: 14,
    });
  });

  it('should return "Straight Flush" related result and 14 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H14",
      "H02",
      "H04",
      "H03",
      "H05",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.STRAIGHT_FLUSH,
      highCard: 14,
    });
  });

  it('should return "Four of a kind" related result and 14 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H14",
      "C14",
      "D14",
      "S14",
      "H05",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.FOUR_OF_A_KIND,
      highCard: 14,
    });
  });

  it('should return "Full House" related result and 14 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H14",
      "C14",
      "D14",
      "H13",
      "D13",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.FULL_HOUSE,
      highCard: 14,
    });
  });

  it('should return "Flush" related result and 8 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H08",
      "H03",
      "H05",
      "H07",
      "H04",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.FLUSH,
      highCard: 8,
    });
  });

  it('should return "Straight" related result and 8 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H08",
      "H06",
      "H05",
      "H07",
      "C04",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.STRAIGHT,
      highCard: 8,
    });
  });

  it('should return "Three of a kind" related result and 10 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H10",
      "H06",
      "D10",
      "C10",
      "H04",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.THREE_OF_A_KIND,
      highCard: 10,
    });
  });

  it('should return "Two Pair" related result and 10 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H10",
      "H06",
      "D10",
      "C06",
      "H04",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.TWO_PAIR,
      highCard: 10,
    });
  });

  it('should return "One Pair" related result and 10 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H10",
      "H06",
      "D10",
      "C05",
      "H04",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.ONE_PAIR,
      highCard: 10,
    });
  });

  it('should return "High Card" related result and 13 as highCard', () => {
    // GIVEN
    const hand = cardStringsArrayToCardObjects([
      "H10",
      "C13",
      "D09",
      "C05",
      "H04",
    ]);

    // WHEN
    const result = evaluate(hand);

    // THEN
    expect(result).toEqual({
      hand: handType.HIGH_CARD,
      highCard: 13,
    });
  });
});
