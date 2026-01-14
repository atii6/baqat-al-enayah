export type UserType = {
  id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  email: string;
  password?: string;
  registry_public_url: string;
  profile_image_url?: string;
  is_deleted?: boolean;
  is_stripe_linked?: boolean;
  stripe_account_id?: string;
  created_at?: string;
  updated_at?: string;
  isPersonalDetailsCompleted?: boolean;
  isRegistrySetupCompleted?: boolean;
  isRegistryPublished?: boolean;
};

export type ExtendedUserType = UserType & {
  creating_for?: "myself" | "someone_else";
  recipient_email?: string;
  recipient_first_name?: string;
  recipient_last_name?: string;
};
