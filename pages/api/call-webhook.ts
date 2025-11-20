import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Log the webhook data
  console.log('Call webhook received:', req.body)

  // You can store this in a database or send notifications
  const { CallSid, CallStatus, CallDuration, From, To } = req.body

  // Respond to Twilio
  res.status(200).send('OK')
}
