export type UserDetailsType = {
  id: number;
  user_id: number;
  creating_for?: "myself" | "someone_else";
  recipient_name?: string | null;
  recipient_email?: string | null;
  journey: string;
  street_address: string;
  address_line?: string | null;
  city: string;
  state: string;
  zip_code: string;
  limit_account_access: boolean;
  limit_others_adding_gifts: boolean;
  enable_contribution_alerts: boolean;
  terms_policy?: boolean | null;
  created_at?: string;
  updated_at?: string;
};
