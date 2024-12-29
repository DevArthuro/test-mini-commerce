import CreditCardInput from "react-credit-card-input";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

const CustomCardInput: React.FC<{
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
}> = ({ register, setValue, watch, errors }) => {
  return (
    <CreditCardInput
      cardNumberInputProps={{
        value: watch("cardInfo.number"),
        onChange: (e) => {
          console.log(e);
          setValue("cardInfo.number", "");
        },
      }}
      cardExpiryInputProps={{
        value: `${watch("cardInfo.expMonth")}/${watch("cardInfo.expYear")}`,
        onChange: (e) => {
          console.log(e);
        },
      }}
      cardCVCInputProps={{
        value: watch("cardInfo.cvc"),
        onChange: (e) => {
          console.log(e);
        },
      }}
      fieldClassName="input"
    />
  );
};

export default CustomCardInput;
