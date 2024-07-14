"use client";

import React, { useState } from "react";
import Image from "next/image";
import FormHero from "@/components/form/FormHero";
import {
  Button,
  Checkbox,
  DateInput,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import NormalLabel from "@/components/form/NormalLabel";
import { CalendarDate, parseDate } from "@internationalized/date";
import FieldContainer from "@/components/form/FieldContainer";
import { IoCalendar } from "react-icons/io5";
import { stateList } from "@/constant";
import SmallLabel from "@/components/form/SmallLabel";
import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [CardExpiry, setCardExpiry] = useState(1313);
  const [CardCVC, setCardCVC] = useState("");
  const [BilingAddress, setBilingAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [isTermsAccept, setIsTermsAccept] = useState(false);

  const orderDetails = [
    { title: "Trademark registration", amount: 150 },
    { title: "Comprehensive Trademark Search", amount: 0 },
    { title: "Trademark monitoring", amount: 0 },
    { title: "Office Action Response", amount: 0 },
    { title: "Rush processing", amount: 40 },
  ];

  const totalAmount = orderDetails.reduce(
    (accumulator, current) => accumulator + current.amount,
    0
  );

  const handleCardExpiryChange = (e) => {
    const allowedChars = /^[0-9/]*$/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault();
    }
    setCardExpiry(e.target.value);
  };

  return (
    <main>
      <FormHero />
      <div className="px-16 flex mt-16 mb-14">
        <section className=" w-3/5 px-20">
          <div className="flex flex-col gap-3 mb-8">
            <h1 className="text-[#03589c] font-semibold text-4xl">
              Confirm order and pay
            </h1>
            <NormalLabel
              text={`
            Please enter your payment details below to complete your Trademark
            order. Once completed, our experts will immediately begin reviewing
            and processing your submission.`}
            />
          </div>
          <FieldContainer>
            <div className="flex flex-col gap-3">
              <Input
                type="number"
                label="Card Number"
                variant="underlined"
                placeholder="0000 0000 0000 0000"
                endContent={
                  <Image
                    width={100}
                    height={30}
                    alt="cards"
                    src={`/images/visa-mastercard-discover-american-express-icons-21635415958rgxaunvs7z.png`}
                  />
                }
              />
            </div>
            <div className="flex gap-6">
              <Input
                type="text"
                label="Card Expiry"
                variant="underlined"
                placeholder="18/23"
                value={CardExpiry}
                onChange={handleCardExpiryChange}
              />
              <Input
                type="number"
                label="Card CVC"
                variant="underlined"
                placeholder="1234"
              />
            </div>
            <div className="flex gap-6">
              <Input
                type="text"
                label="First Name"
                variant="underlined"
                placeholder="John"
              />
              <Input
                type="text"
                label="Last Name"
                variant="underlined"
                placeholder="Smith"
              />
            </div>
            <Input
              type="text"
              label="Billing Address"
              variant="underlined"
              placeholder="1234 Elm Street"
            />
            <Select
              variant="underlined"
              label="State/Province/Region"
              onChange={(e) => setState(e.target.value)}
            >
              {stateList.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </Select>
            <div className="flex gap-6">
              <Input
                type="text"
                label="City"
                variant="underlined"
                placeholder="New York"
              />
              <Input
                type="number"
                label="ZIP Code"
                variant="underlined"
                placeholder="1234"
              />
            </div>
            <div className="mt-5">
              <Checkbox
                onChange={(e) => setIsTermsAccept(e.target.value)}
                value={isTermsAccept}
              >
                <SmallLabel
                  text={`I ACCEPT THE TERMS. I HAVE READ, UNDERSTAND, & AGREE TO THE TERMS
              OF SERVICE.`}
                />
              </Checkbox>
              <Button
                color="primary"
                variant="shadow"
                type="submit"
                isLoading={isLoading}
                className=" float-end mt-5"
                radius="sm"
                onClick={() => router.push("/trademark-register/thank-you")}
              >
                Confirm Payment
              </Button>
            </div>
          </FieldContainer>
        </section>
        <section className="w-2/5 flex-center">
          <div className="bg-white border-t-3 border-t-orange-500 flex flex-col gap-3 mb-6 w-full">
            <h1 className="text-2xl font-semibold text-slate-700 text-center pt-8 py-6">
              My Order Details
            </h1>
            <hr />
            <div className="p-8 flex flex-col gap-5">
              {orderDetails.map(({ title, amount }, index) => (
                <div
                  className="flex-between font-medium text-sm text-slate-600 pb-3 border-b-1 border-slate-200"
                  key={index}
                >
                  <div>{title}</div>
                  <div>${amount}.00</div>
                </div>
              ))}
              <div className="flex-between font-semibold text-base text-slate-600">
                <div>{`Total Amount`}</div>
                <div>${totalAmount}.00</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Payment;
