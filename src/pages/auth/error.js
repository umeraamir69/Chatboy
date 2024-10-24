import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { toast } from 'react-toastify';


export default function Error() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (router.query.error) {
      setErrorMessage(router.query.error)
      toast.info(router.query.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    });

    }
  }, [router.query.error])

  return (


    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            An error occurred
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
  
    if (session) {
      return { redirect: { destination: "/" } };
    }

    return {
      props: {},
    };
  }
  