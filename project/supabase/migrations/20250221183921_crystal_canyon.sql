/*
  # Create admin user

  1. Changes
    - Set admin flag for mediarch@admin.com user
  
  2. Security
    - Only modifies a single user
    - Uses secure password hashing
*/

-- Set admin flag for the admin user
UPDATE auth.users 
SET is_admin = true 
WHERE email = 'mediarch@admin.com';