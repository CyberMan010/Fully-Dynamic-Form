import { useState, useEffect } from "react";
import { validateForm, validateField } from "../helpers/validateForm";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "digitinary-ui";
import Input from "../input"; 
import "react-toastify/dist/ReactToastify.css";
import formConfig from "../config/config.json";

interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface FormData {
  [key: string]: string | number | boolean | undefined;
}

const DynamicForm: React.FC = () => {
  const [formFields] = useState<FormField[]>(formConfig);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validation = validateForm(formFields, formData as Record<string, string | number>);
    setErrors(validation);
    setIsFormValid(Object.keys(validation).length === 0);
  }, [formData, formFields]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    const field = formFields.find((f) => f.name === name);
    if (field) {
      const fieldError = validateField(field, type === "checkbox" ? String(checked) : value);

      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const allTouched = formFields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {});
    setTouched(allTouched);

    if (isFormValid) {
      console.log("Form is valid, submitting...");
      toast.dismiss();
      toast.success("Form submitted successfully!");
      console.log("Form submitted:", formData);
    } else {
      console.log("Form is invalid, showing error...");
      toast.dismiss();
      toast.error("Please fix the errors in the form");
    }
  };

  const getFieldClassName = (fieldName: string) => {
    const baseClass = "form-group";
    if (!touched[fieldName]) return baseClass;
    return `${baseClass} ${errors[fieldName] ? "invalid" : "valid"}`;
  };

  return (
    <>
      <form className="dynamic-form" onSubmit={handleSubmit} data-testid="dynamic-form">
        {formFields.map((field) => (
          <div className={getFieldClassName(field.name)} key={field.name}>
            <Input
              type={field.type}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              options={field.options}
              value={formData[field.name]?.toString() || ""}
              onChange={handleChange}
              onBlur={() => handleBlur(field.name)}
              error={touched[field.name] ? errors[field.name] : ""}
              />
          </div>
        ))}
        <Button type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default DynamicForm;
