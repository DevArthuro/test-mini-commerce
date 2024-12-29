import { all } from "country-codes-list";
import { useMemo } from "react";

const countrybyCodeInput = () => {
  const countries = useMemo(() => {
    return all();
  }, []);

  return (
    <select>
      {countries.map((country) => (
        <option key={country.countryCode}>
          <img src={country.flag} alt="flag" />
          <p>
            {country.countryNameEn} - {country.countryNameLocal}
          </p>
        </option>
      ))}
    </select>
  );
};

export default countrybyCodeInput;
