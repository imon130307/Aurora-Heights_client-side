
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({subscriptionsFee,badge}) => {
    const {user}=useAuth()
    const navigate=useNavigate()
    const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    const [transactionId, setTransactionId] = useState('');
    // ----stripe Hooks-----
    const stripe = useStripe();
    const elements = useElements();
    // const subscriptionsFee=50;
    const [error,setError]=useState('')
    const [clientSecret,setClientSecret]=useState('')
    // ---handle pay button---
    const [proccessing,setProccessing]=useState(false)

         // !------Create paymentIntent requst for getting clientSecret which is used for payment procedure------
        useEffect(()=>{
        if(subscriptionsFee >0){
            axiosSecure.post('/create-payment-intent',{subscriptionsFee:subscriptionsFee})
            .then((res)=>{
                console.log(res?.data)
                setClientSecret(res?.data?.clientSecret)
            })
        }
        },[axiosSecure,subscriptionsFee])
        console.log("This clientSecret is gotten from serverSide==>>",clientSecret)


        const handleSubmit = async (event) => {
            setProccessing(true);
            // Block native form submission.
            event.preventDefault();
        
            if (!stripe || !elements) {
                setProccessing(false)
                // Stripe.js has not loaded yet. Make sure to disable
                // form submission until Stripe.js has loaded.
                return;
            }
        
            // Get a reference to a mounted CardElement. Elements knows how
            // to find your CardElement because there can only ever be one of
            // each type of element.
            const card = elements.getElement(CardElement);
            if (card == null) {
                setProccessing(false)
                return;
            }
        
            // ----Use your card Element with other Stripe.js APIs---
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (error) {
                console.log('Payment error===>>>>', error);
                setProccessing(false)
                setError(error.message)
            } else {
                console.log('Payment Method===>>>>', paymentMethod);
                setProccessing(false)
                setError('')
            }

            // !-----confirm payment procedure -------
            const data = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            })
            console.log("Confirm payment data==>>",data)

            const { paymentIntent, error: confirmError }=data;
            console.log("paymentIntent Info==>>",paymentIntent)
            console.log("confirmError Info==>>",confirmError)

            if (confirmError) {
                console.log("paymentConfirm Error Info==>>",confirmError)
            }

            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction id===>>>>>', paymentIntent?.id);
                setTransactionId(paymentIntent?.id);

                //*-----now save the paymentInfo in the DB-----
                const subscriptionsInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    subscriptionsFee: subscriptionsFee,
                    transactionId: paymentIntent?.id,
                    // date: new Date(), //---- utc date convert. use moment js to ---
                    date: Date.now(),
                    subscriptions_status:"paid",
                }
                console.log("subscriptions Info==>>",subscriptionsInfo)

                // !----create post request for subscriptionsInfo in DB-------
                const res = await axiosSecure.post('/subscriptions-info', subscriptionsInfo);
                console.log('paymentInfo saved in DB==>>', res?.data);

                // TODO---create badgeChange request in userCollection in DB----- 
                const badgeRes = await axiosSecure.patch(`/badge-change/${user?.email}`, {badge});
                console.log("Now your badge is ==>>",badgeRes.data)

                if (res.data?.subscriptionsInfoResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for Subscription",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // navigate('/')
                }
                setProccessing(false)
            }
        };

    return (
            <form onSubmit={handleSubmit}>
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
                <button className='btn btn-outline btn-success w-28' type="submit" disabled={!stripe || !clientSecret || proccessing }>
                    Pay
                </button>
                {/*//! ----showing error------- */}
                <p className='text-red-600'>{error}</p>
                {transactionId && <p className='text-green-400'>Your transactionId id is : {transactionId}</p>}
            </form>
    );
};

export default CheckoutForm;