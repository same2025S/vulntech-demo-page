-- Allow public users to submit bookings (anyone can book a risk check)
DROP POLICY IF EXISTS "Employees and admins can insert bookings" ON public.bookings;

CREATE POLICY "Anyone can insert bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Keep the select policy restricted to employees and admins only
-- (This policy already exists, just documenting it here for clarity)