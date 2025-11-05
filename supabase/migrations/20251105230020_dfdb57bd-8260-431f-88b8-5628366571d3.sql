-- Create role enum
CREATE TYPE public.app_role AS ENUM ('employee', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  company_address TEXT NOT NULL,
  credit_card TEXT NOT NULL,
  ip_range TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create employee_credentials table (for admin view)
CREATE TABLE public.employee_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  display_password TEXT NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on employee_credentials
ALTER TABLE public.employee_credentials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings - only employees and admins can view
CREATE POLICY "Employees and admins can view bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'employee') OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Employees and admins can insert bookings"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'employee') OR 
  public.has_role(auth.uid(), 'admin')
);

-- RLS Policies for employee_credentials - only admins can view
CREATE POLICY "Only admins can view credentials"
ON public.employee_credentials
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles - users can view their own role
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Insert the display credentials
INSERT INTO public.employee_credentials (username, display_password, role) VALUES
  ('awismen', 'cso123', 'employee'),
  ('bobbacker', 'monkey55', 'employee'),
  ('carolsmith', 'htimslorac', 'employee'),
  ('admin', 'vulntech123', 'admin');