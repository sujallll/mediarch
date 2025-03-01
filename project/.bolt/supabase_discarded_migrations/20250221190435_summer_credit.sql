/*
  # Fix duplicate policies

  1. Changes
    - Drop existing policies to clean up duplicates
    - Recreate policies with proper checks
    - Ensure admin access is maintained
*/

-- Drop existing policies to clean up duplicates
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contacts;
DROP POLICY IF EXISTS "Only admins can read contacts" ON contacts;
DROP POLICY IF EXISTS "Only admins can update contacts" ON contacts;

-- Recreate policies with proper checks
CREATE POLICY "Anyone can submit contact form"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.is_admin());

CREATE POLICY "Only admins can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (auth.is_admin())
  WITH CHECK (auth.is_admin());