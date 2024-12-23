export class Card {
  constructor(
    public readonly id: string,
    public readonly number: string,
    public readonly cvc: string,
    public readonly expMonth: string,
    public readonly expYear: string,
    public readonly cardName: string,
  ) {}
}
