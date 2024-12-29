export interface CardInfo {
  number: string;
  cvc: string;
  expMonth: string;
  expYear: string;
  cardName: string;
}

export interface CustomerInfo {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  typeDocument: string;
  document: string;
}

export interface DeliveryInfo {
  countryCode: string;
  country: string;
  region: string;
  city: string;
  address: string;
}

export interface ModalFormValues {
  cardInfo: CardInfo;
  customer: CustomerInfo;
  delivery: DeliveryInfo;
}
