-- Add comprehensive RLS policies for the secrets table
-- These policies ensure only the service_role can perform any operations on secrets

-- Policy for INSERT operations - only service_role can insert secrets
CREATE POLICY "service_role_only_insert" 
ON public.secrets 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Policy for UPDATE operations - only service_role can update secrets  
CREATE POLICY "service_role_only_update" 
ON public.secrets 
FOR UPDATE 
TO service_role
USING (true)
WITH CHECK (true);

-- Policy for DELETE operations - only service_role can delete secrets
CREATE POLICY "service_role_only_delete" 
ON public.secrets 
FOR DELETE 
TO service_role
USING (true);