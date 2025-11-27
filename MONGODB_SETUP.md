# MongoDB Atlas Setup (2 Minutes)

## Quick Setup

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for free account
3. **Create a FREE cluster** (M0 - Free tier)
4. **Create Database User:**
   - Username: `wealthprompter`
   - Password: (generate strong password)
5. **Whitelist IP:** Add `0.0.0.0/0` (allow from anywhere) for development
6. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Update .env File

Replace the MONGODB_URI in your `.env` file:

```env
MONGODB_URI=mongodb+srv://wealthprompter:<password>@cluster0.xxxxx.mongodb.net/wealthprompter?retryWrites=true&w=majority
```

## Seed Database

```bash
npm run seed
```

## Done!

Restart the server and visit http://localhost:7382

The blog will now have all the posts loaded!
