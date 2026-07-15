export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
  /** Honeypot field: must stay empty. Bots tend to fill every input. */
  website: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Merci d'indiquer votre nom complet.";
  }

  if (!values.email.trim()) {
    errors.email = "L'adresse email est requise.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Merci de saisir une adresse email valide.";
  }

  if (!values.service) {
    errors.service = "Merci de sélectionner un service.";
  }

  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = "Décrivez votre projet en quelques mots (20 caractères minimum).";
  } else if (values.message.length > 4000) {
    errors.message = "Votre message est trop long (4000 caractères maximum).";
  }

  if (!values.consent) {
    errors.consent = "Vous devez accepter la politique de confidentialité pour continuer.";
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
