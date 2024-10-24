import Stripe from 'stripe';
import User from '../../../../model/User';
import mongoose from 'mongoose';
import connectToDatabase from '../../../../middlewear/db';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51PCp70L2gPnd81nshsgXTrzqsnFQG9KXrzEje0yrYLpVp7blv7zb5WwGNxT8LORmdp6KRrSMHE4RIPcXvFsXZfcz00PCscpn6H');

export default async function handler(req, res) {
    connectToDatabase()
    if (req.method === 'POST') {
        try {
            const { email, name, gender , paymentMethodId , dateOfBirth } = req.body;

            // Create a new Stripe customer
            const customer = await stripe.customers.create({
                email,
                name,
                payment_method: paymentMethodId,
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });


            // Update the user with stripeID and cardDetail set to true
            const updatedUser = await User.findOneAndUpdate(
                { email: email }, { 
                    name : name,
                    stripeID: customer.id, 
                    cardDetail: true ,
                    active : true,
                    gender : gender , 
                    role: 'customer',
                    dateOfBirth : dateOfBirth
                }, { new: true } // Return the updated document
            );

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ customer, updatedUser });
        } catch (error) {
            console.log('Error:', error);
            res.status(400).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
