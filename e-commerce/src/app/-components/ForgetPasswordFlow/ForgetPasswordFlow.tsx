"use client";

import { useState } from "react";
import { LuCheck, LuKeyRound, LuLock, LuMail } from "react-icons/lu";
import EmailStep from "../EmailStep/EmailStep";
import CodeStep from "../CodeStep/CodeStep";
import ResetStep from "../ResetStep/ResetStep";

type Step = 1 | 2 | 3;

const stepIcons = [LuMail, LuKeyRound, LuLock];

export default function ForgetPasswordFlow() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");

  const header = {
    1: {
      title: "Forgot Password?",
      text: "No worries, we'll send you a reset code",
    },
    2: {
      title: "Check Your Email",
      text: `Enter the 6-digit code sent to ${email}`,
    },
    3: {
      title: "Create New Password",
      text: "Your new password must be different from previous passwords",
    },
  }[step];

  return (
    <div>
      <p className="text-center text-3xl font-bold text-green-600">FreshCart</p>
      <h1 className="mt-4 text-center text-2xl font-bold text-gray-800">
        {header.title}
      </h1>
      <p className="mt-1 text-center text-gray-600">{header.text}</p>

      <div className="my-8 flex items-center justify-center">
        {stepIcons.map((Icon, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={n} className="flex items-center">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                  done || active
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <LuCheck className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </span>
              {n < 3 && (
                <span
                  className={`mx-2 h-0.5 w-12 sm:w-16 ${
                    step > n ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <EmailStep
          onSuccess={(value) => {
            setEmail(value);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <CodeStep
          email={email}
          onSuccess={() => setStep(3)}
          onChangeEmail={() => setStep(1)}
        />
      )}
      {step === 3 && <ResetStep email={email} />}
    </div>
  );
}