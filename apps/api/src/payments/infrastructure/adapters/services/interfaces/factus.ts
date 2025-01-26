export interface AUTH_INTERFACE {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export enum NUMERIC_RANGE_ENUM {
  BILLING = 'SETP',
  NOTA_CREDITO = 'NC',
  NOTA_DEBITO = 'ND',
}

export enum TYPE_DOCUMENT_FACTUS {
  'Registro civil' = '1',
  'Tarjeta de identidad' = '2',
  'Cédula ciudadanía' = '3',
  'Tarjeta de extranjería' = '4',
  'Cédula de extranjería' = '5',
  'NIT' = '6',
  'Pasaporte' = '7',
  'Documento de identificación extranjero' = '8',
}

export enum PAYMENT_METHOD_CODE_FACTUS {
  TARJETA_DEBITO = '49',
  TARJETA_CREDITO = '48',
}

export interface RESPONSE_NUMERIC_RANGE {
  data: NUMERIC_RANGE[];
}

export interface NUMERIC_RANGE {
  id: number;
  document: string;
  prefix: NUMERIC_RANGE_ENUM;
  from: number;
  to: number;
  current: number;
  resolution_number: string;
  start_date: string;
  end_date: string;
  technical_key: string;
  is_expired: boolean;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CREATE_INVOICE {
  numbering_range_id: number;
  reference_code: string;
  observation: string;
  payment_due_date: string;
  payment_method_code: PAYMENT_METHOD_CODE_FACTUS;
  billing_period: {
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
  };
  customer: {
    identification: string;
    company: 'MINI_COMMERCE';
    names: string;
    address: string;
    email: string;
    phone: string;
    legal_organization_id: '2';
    identification_document_id: TYPE_DOCUMENT_FACTUS;
    tribute_id: 21;
  };
  items: ITEMS_INVOICE[];
}

export interface ITEMS_INVOICE {
  code_reference: string;
  name: string;
  quantity: number;
  price: number;
  tax_rate: string;
  is_excluded: 1 | 0;
  discount_rate: 0;
  unit_measure_id: 70;
  standard_code_id: 1;
  tribute_id: 1;
}

export enum StatusCreateInvoice {
  Created = 'Created',
  OK = 'OK',
}

export interface RESPONSE_CREATE_INVOICE {
  status: StatusCreateInvoice;
  message: string;
  data: {
    company: {
      url_logo: string;
      nit: string;
      dv: string;
      company: string;
      name: string;
      graphic_representation_name: string;
      registration_code: string;
      economic_activity: string;
      phone: string;
      email: string;
      direction: string;
      municipality: string;
    };
    customer: {
      identification: string;
      dv: null;
      graphic_representation_name: string;
      trade_name: string;
      company: string;
      names: string;
      address: string;
      email: string;
      phone: string;
      legal_organization: {
        id: number;
        code: string;
        name: string;
      };
      tribute: {
        id: number;
        code: string;
        name: string;
      };
      municipality: [];
    };
    numbering_range: {
      prefix: string;
      from: number;
      to: number;
      resolution_number: string;
      start_date: string;
      end_date: string;
      months: number;
    };
    billing_period: {
      start_date: string;
      start_time: string;
      end_date: string;
      end_time: string;
    };
    bill: {
      id: number;
      document: {
        code: string;
        name: string;
      };
      number: string;
      reference_code: string;
      status: number;
      send_email: number;
      qr: string;
      cufe: string;
      validated: string;
      discount_rate: string;
      discount: string;
      gross_value: string;
      taxable_amount: string;
      tax_amount: string;
      total: string;
      observation: string;
      errors: [];
      created_at: string;
      payment_due_date: null;
      qr_image: string;
      has_claim: number;
      is_negotiable_instrument: number;
      payment_form: {
        code: string;
        name: string;
      };
      payment_method: {
        code: string;
        name: string;
      };
      public_url: string;
    };
    related_documents: [];
    items: [
      {
        code_reference: string;
        name: string;
        quantity: number;
        discount_rate: string;
        discount: string;
        gross_value: string;
        tax_rate: string;
        taxable_amount: string;
        tax_amount: string;
        price: string;
        is_excluded: number;
        unit_measure: {
          id: number;
          code: string;
          name: string;
        };
        standard_code: {
          id: number;
          code: string;
          name: string;
        };
        tribute: {
          id: number;
          code: string;
          name: string;
        };
        total: number;
        withholding_taxes: [];
      },
    ];
    withholding_taxes: [];
    credit_notes: [];
    debit_notes: [];
  };
}

export interface RESPONSE_GET_INVOICE extends RESPONSE_CREATE_INVOICE {}
