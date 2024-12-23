export class Delivery {
  constructor(
    public readonly id: string,
    public readonly countryCode: string,
    public readonly country: string,
    public readonly region: string,
    public readonly city: string,
    public readonly address: string,
  ) {}

  public toValue(): VISIBILITY_DELIVERY_INFO {
    return {
      country: this.country,
      region: this.region,
      city: this.city,
      address: this.address,
    };
  }
}

export interface VISIBILITY_DELIVERY_INFO {
  country: string;
  region: string;
  city: string;
  address: string;
}
