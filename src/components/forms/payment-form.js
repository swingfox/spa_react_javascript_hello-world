import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios"
import { React, useState } from 'react'
import AppUrl from "../../config/endpoint-config"
import { useAuth0 } from "@auth0/auth0-react";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {color: "#fce883"},
            "::placeholder": {color: "#87bbfd"}
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth0();

    const handleSubmit = async(e) => {
        e.preventDefault()
        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    
    if (!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post(AppUrl.paymentUrl, {
                amount: 19.00,
                currency: "USD",
                receiptEmail: user.email, 
                id
            })

            if (response.status === 200) {
                console.log("Successful payment")
                setSuccess(true)
            }
        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <div>
            <>
            {!success ?
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow"> 
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button className="button-purchase">Pay</button>
            </form>
            :
            <div>
                <h2 style={{color: 'white'}}>You just subscribed to one of our products this is the best decision of your life.</h2>
            </div>
            }
            </>
        </div>
    )
}