export type EmailProvider = {
  id: 'gmail' | 'outlook';
  name: string;
  icon: string;
}

export type EmailConfig = {
  email: string;
  password: string;
  appPassword: string;
  host: EmailProvider['id'] | '';
}
