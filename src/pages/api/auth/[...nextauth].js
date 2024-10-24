// [...nextauth].js
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/email"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../middlewear/dbAdap"
import sendEmail from '../../../../middlewear/mailer'

import { signIn } from 'next-auth/react';

import connectToDatabase from '../../../../middlewear/db';
import User from '../../../../model/User';

const db = await connectToDatabase()

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise ),
    providers: [    
      Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackUrl: process.env.NEXTAUTH_URL 
        }), 
        EmailProvider({
          from: process.env.EMAIL_FROM,
          server: {
              host: "smtp.gmail.com",
              port : 587,
              auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.node_pw,
              },
          },  
          from: "Devx@gmail.com",
          sendVerificationRequest: async (params) => {
              await sendVerificationEmail(params);
            },
      }),    
  ],
  database: process.env.mongodbURL,
  pages: {
    signIn: "/auth/login",
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/createaccount',
    error: '/auth/error'
  },
  callbacks: {
    async signIn( { user, account, profile, email, credentials }) {
      connectToDatabase()
      const isUser = await User.findOne({ email: user.email });
      if (isUser != null ) {
        if(!isUser.active) return false
      }
      return true;

      
    },
  },
}
export default NextAuth(authOptions)



async function sendVerificationEmail(params) {
    const { identifier, url, baseUrl, token, provider } = params;
    const text = `Please verify your email by clicking this link: ${url}` ;
    const html =
      `
        <!DOCTYPE html>
        <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Verification</title>
          </head>
          <body>
              <div style="font-family: Arial, sans-serif; text-align: center;">
                  <h1>Email Verification</h1>
                  <p>Please verify your email by clicking the button below:</p>
                  <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: #fff; text-decoration: none; border-radius: 4px;">Verify Email</a>
              </div>
          </body>
        </html>
      `
    await sendEmail(identifier, 'Email Verification', text , html );
  }

