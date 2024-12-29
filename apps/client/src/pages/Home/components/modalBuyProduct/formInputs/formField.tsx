import React, { forwardRef } from "react";

interface BaseProps {
  label: string;
  error?: string;
  className?: string;
}

interface InputProps
  extends BaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  as: "input";
}

interface SelectProps
  extends BaseProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  as: "select";
}

type FormFieldProps = InputProps | SelectProps;

const FormField = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  FormFieldProps
>(({ label, error, as, className = "", children, ...props }, ref) => {
  return (
    <div className={className}>
      <label>{label}</label>
      {as === "input" ? (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      ) : (
        <select
          ref={ref as React.Ref<HTMLSelectElement>}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
      )}
      {error && <p>{error}</p>}
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;
