/*
  # Create admin user

  1. Changes
    - Create admin user with email and password
    - Set admin flag for the user
*/

-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  is_admin,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'mediarch@admin.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  true,
  now(),
  now()
)
ON CONFLICT (email) DO NOTHING;

-- Ensure admin flag is set
UPDATE auth.users 
SET is_admin = true 
WHERE email = 'mediarch@admin.com';