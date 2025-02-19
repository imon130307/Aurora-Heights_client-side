import { useParams } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../Form/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLIC_KEY)

const Checkout = () => {
    const {package_name}= useParams(); 
    console.log(package_name)
    let subscriptionsFee='';
    let badge='';
    if(package_name==='silver-package'){
        subscriptionsFee=100;
        badge='Silver';
    }
    if(package_name==='gold-package'){
        subscriptionsFee=150;
        badge="Gold";
    }
    if(package_name==='platinum-package'){
        subscriptionsFee=200;
        badge="Platinum";
    }

    return (
        <div>
            {
                package_name==='silver-package' && 
                <>
                    <div className="flex flex-col justify-center items-center py-8 gap-4">
                        <h2 className="font-extrabold text-5xl text-green-300">Welcome to Silver Package</h2>
                        <div>
                            <h2>A budget-friendly option with essential offerings.</h2>
                            <ul className="list-inside list-disc pl-8">
                                <li>2 Appetizers</li>
                                <li>1 Main Course (Veg/Non-Veg)</li>
                                <li>1 Side Dish (e.g., rice or bread)</li>
                                <li>Disposable cutlery and plates.</li>
                                <li>Self-service buffet setup.</li>
                                <li>Standard options like water, juice, or soft drinks.</li>
                            </ul>
                        </div>
                        <p>To receive this membership package, You have to pay <span className="text-green-500 font-semibold">$ 100</span> to get <span className="text-red-500 font-semibold">-9 %</span> discount over all kinds of our serving food.</p>
                    </div>
                </>
            }
            {
                package_name==='gold-package' && 
                <>
                    <div className="flex flex-col justify-center items-center py-8 gap-4">
                        <h2 className="font-extrabold text-5xl text-green-300">Welcome to  Gold Package</h2>
                        <div>
                            <h2>A budget-friendly option with essential offerings.</h2>
                            <ul className="list-inside list-disc pl-8">
                                <li>2 Appetizers</li>
                                <li>1 Main Course (Veg/Non-Veg)</li>
                                <li>1 Side Dish (e.g., rice or bread)</li>
                                <li>Disposable cutlery and plates.</li>
                                <li>Self-service buffet setup.</li>
                                <li>Standard options like water, juice, or soft drinks.</li>
                            </ul>
                        </div>
                        <p>To receive this membership package, You have to pay <span className="text-green-500 font-semibold">$ 150</span> to get <span className="text-red-500 font-semibold">-21 %</span> discount over all kinds of our serving food.</p>
                    </div>
                </>
            }
            {
                package_name==='platinum-package' && 
                <>
                    <div className="flex flex-col justify-center items-center py-8 gap-4">
                        <h2 className="font-extrabold text-5xl text-green-300">Welcome to  Platinum Package</h2>
                        <div>
                            <h2>A budget-friendly option with essential offerings.</h2>
                            <ul className="list-inside list-disc pl-8">
                                <li>2 Appetizers</li>
                                <li>1 Main Course (Veg/Non-Veg)</li>
                                <li>1 Side Dish (e.g., rice or bread)</li>
                                <li>Disposable cutlery and plates.</li>
                                <li>Self-service buffet setup.</li>
                                <li>Standard options like water, juice, or soft drinks.</li>
                            </ul>
                        </div>
                        <p>To receive this membership package, You have to pay <span className="text-green-500 font-semibold">$ 200</span> to get <span className="text-red-500 font-semibold">-37 %</span> discount over all kinds of our serving food.</p>
                    </div>
                </>
            }


            {/*//! -----------Stripe Banking process start------------- */}
            {/* ----Check out Form-------*/}
            <div className="w-[500px] mx-auto border border-green-500 mb-8 rounded-lg">
                <Elements stripe={stripePromise} >
                    <CheckoutForm  subscriptionsFee={subscriptionsFee} badge={badge}/>
                </Elements>
            </div>

        </div>
    );
};

export default Checkout;