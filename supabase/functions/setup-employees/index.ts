import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.79.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const employees = [
      { email: 'awismen@vulntech.com', password: 'cso123', role: 'employee' },
      { email: 'bobbacker@vulntech.com', password: 'monkey55', role: 'employee' },
      { email: 'carolsmith@vulntech.com', password: 'htimslorac', role: 'employee' },
      { email: 'admin@vulntech.com', password: 'vulntech123', role: 'admin' },
    ]

    const results = []

    for (const employee of employees) {
      // Create auth user
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: employee.email,
        password: employee.password,
        email_confirm: true,
      })

      if (authError) {
        results.push({ email: employee.email, error: authError.message })
        continue
      }

      // Assign role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: employee.role,
        })

      if (roleError) {
        results.push({ email: employee.email, error: roleError.message })
      } else {
        results.push({ email: employee.email, success: true })
      }
    }

    return new Response(
      JSON.stringify({ message: 'Setup complete', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
