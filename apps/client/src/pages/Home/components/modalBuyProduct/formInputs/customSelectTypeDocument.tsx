import { forwardRef } from "react";

interface DocumentTypeSelectorProps {
  label: string;
  error?: string;
  className?: string;
  register: any; // React Hook Form register
  name: string; // Nombre del campo para el registro
}

export const documentTypes: string[] = [
  "PP",
  "RUC",
  "RG",
  "OTHER",
  "RC",
  "TI",
  "CC",
  "TE",
  "CE",
  "NIT",
  "DNI",
];

const DocumentTypeSelector = forwardRef<
  HTMLSelectElement,
  DocumentTypeSelectorProps
>(({ label, error, className = "", register, name }, ref) => {
  return (
    <div className={`modal-form__input modal-form__input--type ${className}`}>
      <label className="modal-form__label">{label}</label>
      <select
        ref={ref}
        {...register(name)}
        className={`modal-form__select ${error ? "modal-form__select--error" : ""}`}
      >
        <option value="">Select a document type</option>
        {documentTypes.map((doc) => (
          <option key={doc} value={doc}>
            {doc}
          </option>
        ))}
      </select>
      {error && <p className="modal-form__error">{error}</p>}
    </div>
  );
});

DocumentTypeSelector.displayName = "DocumentTypeSelector";

export default DocumentTypeSelector;
