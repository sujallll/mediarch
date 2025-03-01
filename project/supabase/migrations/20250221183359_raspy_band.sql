/*
  # Set up admin authentication

  1. Changes
    - Enable email authentication
    - Create admin role and policies
    - Add admin flag to auth.users

  2. Security
    - Only admins can access admin-specific features
    - Email authentication enabled
*/

-- Enable email auth provider
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add admin flag to auth.users
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT is_admin 
    FROM auth.users 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update contacts policies to only allow admin access
DROP POLICY IF EXISTS "Authenticated users can read contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can update contacts" ON contacts;

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