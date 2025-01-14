export class Invoice {
  constructor(
    public readonly id: string,
  ) {}

  public toValue(): VISIBILITY_INVOICE_INFO {
    return {
      id: this.id,
    };
  }
}

export interface VISIBILITY_INVOICE_INFO {
  id: string;
}
