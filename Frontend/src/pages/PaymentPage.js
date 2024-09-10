import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import Pay from "../componets/pay";

const PaymentPage = () => {
  const { money } = useParams(); // Extract total price from URL parameter
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  
  const amount = money; // Use the total price from the URL
  const tx_ref = `${fname}-${Date.now()}`; // Create a transaction reference
  const public_key = "CHAPUBK_TEST-pLTfR50uI9cfU0vAcUTfCZuZmV92tvOn";

  return (
    <div id="shopeasy" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 py-10 px-5">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Complete Your Payment</h2>
        <p className="text-gray-600 text-center mb-8">Please fill in your details below to complete the payment.</p>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
          />
          <input
            type="email"cd 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
          />
         <p className="text-3xl font-bold text-blue-500">Total Price is {amount} ETB </p>

        </div>
        <div className="mt-8">
          <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
            <Pay fname={fname} lname={lname} tx_ref={tx_ref} public_key={public_key} email={email} amount={amount} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
