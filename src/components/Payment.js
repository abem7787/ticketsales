import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("paymentData");
    if (!data) {
      alert("No payment data found. Redirecting...");
      navigate("/seat-selection/:id");
      return;

        

    }
    setPaymentData(JSON.parse(data));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const { name, cardNumber, expiry, cvv } = form;

    if (!name || !cardNumber || !expiry || !cvv) {
      alert("Please fill out all fields");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      alert(
        `Payment Successful!\nSeats: ${paymentData.selectedSeats.map((s) => s.id).join(", ")}\nTotal: $${paymentData.totalPrice}`
      );
      localStorage.removeItem("paymentData");
      navigate("/confirmation", {
        state: {
          event: paymentData.event,
          selectedSeats: paymentData.selectedSeats,
          totalPrice: paymentData.totalPrice
        }
      });
    }, 2000);
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>Loading payment information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Payment for {paymentData.event.name}</h2>

      <div className="bg-gray-800 p-4 rounded-lg mb-6 w-full max-w-md">
        <p>Seats: {paymentData.selectedSeats.map((s) => s.id).join(", ")}</p>
        <p>Total: ${paymentData.totalPrice}</p>
      </div>

      <form
        onSubmit={handlePayment}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <input
          name="name"
          placeholder="Cardholder Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          name="cardNumber"
          placeholder="Card Number"
          value={form.cardNumber}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <div className="flex gap-4">
          <input
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            name="cvv"
            placeholder="CVV"
            value={form.cvv}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className={`w-full py-3 rounded-md font-semibold ${
            processing ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {processing ? "Processing..." : `Pay $${paymentData.totalPrice}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
