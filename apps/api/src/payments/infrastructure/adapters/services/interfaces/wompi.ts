export interface RequestTokenizedCard {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}

export enum TokenizedEnum {
  CREATED = 'CREATED',
}

export interface ResponseTokenizedCard {
  status: TokenizedEnum;
  data: {
    id: string;
    created_at: Date;
    brand: string;
    name: string;
    last_four: string;
    bin: string;
    exp_year: string;
    exp_month: string;
    card_holder: string;
    created_with_cvc: boolean;
    expires_at: Date;
    validity_ends_at: Date;
  };
}
