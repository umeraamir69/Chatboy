import React, { useEffect, useState } from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import cookie from 'cookie';
import connectToDatabase from '../../../middlewear/db';
import mongoose from 'mongoose';

const VerifyRequest = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const storedData = sessionStorage.getItem("createAccountData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 sm:py-24">
      <div className="max-w-lg bg-white rounded-lg shadow-lg px-8 py-10 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Check Your Inbox</h2>
        <p className="mb-4 text-lg text-gray-600">
          We're glad to have you with us, <b>{data.fname}</b>! We've sent a verification link to your email address: 
          <span className="font-medium text-indigo-500"> {data.email}</span>.
        </p>
        <a 
          href="mailto:" 
          className="inline-block mt-6 w-full bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Check Your Email →
        </a>
      </div>
    </div>
  );
};

export default VerifyRequest;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const cookies = context.req.headers.cookie;
  const { email } = cookie.parse(cookies);

  if (!session && email) {
    await connectToDatabase();

    let VerificationToken;
    if (mongoose.models.verification_tokens) {
      VerificationToken = mongoose.model('verification_tokens');
    } else {
      VerificationToken = mongoose.model('verification_tokens', {});
    }

    const verificationTokens = await VerificationToken.find({ "identifier": email }).select('expires');

    if (verificationTokens) {
      return { props: {} };
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
