# 🤖 AI Voice Agent - Make Calls On Your Behalf

An AI-powered web application that can make phone calls on your behalf using natural voice synthesis and intelligent conversation handling.

## ✨ Features

- 📞 **Automated Phone Calls** - AI agent makes calls for you
- 🎙️ **Natural Voice** - Text-to-speech with multiple voice types
- 🧠 **Smart Conversations** - AI handles responses intelligently
- 📝 **Custom Scripts** - Write exactly what you want the AI to say
- 📊 **Call Tracking** - Monitor call status in real-time
- 🌐 **Web-Based** - No installation required, works in browser

## 🚀 How It Works

1. Enter the phone number you want to call
2. Write your message script
3. Choose voice type (friendly, professional, etc.)
4. Click "Make Call" and the AI handles the rest!

## 🛠️ Setup

### Prerequisites

You'll need accounts with:
- [Twilio](https://www.twilio.com/try-twilio) - For phone call infrastructure (free trial available)
- [OpenAI](https://platform.openai.com/) - For advanced AI features (optional)

### Environment Variables

Create a `.env.local` file with:

```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
OPENAI_API_KEY=your_openai_key (optional)
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 📦 Deployment

Deploy to Vercel:

```bash
vercel deploy --prod
```

Don't forget to set your environment variables in Vercel dashboard!

## 💡 Use Cases

- **Appointment Reminders** - Automatically remind clients of appointments
- **Follow-up Calls** - Check in with customers or leads
- **Information Delivery** - Share updates or announcements
- **Surveys** - Conduct automated phone surveys
- **Notifications** - Alert people about time-sensitive information

## 🔒 Privacy & Security

- All calls are logged and can be monitored
- No call data is stored permanently on our servers
- Twilio handles all phone infrastructure securely
- Your API keys are never exposed to the client

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs!

## 📝 License

MIT License - feel free to use this for any purpose.

## ⚠️ Important Notes

- Twilio charges apply for phone calls (free trial available)
- Ensure you have permission to call recipients
- Follow local regulations for automated calling
- Test thoroughly before production use

## 🆘 Support

For issues or questions:
- Check Twilio documentation for call issues
- Review API logs for debugging
- Ensure environment variables are set correctly

---

Made with ❤️ using Next.js, React, and Twilio
