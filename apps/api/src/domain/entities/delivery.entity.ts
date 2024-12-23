export class Delivery {
  constructor(
    public readonly id: string,
    public readonly countryCode: string,
    public readonly country: string,
    public readonly region: string,
    public readonly city: Date,
  ) {}
}
