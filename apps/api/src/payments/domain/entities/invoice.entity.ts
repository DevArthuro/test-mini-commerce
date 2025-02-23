export class Invoice {
  constructor(
    public readonly id: string,
    public readonly linksInvoice: linksInvoice[],
  ) {}

  public toValue(): VISIBILITY_INVOICE_INFO {
    return {
      id: this.id,
      linksInvoice: this.linksInvoice,
    };
  }
}

export interface VISIBILITY_INVOICE_INFO {
  id: string;
  linksInvoice: linksInvoice[];
}

export interface linksInvoice {
  link: string;
  referenceName: string;
}
