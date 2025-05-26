-- Add slug column to business_cards table
ALTER TABLE business_cards ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_business_cards_slug ON business_cards(slug);

-- Update existing cards with a slug if they don't have one
UPDATE business_cards
SET slug = CONCAT(LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]', '', 'g')), '-', SUBSTRING(MD5(id::text), 1, 6))
WHERE slug IS NULL; 