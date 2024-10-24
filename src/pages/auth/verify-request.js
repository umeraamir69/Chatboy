import React, { useEffect, useState } from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
var cookie = require('cookie');
import connectToDatabase from '../../../middlewear/db';
import mongoose from 'mongoose';


const VerifyRequest = () => {
  const [data, setdata] = useState({})

  useEffect(() => {
    const datajosn = sessionStorage.getItem("createAccountData")
    if(datajosn){
      setdata(JSON.parse(datajosn))
    }
  }, [])
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
    <div className="max-w-xl px-5 text-center">
      <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Check your inbox</h2>
      <p className="mb-2 text-lg text-zinc-500">We are glad <b>{data.fname}</b>, that you’re with us ? We’ve sent you a verification link to the email address <span className="font-medium text-indigo-500">{data.email}</span>.</p>
      <a href="mailto:" className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Check your mail →</a>
    </div>
  </div>
  )
}

export default VerifyRequest




export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const cookies = context.req.headers.cookie;
  const { email } = cookie.parse(cookies);
  if(session == null && email ){
    connectToDatabase()
    let VerificationToken;
    if (mongoose.models.verification_tokens) {
      VerificationToken = mongoose.model('verification_tokens');
    } else {
      VerificationToken = mongoose.model('verification_tokens', {});
    }
    const verificationTokens = await VerificationToken.find({"identifier": email} ).select('expires');
    if(verificationTokens){
      return {props: {}}
    }
  }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
}

