-- Enable Row Level Security
ALTER TABLE business_cards ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to business cards
CREATE POLICY IF NOT EXISTS "Allow public access to business cards"
ON business_cards
FOR SELECT
TO public
USING (true);

-- Create policy for authenticated users to manage their own cards
CREATE POLICY IF NOT EXISTS "Allow users to manage their own cards"
ON business_cards
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id); 