import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function addToSupabaseWaitlist(payload: {
  name: string
  companyName: string
  email: string
  phone: string
}) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseTable = process.env.SUPABASE_WAITLIST_TABLE || 'waitlist'

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return { skipped: true }
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${supabaseTable}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: payload.name,
      company_name: payload.companyName,
      email: payload.email,
      phone: payload.phone,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Supabase waitlist insert failed: ${errorText}`)
  }

  return { skipped: false }
}

export async function POST(request: NextRequest) {
  try {
    const { name, companyName, email, phone } = await request.json()

    if (!name || !companyName || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const [supabaseResult, resendResult] = await Promise.all([
      addToSupabaseWaitlist({ name, companyName, email, phone }),
      resend.emails.send({
        from: 'Kayzo Waitlist <onboarding@resend.dev>',
        to: [process.env.COMPANY_EMAIL || 'your-email@company.com'],
        replyTo: email,
        subject: `New Kayzo waitlist signup from ${name}`,
        html: `
          <h2>New Kayzo Waitlist Signup</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        `,
      }),
    ])

    if (resendResult.error) {
      console.error('Resend error:', resendResult.error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: resendResult.data,
      supabase: supabaseResult,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


