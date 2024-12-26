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

export interface RequestTransaction {
  acceptance_token: string;
  accept_personal_auth: string;
  signature: string;
  amount_in_cents: number;
  reference: string;
  currency: Currency;
  payment_method_type: PaymentMethod;
  customer_email: string;
  payment_method: {
    type: PaymentMethod;
    token: string;
    installments: number;
  };
  redirect_url: string | null;
  shipping_address: {
    address_line_1: string;
    country: string;
    region: string;
    city: string;
    phone_number: string;
  };
  customer_data: {
    phone_number: string;
    full_name: string;
    legal_id: string;
    legal_id_type: TypeDocument;
  };
  taxes: [];
}

export interface ResponseTransaction {
  data: {
    id: string;
    created_at: Date;
    finalized_at: Date | null;
    amount_in_cents: number;
    reference: string;
    customer_email: string;
    currency: Currency;
    payment_method_type: PaymentMethod;
    payment_method: {
      type: PaymentMethod;
      extra: {
        bin: string;
        name: string;
        brand: string;
        exp_year: string;
        card_type: string;
        exp_month: string;
        last_four: string;
        card_holder: string;
        is_three_ds: false;
        three_ds_auth_type: null;
      };
      installments: number;
    };
    status: TransactionStatusWompi;
    status_message: null;
    billing_data: null;
    shipping_address: {
      address_line_1: string;
      country: string;
      region: string;
      city: string;
      phone_number: string;
    };
    redirect_url: null;
    payment_source_id: null;
    payment_link_id: null;
    customer_data: {
      legal_id: string;
      full_name: string;
      phone_number: string;
      legal_id_type: TypeDocument;
    };
    bill_id: null;
    taxes: [];
    tip_in_cents: null;
  };
  meta: object;
}

export interface ResponseMerchants {
  data: {
    id: number;
    name: string;
    email: string;
    contact_name: string;
    phone_number: string;
    active: true;
    logo_url: null;
    legal_name: string;
    legal_id_type: TypeDocument;
    legal_id: string;
    public_key: string;
    accepted_currencies: Currency[];
    fraud_javascript_key: null;
    fraud_groups: [];
    accepted_payment_methods: PaymentMethod[];
    payment_methods: [
      {
        name: PaymentMethod;
        payment_processors: [
          {
            name: string;
          },
        ];
      },
    ];
    presigned_acceptance: {
      acceptance_token: string;
      permalink: string;
      type: string;
    };
    presigned_personal_data_auth: {
      acceptance_token: string;
      permalink: string;
      type: string;
    };
  };
  meta: object;
}

export enum Currency {
  COP = 'COP',
}

export enum PaymentMethod {
  CARD = 'CARD',
}

export enum TypeDocument {
  CC = 'CC',
}

export enum CardType {
  CREDIT = 'CREDIT',
}

export enum TransactionStatusWompi {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  VOIDED = 'VOIDED',
  DECLINED = 'DECLINED',
  ERROR = 'ERROR',
}
