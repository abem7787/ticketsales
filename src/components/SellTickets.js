import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellTickets = () => {
    const [cryptoValue, setCryptoValue] = useState(null);
    const [currency, setCurrency] = useState("USD");
    const navigate = useNavigate();

    const fetchCryptoData = async () => {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=${currency}`
        );
        const data = await response.json();
        setCryptoValue({
            bitcoin: data.bitcoin[currency.toLowerCase()],
            ethereum: data.ethereum[currency.toLowerCase()],
        });
    };

    const features = [
        {
            icon: <i className="fas fa-percent" />,
            iconColor: "text-green-500",
            title: "Lower Fees",
            description: "Pay just 1% transaction fee compared to 5-10% with traditional payment processors.",
        },
        {
            icon: <i className="fas fa-globe" />,
            iconColor: "text-blue-500",
            title: "Global Payments",
            description: "Accept payments from anywhere in the world without currency conversion hassles.",
        },
        {
            icon: <i className="fas fa-shield-alt" />,
            iconColor: "text-red-500",
            title: "Fraud Prevention",
            description: "Blockchain ensures each ticket is unique and verifiable, eliminating counterfeit tickets.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-5xl space-y-6 transform transition-all hover:scale-[1.02]">
                <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900">
                    💸 Sell Crypto Tickets
                </h2>

                {/* Currency Selection */}
                <div className="flex justify-center gap-4 flex-wrap">
                    {["USD", "EUR", "CAD"].map((curr) => (
                        <button
                            key={curr}
                            onClick={() => setCurrency(curr)}
                            className={`px-5 py-2 text-base sm:text-lg font-medium rounded-full transition ease-in-out duration-300 ${
                                currency === curr
                                    ? "bg-indigo-600 text-white shadow-lg"
                                    : "bg-gray-300 text-gray-800 hover:bg-indigo-200"
                            }`}
                        >
                            {curr}
                        </button>
                    ))}
                </div>

                {/* Fetch Button */}
                <button
                    onClick={fetchCryptoData}
                    className="w-full py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl shadow-md hover:from-green-500 hover:to-green-700 transition duration-300"
                >
                    Get Crypto Prices
                </button>

                {/* Crypto Prices */}
                {cryptoValue && (
                    <div className="text-center text-lg sm:text-xl text-gray-700 mt-6 space-y-2">
                        🪙 <span className="font-bold text-green-600">Bitcoin</span> Price in {currency}: <span className="font-bold text-green-700">{cryptoValue.bitcoin}</span><br />
                        🪙 <span className="font-bold text-blue-600">Ethereum</span> Price in {currency}: <span className="font-bold text-blue-700">{cryptoValue.ethereum}</span>
                    </div>
                )}

                {/* Navigate */}
                <button
                    onClick={() => navigate("/chart-seating")}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:from-indigo-600 hover:to-indigo-800 transition duration-300"
                >
                    🎟️ Create Event & Go to Seating Chart
                </button>

                {/* Features */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-lg transition hover:shadow-xl hover:scale-105 h-full">
                            <div className={`text-4xl mb-4 ${feature.iconColor}`}>{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* How it Works */}
                <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-semibold text-center text-gray-900 mb-4">How it Works</h3>
                    <ol className="space-y-4">
                        <li className="flex items-start space-x-4">
                            <span className="text-purple-500 text-2xl">1.</span>
                            <p className="text-base sm:text-lg text-gray-700">Create Event: Set up your details, ticket types, and pricing in any cryptocurrency.</p>
                        </li>
                        <li className="flex items-start space-x-4">
                            <span className="text-purple-500 text-2xl">2.</span>
                            <p className="text-base sm:text-lg text-gray-700">Share Link: Promote your event and share the unique ticketing page with your audience.</p>
                        </li>
                        <li className="flex items-start space-x-4">
                            <span className="text-purple-500 text-2xl">3.</span>
                            <p className="text-base sm:text-lg text-gray-700">Collect Payments: Attendees pay with their preferred cryptocurrency directly to your wallet.</p>
                        </li>
                        <li className="flex items-start space-x-4">
                            <span className="text-purple-500 text-2xl">4.</span>
                            <p className="text-base sm:text-lg text-gray-700">Manage Attendees: Use our dashboard to track sales, verify tickets, and manage your event.</p>
                        </li>
                    </ol>
                </div>

                {/* Supported Cryptos */}
                <div className="mt-8 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Supported Cryptocurrencies</h3>
                    <div className="flex flex-wrap justify-center gap-6 mt-4 text-gray-600">
                        <i className="fab fa-bitcoin text-5xl text-orange-500"></i>
                        <i className="fab fa-ethereum text-5xl text-indigo-600"></i>
                        <i className="fab fa-usdt text-5xl text-green-600"></i>
                        <i className="fab fa-btc text-5xl text-yellow-500"></i>
                        <i className="fab fa-usdc text-5xl text-blue-500"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellTickets;
