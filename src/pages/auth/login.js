import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import {FiLogIn} from 'react-icons/fi'
import React, { useState } from "react";
import { toast } from 'react-toastify';
import User from "../../../model/User";
import { useEffect } from "react";

export default function Login({ providers }) {

    useEffect(() => {
        setproviderval(Object.values(providers))
    }, [providers])

  const [providerval, setproviderval] = useState()
  const [data, setdata] = useState({email : "" })


  const handleSignIn = async (event) => {
      event.preventDefault();
      try {
          // Pass the 'email' and other data fields to the email provider
          toast.info("Email Send", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
          });

          await signIn('email', { email: data.email });
          sessionStorage.setItem('createAccountData', JSON.stringify(data) );
          let date = new Date();
          date.setTime(date.getTime() + (120*1000)); 
          let expires = "; expires=" + date.toUTCString();
          document.cookie = `email=${data.email}; path=/` + expires;
          // Clear the form input fields after successful sign-in
          setdata({email: '' });
          // toast


        } catch (error) {
             toast.error(error, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
          });
          // Handle any sign-in errors, display a message, or perform other actions as needed
        }
      }

    const handleChange = (e) => {
      setdata({ ...data,[ e.target.name] : e.target.value });
    };
    
  return (
<div class="min-h-screen bg-gray-900 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 rounded-xl" >
            <div>
                {/* <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                    class="w-32 mx-auto" /> */}
            </div>
            <div class="mt-12 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Welcome to ChatBoy
                </h1>
                <div class="w-full flex-1 mt-8">
                    <div class="flex flex-col items-center">
                        <button onClick={() => signIn(providerval[0].id)}
                            class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div class="bg-white p-2 rounded-full">
                                <svg class="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span class="ml-4">
                                Log in with Google
                            </span>
                        </button>


                    </div>

                    <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or log in with e-mail
                        </div>
                    </div>

                    <form onSubmit={handleSignIn} class="mx-auto max-w-xs">
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" required placeholder="Email" name="email" value={data.email} onChange={handleChange} />
                        

                        <button
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                           <FiLogIn className="w-6 h-6" />
                            <span class="ml-3">
                                Log in
                            </span>
                        </button>
                        <p class="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by chat&lsquo;s
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
               >
            </div>
        </div>
    </div>
</div>
  );
}


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const user = await User.findOne({"email": session.user.email})
    if (!user.email || !user.name  || !user.role || !user.whatsappContact || !user.gender || !user.country || !user.currency || !user.joinDate) {
        return { redirect: { destination: "/auth/AccountDetails" } };
      } else {
        return { redirect: { destination: "/" } };
      }
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ? providers : [] },
  };
}