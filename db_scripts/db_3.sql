ALTER TABLE "gift_wells"
ADD COLUMN IF NOT EXISTS "organizer_name" VARCHAR(255);

ALTER TABLE "gift_wells"
ADD COLUMN IF NOT EXISTS "support_category" VARCHAR(255);

ALTER TABLE "gift_wells"
ADD COLUMN IF NOT EXISTS "family_photo" VARCHAR(255);
