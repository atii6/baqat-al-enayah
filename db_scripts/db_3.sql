ALTER TABLE "gift_wells"
ADD COLUMN IF NOT EXISTS "organizer_name" VARCHAR(255);

ALTER TABLE "gift_wells"
ADD COLUMN IF NOT EXISTS "support_category" VARCHAR(255);

ALTER TABLE "gift_wells"
ADD COLUMN IF NOT EXISTS "family_photo" VARCHAR(255);

ALTER TABLE "user_details"
ADD COLUMN IF NOT EXISTS "recipient_first_name" VARCHAR(255);

ALTER TABLE "user_details"
ADD COLUMN IF NOT EXISTS "recipient_last_name" VARCHAR(255);

ALTER TABLE "user_details"
ADD COLUMN IF NOT EXISTS "recipient_email" VARCHAR(255);

