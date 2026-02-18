import axios from "axios";
import React, {useState} from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {

    const [isUserPremium, setIsUserPremium] = useState(false);

   const verifyPremiumUser = async (response) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/premium/verify`,
        { withCredentials: true },
      );
      
      if(res.data.isPremium){
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Payment verification failed. Please contact support.");
    }
  };
    


  const handleBuyClick = async (type) => {
    const order = await axios.post(
      `${BASE_URL}/payment/create`,
      { membershipType: type },
      { withCredentials: true },
    );

    // Now, once orderId is generated, it should open the pop to accept the payment

    const {amount, keyId, currency, notes, orderId} = order.data;

    var options = {
    key: keyId,
    amount,
    currency,
    name: "Dev Tinder",
    description: "Premium Membership",
    order_id: orderId,
    prefill: {
        name: notes.firstName,
        email: notes.emailId,
    },
    theme: {
        color: "#f37254",
    },
    handler: verifyPremiumUser
  };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };
  return (
    <div className="m-10">
      {isUserPremium ? (<div className="text-2xl font-bold text-green-500">Congratulations! you are now premium user</div>) : (
        <>
        <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("silver")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleBuyClick("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default Premium;
