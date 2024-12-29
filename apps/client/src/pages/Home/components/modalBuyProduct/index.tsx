import "./modalBuyProduct.scss";
import FormField from "./formInputs/formField";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { ModalFormValues } from "../../../../types/modalForm";
import CustomPhoneInput from "./formInputs/customPhoneInput";
import CountrySelector from "./formInputs/countrybyCodeInput";
import DocumentTypeSelector from "./formInputs/customSelectTypeDocument";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

export const paymentSchema = z.object({
  cardInfo: z.object({
    number: z.string().regex(/^\d{16}$/, "Invalid card number"),
    cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
    expMonth: z
      .string()
      .regex(/^(0[1-9]|1[0-2])$/, "Invalid month")
      .refine(
        (value) => {
          const month = parseInt(value);
          return month >= 1 && month <= 12;
        },
        {
          message: "Invalid month",
        }
      ),
    expYear: z
      .string()
      .regex(/^\d{4}$/, "Invalid year")
      .refine(
        (value) => {
          const year = parseInt(value);
          if (year < currentYear) return false;
          if (year === currentYear) {
            const month = parseInt(value);
            return month >= currentMonth;
          }
          return true;
        },
        {
          message: `The year is past`,
        }
      ),
    cardName: z.string().min(3, "Card name is required"),
  }),
  customer: z.object({
    name: z.string().min(2, "Name is required"),
    lastname: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number"),
    typeDocument: z.enum(
      ["PP", "RUC", "RG", "OTHER", "RC", "TI", "CC", "TE", "CE", "NIT", "DNI"],
      {
        message: "Invalid document type",
      }
    ),
    document: z.string().min(5, "Document number is required"),
  }),
  delivery: z.object({
    countryCode: z.string().min(2, "Country code is required"),
    country: z.string().min(2, "Country is required"),
    region: z.string().min(2, "Region is required"),
    city: z.string().min(2, "City is required"),
    address: z.string().min(5, "Address is required"),
  }),
});


const ModalBuyProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  const errorsField = errors as FieldErrors<ModalFormValues>;

  return (
    <div className="modal">
      <div className="modal__content">
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="modal-form__title">Card Information</h2>
          <section className="modal-form__section">
            <FormField
              label="Card Number"
              error={errorsField.cardInfo?.number?.message}
              {...register("cardInfo.number")}
              as="input"
              className="modal-form__input"
            />
          </section>

          <section className="modal-form__section modal-form__section--split">
            <div className="modal-form__card-info">
              <FormField
                label="CVC"
                error={errorsField.cardInfo?.cvc?.message}
                {...register("cardInfo.cvc")}
                as="input"
                className="modal-form__input modal-form__input--half"
              />
              <div className="modal-form__expire">
                <FormField
                  label="Expire month"
                  error={errorsField.cardInfo?.expMonth?.message}
                  {...register("cardInfo.expMonth")}
                  as="input"
                  className="modal-form__input modal-form__input--expire"
                  placeholder="MM"
                />
                <span className="modal-form__slash">/</span>
                <FormField
                  label="Expire year"
                  error={errorsField.cardInfo?.expYear?.message}
                  {...register("cardInfo.expYear")}
                  as="input"
                  className="modal-form__input modal-form__input--expire"
                  placeholder="YYYY"
                />
              </div>
            </div>
          </section>

          <section className="modal-form__section">
            <FormField
              label="Card Holder Name"
              error={errorsField.cardInfo?.cardName?.message}
              {...register("cardInfo.cardName")}
              as="input"
              className="modal-form__input"
            />
          </section>

          <h2 className="modal-form__title">Customer Information</h2>
          <section className="modal-form__section">
            <FormField
              label="Name"
              error={errorsField.customer?.name?.message}
              {...register("customer.name")}
              as="input"
              className="modal-form__input"
            />
            <FormField
              label="Last Name"
              error={errorsField.customer?.lastname?.message}
              {...register("customer.lastname")}
              as="input"
              className="modal-form__input"
            />
            <FormField
              label="Email"
              error={errorsField.customer?.email?.message}
              {...register("customer.email")}
              as="input"
              className="modal-form__input"
            />
            <CustomPhoneInput
              label="Phone Number"
              value={watch("customer.phoneNumber")}
              onChange={(value: string) => {
                setValue("customer.phoneNumber", value);
              }}
              error={errorsField.customer?.phoneNumber?.message}
              className="modal-form__input"
            />
            <section className="modal-form__section">
              <div className="modal-form__input--type-document">
                <DocumentTypeSelector
                  label="Document Type"
                  error={errorsField.customer?.typeDocument?.message}
                  register={register}
                  name="customer.typeDocument"
                  className="modal-form__input--type"
                />
                <FormField
                  label="Document Number"
                  error={errorsField.customer?.document?.message}
                  {...register("customer.document")}
                  as="input"
                  className="modal-form__input--document"
                />
              </div>
            </section>
          </section>

          <h2 className="modal-form__title">Delivery Information</h2>
          <section className="modal-form__section">
            <CountrySelector
              label="Country"
              error={
                errorsField.delivery?.countryCode?.message ||
                errorsField.delivery?.country?.message
              }
              register={register}
              name="delivery.countryCode"
              className="modal-form__input"
              onChange={(code: string, country: string) => {
                setValue("delivery.countryCode", code);
                setValue("delivery.country", country);
              }}
            />
            <FormField
              label="Region"
              error={errorsField.delivery?.region?.message}
              {...register("delivery.region")}
              as="input"
              className="modal-form__input"
            />
            <FormField
              label="City"
              error={errorsField.delivery?.city?.message}
              {...register("delivery.city")}
              as="input"
              className="modal-form__input"
            />
            <FormField
              label="Address"
              error={errorsField.delivery?.address?.message}
              {...register("delivery.address")}
              as="input"
              className="modal-form__input"
            />
          </section>

          <button className="modal-form__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalBuyProduct;
