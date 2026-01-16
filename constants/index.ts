export const USER_ROLES = {
  ADMINISTRATOR: "Administrator",
  CAREGIVER: "Caregiver",
  RECIPIENT: "Recipient",
} as const;

export const ALL_USERS = Object.values(USER_ROLES);

export const REGISTRY_FOR = {
  MY_SELF: "myself",
  SOMEONE_ELSE: "someone_else",
} as const;

export const BLOG_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export const BUCKET_FOLDER_NAME = {
  STORY: "story",
  REGISTRY: "registry",
  BLOG: "blog",
  ARTICLE: "article",
  PRODUCTS: "products",
} as const;
