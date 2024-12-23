export class Card {
  constructor(
    public readonly id: string,
    public readonly number: string,
    public readonly cvc: string,
    public readonly expMonth: string,
    public readonly expYear: string,
    public readonly cardName: string,
  ) {}

  public getLatestDigitsCard() {
    return this.number.slice(-4);
  }

  public getConcatDates() {
    return `${this.expMonth}/${this.expYear}`;
  }

  public toValue(): VISIBILITY_CARD_INFO {
    return {
      number: this.getLatestDigitsCard(),
      exp_date: this.getConcatDates(),
      cardName: this.cardName,
    };
  }
}

export interface VISIBILITY_CARD_INFO {
  number: string;
  exp_date: string;
  cardName: string;
}
