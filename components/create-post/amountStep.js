"use client";

import { useState } from "react";

const BudgetBox = ({ amount, setPost, post, activeButton, setActiveButton }) => {
  const handleClick = () => {
    setPost({ ...post, amount: amount });
    setActiveButton(amount);
  };

  return (
    <div
      onClick={handleClick}
      className={`budget__btn ${activeButton === amount ? "active" : ""}`}
    >
      <p className="text-sm">{amount}</p>
    </div>
  );
};

const AmountStep = ({ post, setPost, handleNext, handleBack }) => {
  const [activeButton, setActiveButton] = useState(""); // state for the active amount button
  const [fixedAmount, setFixedAmount] = useState(true);

  const isEmpty = post.amount.trim() === "";

  const amountOptions = [
    "< $50",
    "$50 - $99",
    "$100 - $499",
    "$500 - $999",
    "$1,000 - $4,999",
    "> $5,000",
  ];

  return (
    <div className="relative gap-16 flex items-start min-h-full w-full">
      {/* Left Side */}
      <div className="w-1/2">
        <h1 className="text-5xl font-semibold pb-8">Tell us a little more about your post</h1>
        <p className="text-sm text-gray-500 pb-32">
          In this section you can set your budget, your hourly rate, and the level of
          experience your desired freelancer is expected to have.
        </p>
        <div className="flex gap-4">
          <button onClick={handleBack} className="rounded-xl border border-gray-300 px-8">
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={isEmpty}
            className={`flex rounded-xl ${
              isEmpty
                ? "bg-muted-blue-200 text-muted-blue-400 py-2 px-8 transition ease-linear"
                : "bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-2 px-8 transition ease-linear"
            }`}
          >
            <span className="pr-4">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2">
        {/* ITEM: Amount Buttons */}
        <div className="flex gap-4 w-full text-xl text-left font-base pb-8">
          <button
            onClick={() => setFixedAmount(true)}
            className="border border-gray-300 rounded-lg pl-8 pr-24 py-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="pt-4">Projet Budget</p>
          </button>
          <button
            onClick={() => setFixedAmount(false)}
            className="border border-gray-300 rounded-lg pl-8 pr-24 py-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
            <p className="pt-4">Hourly Rate</p>
          </button>
        </div>

        {/* ITEM: Budget Options */}
        {fixedAmount ? (
          <div>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Select your budget range
            </span>
            {/* ITEM: Budget Boxes */}
            <div className="grid grid-cols-3 gap-4 my-8">
              {amountOptions.map((amount) => (
                <BudgetBox
                  key={amount}
                  amount={amount}
                  post={post}
                  setPost={setPost}
                  activeButton={activeButton}
                  setActiveButton={setActiveButton}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>Hourly</div>
        )}
      </div>

      {/* Text Box and Examples */}
    </div>
  );
};

export default AmountStep;
