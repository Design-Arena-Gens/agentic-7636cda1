import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { phoneNumber, message, voiceType, callPurpose } = req.body

  // Validate required fields
  if (!phoneNumber || !message || !callPurpose) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Check if Twilio credentials are configured
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    return res.status(500).json({
      error: 'Twilio credentials not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER environment variables.',
      needsSetup: true
    })
  }

  try {
    // Initialize Twilio client
    const twilio = require('twilio')
    const client = twilio(accountSid, authToken)

    // Create TwiML for the call
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna" language="en-US">${escapeXml(message)}</Say>
  <Pause length="2"/>
  <Say voice="Polly.Joanna" language="en-US">If you need to speak with someone, please call us back. Goodbye!</Say>
</Response>`

    // Make the call
    const call = await client.calls.create({
      to: phoneNumber,
      from: twilioPhoneNumber,
      twiml: twiml,
      statusCallback: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/call-webhook`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    })

    return res.status(200).json({
      success: true,
      callSid: call.sid,
      status: call.status,
      message: 'Call initiated successfully'
    })
  } catch (error: any) {
    console.error('Error making call:', error)
    return res.status(500).json({
      error: error.message || 'Failed to make call',
      details: error.toString()
    })
  }
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
