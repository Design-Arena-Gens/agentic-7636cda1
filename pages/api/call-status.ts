import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { callSid } = req.query

  if (!callSid || typeof callSid !== 'string') {
    return res.status(400).json({ error: 'Missing call SID' })
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!accountSid || !authToken) {
    return res.status(500).json({
      error: 'Twilio credentials not configured'
    })
  }

  try {
    const twilio = require('twilio')
    const client = twilio(accountSid, authToken)

    const call = await client.calls(callSid).fetch()

    return res.status(200).json({
      status: call.status,
      duration: call.duration,
      direction: call.direction,
      from: call.from,
      to: call.to,
      startTime: call.startTime,
      endTime: call.endTime,
    })
  } catch (error: any) {
    console.error('Error fetching call status:', error)
    return res.status(500).json({
      error: error.message || 'Failed to fetch call status'
    })
  }
}
