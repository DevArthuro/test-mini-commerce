import { forwardRef, useCallback, useEffect, useMemo } from "react";
import { all } from "country-codes-list";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CountrySelectorProps {
  label: string;
  error?: string;
  className?: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  onChange: (code: string, country: string) => void;
}

const CountrySelector = forwardRef<HTMLSelectElement, CountrySelectorProps>(
  ({ label, error, className = "", register, name, onChange }) => {
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

    // Select default value
    useEffect(() => {
      onChangeSelect("CO")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div className={`modal-form__input ${className}`}>
        <label className="modal-form__label">{label}</label>
        <select
          {...register(name)}
          className={`modal-form__select ${error ? "modal-form__select--error" : ""}`}
          onChange={(e) => {
            onChangeSelect(e.target.value);
          }}
          defaultValue={"CO"}
        >
          {countries.map((country) => (
            <option
              key={`${country.countryCode}-${country.countryNameEn}`}
              value={country.countryCode}
            >
              {country.countryNameEn} - {country.countryNameLocal}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

CountrySelector.displayName = "CountrySelector";

export default CountrySelector;
