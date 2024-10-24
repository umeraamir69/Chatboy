import React, { useEffect, useState } from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { toast } from 'react-toastify';
import User from '../../../model/User';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Stripe public key
const stripePromise = loadStripe('pk_test_51PCp70L2gPnd81nsV83fHyaHCMzHmg0T3BRerMe3nJgi75YabgsP74FxK0DajRUsXmUBzY8qSvFwNu8ahXhfEpHw00zimU1ZmZ');

const AccountDetails = ({ name, uemail }) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [formData, setFormData] = useState({
        email: uemail, // Pre-filled email
        name: name || '',
        contact: '',
        gender: '',
        dateOfBirth: '',
        active: true,
        joinDate: new Date().toISOString().slice(0, 10), // Format as yyyy-mm-dd
    });


    useEffect(() => {
        const cookieData = Cookies.get('formData');
        if (cookieData) {
           console.log(cookieData)
        }
    }, []);

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.gender.length === 0 || formData.contact.length < 9 || formData.contact.length > 15) {
            return toast.error('Please enter valid data.', {
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
                toast.info(`Your account is sent for verification, ${result.customer.name}`, {
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
            console.error(error);
            return toast.error('An error occurred', {
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
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            readOnly
                                            className="h-10 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded px-4 w-full bg-gray-50 text-gray-900 dark:text-gray-300"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="h-10 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded px-4 w-full bg-gray-50 text-gray-900 dark:text-gray-300"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="contact" className="block text-sm font-medium">Contact Number</label>
                                        <input
                                            type="text"
                                            name="contact"
                                            id="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            required
                                            placeholder="+1234567890"
                                            className="h-10 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded px-4 w-full bg-gray-50 text-gray-900 dark:text-gray-300"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                                        <select
                                            name="gender"
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="h-10 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded px-4 w-full bg-gray-50 text-gray-900 dark:text-gray-300"
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-1">
                                        <label htmlFor="dateOfBirth" className="block text-sm font-medium">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            id="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            required
                                            className="h-10 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded px-4 w-full bg-gray-50 text-gray-900 dark:text-gray-300"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium">Card Details</label>
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
                                            className="p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                type="submit"
                                className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={!stripe}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Stripe wrapper to use Elements
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

    const user = await User.findOne({"email": session.user.email});
    if (!user.email || !user.name || !user.gender || !user.joinDate) {
        return {
            props: {
                "name": session.user.name || "",
                "uemail": session.user.email
            }
        };
    } else {
        return { redirect: { destination: "/" } };
    }
}
