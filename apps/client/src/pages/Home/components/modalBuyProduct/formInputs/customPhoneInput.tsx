import PhoneInput from "react-phone-number-input";
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
  error,
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
        onChange={onChange}
        placeholder="type your phone  number..."
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default CustomPhoneInput;