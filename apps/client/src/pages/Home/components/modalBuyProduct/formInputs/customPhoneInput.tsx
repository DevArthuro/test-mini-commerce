import PhoneInput, { isValidPhoneNumber} from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: any) => void;
  error?: string;
  label?: string;
  className: string
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  label,
  className
}) => {

  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="CO"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        placeholder="type your phone  number..."
        limitMaxLength={true}
      />
      {!isValidPhoneNumber(value ?? "") && <p>Invalid phone number</p>}
    </div>
  );
}

export default CustomPhoneInput;