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
