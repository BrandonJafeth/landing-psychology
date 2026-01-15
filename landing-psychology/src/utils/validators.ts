export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phonePattern = /^\+?[\d\s-]{7,}$/;

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (formData: Record<string, string>): ValidationResult => {
  const errors: Record<string, string> = {};
  
  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Por favor ingresa un nombre válido';
  }

  // Email validation
  if (!formData.email || !emailPattern.test(formData.email)) {
    errors.email = 'Por favor ingresa un email válido';
  }

  // Phone validation
  if (!formData.phone || !phonePattern.test(formData.phone)) {
    errors.phone = 'Por favor ingresa un número de teléfono válido';
  }

  // Message validation
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
