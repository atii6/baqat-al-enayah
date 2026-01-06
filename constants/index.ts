export const USER_ROLES = {
  ADMINISTRATOR: "Administrator",
  CAREGIVER: "Caregiver",
  RECIPIENT: "Recipient",
} as const;

export const ALL_USERS = Object.values(USER_ROLES);
