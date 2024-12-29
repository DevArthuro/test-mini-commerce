import { forwardRef, useCallback, useMemo, useState } from "react";
import { all } from "country-codes-list";

interface CountrySelectorProps {
  label: string;
  error?: string;
  className?: string;
  register: any;
  name: string;
  onChange: (code: string, country: string) => void
}

const CountrySelector = forwardRef<HTMLSelectElement, CountrySelectorProps>(
  ({ label, error, className = "", register, name, onChange }, ref) => {
    const countries = useMemo(() => all(), []);
    const searchByCode = useCallback(
      (code: string): { code: string; country: string } => {
        const country = countries.find((country) => country.countryCode === code);
        return {code: code, country: country?.countryNameLocal ?? ""};
      },
      [countries]
    );

    const onChangeSelect = (value: string) => {
      const searchCodeSelected = searchByCode(value);
      onChange(searchCodeSelected.code, searchCodeSelected.country);
      return value
    }

    return (
      <div className={`modal-form__input ${className}`}>
        <label className="modal-form__label">{label}</label>
        <select
          ref={ref}
          {...register(name)}
          className={`modal-form__select ${error ? "modal-form__select--error" : ""}`}
          onChange={(e) => { onChangeSelect(e.target.value) }}
          defaultValue={"CO"}
        >
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