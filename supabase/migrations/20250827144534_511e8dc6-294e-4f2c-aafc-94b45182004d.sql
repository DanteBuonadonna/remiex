-- Update all existing users to confirmed status so they can sign in
-- This is needed because users created while email confirmation was enabled
-- are stuck in unconfirmed state and cannot sign in
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, created_at)
WHERE email_confirmed_at IS NULL;