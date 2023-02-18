import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './payment-form';

const PUBLIC_KEY = 'pk_test_51McOv2CTfbfypwYBjMDLi8zXPQkzWzxXd7xmyW9lOeytEEaD64jeC37VeScojzcELvY1Sd7pxFYSeGe1UkwoJfgo002nMTEeL2'
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    )
}