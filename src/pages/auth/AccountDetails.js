import React, {useEffect, useState} from 'react';
import {getServerSession} from "next-auth/next";
import {authOptions} from "../api/auth/[...nextauth]";
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
import User from '../../../model/User';






import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PCp70L2gPnd81nsV83fHyaHCMzHmg0T3BRerMe3nJgi75YabgsP74FxK0DajRUsXmUBzY8qSvFwNu8ahXhfEpHw00zimU1ZmZ');

const AccountDetails = ({ name, uemail }) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [formData, setFormData] = useState({
        email: uemail,
        name: name ? name : '',
        gender: '',
        active: true,
        joinDate: new Date().toISOString().slice(0, 10), // Format as yyyy-mm-dd
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check gender and contact
        if (formData.gender.length == 0) {
            return toast.error(`Enter Data Correctly`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
        }

        if (formData.whatsappContact.length < 9 || formData.whatsappContact.length > 15) {
            return toast.error(`Enter Correct Contact Number.`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
        }

        if (!stripe || !elements) {
            return;
        }

        // Get the card details from the Stripe element
        const cardElement = elements.getElement(CardElement);

        try {
            const { paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            const response = await fetch('/api/payment/createCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    paymentMethodId: paymentMethod.id,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.info(`Your Account is sent for Verification ${result.customer.name}`, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                router.push('/');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.log(error);
            return toast.error('An Error Occurred', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2>{uemail}</h2>
                    <form className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6" onSubmit={handleSubmit}>
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="md:col-span-2 lg:col-span-3">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="h-10 border mt-1 rounded capitalize px-4 w-full bg-gray-50"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                  
                                    <div className="md:col-span-2">
                                        <label htmlFor="whatsappContact">WhatsApp Contact</label>
                                        <input
                                            type="number"
                                            name="whatsappContact"
                                            id="whatsappContact"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={formData.whatsappContact}
                                            onChange={handleChange}
                                            required
                                            placeholder="+123445678"
                                        />
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="gender">Gender</label>
                                        <select
                                            name="gender"
                                            id="gender"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Card Details */}
                                    <div className="md:col-span-3 lg:col-span-3">
                                        <label>Card Details</label>
                                        <CardElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                            color: '#aab7c4',
                                                        },
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    disabled={!stripe}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const StripeWrapper = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <AccountDetails {...props} />
        </Elements>
    );
};

export default StripeWrapper;




export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: "/"
            }
        };
    }

    const user = await User.findOne({"email": session.user.email})
    if (!user.email || !user.name   || !user.gender || !user.joinDate) {
        return {
            props: {
                "name": session.user.name != null
                    ? session.user.name
                    : "",
                "uemail": session.user.email
            }
        };
      } 
      else {
        return { redirect: { destination: "/" } }; //profile
      }

   
}
