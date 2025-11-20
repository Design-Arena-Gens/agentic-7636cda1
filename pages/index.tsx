import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [voiceType, setVoiceType] = useState('friendly')
  const [callPurpose, setCallPurpose] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [callSid, setCallSid] = useState('')

  const handleMakeCall = async () => {
    if (!phoneNumber || !message || !callPurpose) {
      setStatus('Please fill in all required fields')
      return
    }

    setLoading(true)
    setStatus('Initiating call...')

    try {
      const response = await fetch('/api/make-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          message,
          voiceType,
          callPurpose
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus(`Call initiated successfully! Call SID: ${data.callSid}`)
        setCallSid(data.callSid)
      } else {
        setStatus(`Error: ${data.error}`)
      }
    } catch (error) {
      setStatus('Error making call. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const checkCallStatus = async () => {
    if (!callSid) return

    try {
      const response = await fetch(`/api/call-status?callSid=${callSid}`)
      const data = await response.json()

      if (response.ok) {
        setStatus(`Call Status: ${data.status} - Duration: ${data.duration || 0}s`)
      }
    } catch (error) {
      setStatus('Error checking call status')
    }
  }

  return (
    <>
      <Head>
        <title>AI Voice Agent - Make Calls On Your Behalf</title>
        <meta name="description" content="AI-powered voice agent that can make phone calls on your behalf" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>🤖 AI Voice Agent</h1>
            <p style={styles.subtitle}>Your personal AI assistant that makes calls on your behalf</p>
          </div>

          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>📞 How It Works</h3>
            <ol style={styles.infoList}>
              <li>Enter the phone number you want to call</li>
              <li>Describe what you want the AI to say</li>
              <li>Set the call purpose and voice type</li>
              <li>The AI agent will make the call for you!</li>
            </ol>
          </div>

          <div style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number *</label>
              <input
                type="tel"
                style={styles.input}
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Call Purpose *</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Appointment reminder, Follow-up, Information request"
                value={callPurpose}
                onChange={(e) => setCallPurpose(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Voice Type</label>
              <select
                style={styles.input}
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
              >
                <option value="friendly">Friendly & Casual</option>
                <option value="professional">Professional & Formal</option>
                <option value="enthusiastic">Enthusiastic & Energetic</option>
                <option value="calm">Calm & Soothing</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Message Script *</label>
              <textarea
                style={styles.textarea}
                placeholder="Type what you want the AI to say during the call..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
            </div>

            <button
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
              onClick={handleMakeCall}
              disabled={loading}
            >
              {loading ? '📞 Calling...' : '🚀 Make Call'}
            </button>

            {callSid && (
              <button
                style={styles.buttonSecondary}
                onClick={checkCallStatus}
              >
                📊 Check Call Status
              </button>
            )}

            {status && (
              <div style={{
                ...styles.status,
                ...(status.includes('Error') ? styles.statusError : styles.statusSuccess),
              }}>
                {status}
              </div>
            )}
          </div>

          <div style={styles.setupBox}>
            <h3 style={styles.setupTitle}>⚙️ Setup Required</h3>
            <p style={styles.setupText}>
              To enable phone calls, you need to configure the following environment variables:
            </p>
            <ul style={styles.setupList}>
              <li><strong>TWILIO_ACCOUNT_SID</strong> - Your Twilio Account SID</li>
              <li><strong>TWILIO_AUTH_TOKEN</strong> - Your Twilio Auth Token</li>
              <li><strong>TWILIO_PHONE_NUMBER</strong> - Your Twilio phone number</li>
              <li><strong>OPENAI_API_KEY</strong> - OpenAI API key for voice generation</li>
            </ul>
            <p style={styles.setupNote}>
              Get started with Twilio: <a href="https://www.twilio.com/try-twilio" target="_blank" style={styles.link}>Sign up for free trial</a>
            </p>
          </div>

          <div style={styles.features}>
            <h3 style={styles.featuresTitle}>✨ Features</h3>
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🎙️</div>
                <h4>Natural Voice</h4>
                <p>AI-powered natural speech synthesis</p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🧠</div>
                <h4>Smart Responses</h4>
                <p>Handles conversations intelligently</p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📝</div>
                <h4>Custom Scripts</h4>
                <p>Personalize every message</p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📊</div>
                <h4>Call Tracking</h4>
                <p>Monitor call status in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#f0f7ff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    borderLeft: '4px solid #667eea',
  },
  infoTitle: {
    fontSize: '1.2rem',
    color: '#667eea',
    marginBottom: '12px',
  },
  infoList: {
    paddingLeft: '20px',
    color: '#444',
    lineHeight: '1.8',
  },
  form: {
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginBottom: '12px',
  },
  buttonDisabled: {
    backgroundColor: '#999',
    cursor: 'not-allowed',
  },
  buttonSecondary: {
    width: '100%',
    padding: '14px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#667eea',
    backgroundColor: 'white',
    border: '2px solid #667eea',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginBottom: '12px',
  },
  status: {
    padding: '16px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    marginTop: '16px',
  },
  statusSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  statusError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  setupBox: {
    backgroundColor: '#fff3cd',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    borderLeft: '4px solid #ffc107',
  },
  setupTitle: {
    fontSize: '1.2rem',
    color: '#856404',
    marginBottom: '12px',
  },
  setupText: {
    color: '#856404',
    marginBottom: '12px',
    lineHeight: '1.6',
  },
  setupList: {
    paddingLeft: '20px',
    color: '#856404',
    lineHeight: '1.8',
    marginBottom: '12px',
  },
  setupNote: {
    color: '#856404',
    fontSize: '0.9rem',
  },
  link: {
    color: '#667eea',
    textDecoration: 'underline',
  },
  features: {
    marginTop: '30px',
  },
  featuresTitle: {
    fontSize: '1.5rem',
    color: '#1a1a1a',
    marginBottom: '20px',
    textAlign: 'center',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
  },
  featureCard: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
}
