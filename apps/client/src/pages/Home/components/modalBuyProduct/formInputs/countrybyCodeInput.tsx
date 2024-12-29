import { forwardRef, useMemo } from "react";
import { all } from "country-codes-list";

interface CountrySelectorProps {
  label: string;
  error?: string;
  className?: string;
  register: any;
  name: string; 
}

const CountrySelector = forwardRef<HTMLSelectElement, CountrySelectorProps>(
  ({ label, error, className = "", register, name }, ref) => {
    const countries = useMemo(() => all(), []);

    return (
      <div className={`modal-form__input ${className}`}>
        <label className="modal-form__label">{label}</label>
        <select
          ref={ref}
          {...register(name)}
          className={`modal-form__select ${error ? "modal-form__select--error" : ""}`}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.countryCode} value={country.countryCode}>
              {country.countryNameEn} - {country.countryNameLocal}
            </option>
          ))}
        </select>
        {error && <p className="modal-form__error">{error}</p>}
      </div>
    );
  }
);

CountrySelector.displayName = "CountrySelector";

export default CountrySelector;
