import React from 'react';

const Pay = ({ fname, lname, email, amount, public_key, tx_ref }) => {
  return (
    <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
      <input type="hidden" name="public_key" value={public_key} />
      <input type="hidden" name="tx_ref" value={tx_ref} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="currency" value="ETB" />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="first_name" value={fname} />
      <input type="hidden" name="last_name" value={lname} />
      <input type="hidden" name="title" value="Payment" />
      <input type="hidden" name="description" value="Complete your transaction" />
      <input type="hidden" name="logo" value="https://your-logo-url.com/logo.png" />
      <button type="submit" className="w-full h-full">Pay Now</button>
    </form>
  );
};

export default Pay;
