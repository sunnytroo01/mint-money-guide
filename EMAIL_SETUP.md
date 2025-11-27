# Email Setup Guide for Contact Form

The contact form is now configured to send emails to **putyourfirstnamehere@gmail.com** using Gmail SMTP.

## 📧 How to Set Up Gmail App Password

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow the prompts to enable 2FA (required for app passwords)

### Step 2: Generate App Password
1. After enabling 2FA, go back to **Security**
2. Under "How you sign in to Google", click **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Type: **Mint Money Guide Blog**
6. Click **Generate**
7. Copy the 16-character password (remove spaces)

### Step 3: Update .env File
Open `.env` and replace:
```
EMAIL_PASSWORD=your-app-password-here
```

With your actual app password:
```
EMAIL_PASSWORD=abcd efgh ijkl mnop
```
(Note: You can include or exclude the spaces, both work)

### Step 4: Verify Email Address
Make sure the email in `.env` matches:
```
CONTACT_EMAIL=putyourfirstnamehere@gmail.com
EMAIL_USER=putyourfirstnamehere@gmail.com
```

**Replace "putyourfirstnamehere" with your actual Gmail username!**

## ✅ How It Works

When someone fills out the contact form:
1. ✅ Form data is saved to the database
2. ✅ Email is sent to **putyourfirstnamehere@gmail.com**
3. ✅ Email includes:
   - **Name** (who contacted you)
   - **Email** (their email - set as Reply-To)
   - **Subject** (what it's about)
   - **Message** (their message)
4. ✅ You can **reply directly** to the email to respond to them
5. ✅ Your email stays private (user only sees "from contact form")

## 📨 Email Format

You'll receive emails like this:

**Subject:** Contact Form: [Their Subject]

**Body:**
```
👤 Name: John Doe
✉️ Email: john@example.com
📋 Subject: Question about investing
💬 Message: Hey, I have a question about...
```

Click "Reply" and it will automatically reply to their email address!

## 🧪 Testing

1. Make sure `.env` is updated with your Gmail app password
2. Restart the server: `npm run dev`
3. Go to: http://localhost:7382/contact
4. Fill out the form with your own email
5. Submit and check your **putyourfirstnamehere@gmail.com** inbox

## 🔒 Security Notes

- ✅ Email password is in `.env` (not committed to git)
- ✅ Uses Gmail's secure SMTP
- ✅ Form has rate limiting to prevent spam
- ✅ User email is set as Reply-To (not From)
- ✅ All form data is validated

## ⚠️ Troubleshooting

**"Invalid login" error:**
- Make sure 2FA is enabled
- Generate a new app password
- Copy the password exactly (with or without spaces)

**Not receiving emails:**
- Check spam folder
- Verify EMAIL_USER and CONTACT_EMAIL are correct
- Make sure your Gmail isn't hitting sending limits
- Check server console for error messages

**Gmail sending limits:**
- Free Gmail: ~500 emails/day
- This should be plenty for a contact form!

## 🎯 What Happens on Form Submit

1. User fills form with their info
2. Frontend sends to `/api/contact`
3. Backend validates all fields are filled
4. Saves to MongoDB database
5. Sends formatted email to you
6. User sees success message
7. You get email with their message
8. You reply directly to their email address

Perfect! 🚀
