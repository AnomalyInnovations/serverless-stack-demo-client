import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import config from "../config";
import "./Settings.css";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id
      });

      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      <StripeProvider apiKey={config.STRIPE_KEY}>
        <Elements>
          <BillingForm
            isLoading={isLoading}
            onSubmit={handleFormSubmit}
          />
        </Elements>
      </StripeProvider>
    </div>
  );
}
