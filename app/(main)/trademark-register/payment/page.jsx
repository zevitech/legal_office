"use client";

import axios from "axios";
import Image from "next/image";
import { stateList } from "@/constant";
import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FormHero from "@/components/form/FormHero";
import TinyWarning from "@/components/form/TinyWarning";
import NormalLabel from "@/components/form/NormalLabel";
import { useSelector } from "react-redux";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";

const Payment = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const [cardNumber, setCardNumber] = useState(null);
  // const [cardExpiry, setCardExpiry] = useState(null);
  // const [cardCVC, setCardCVC] = useState(null);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [zip, setZip] = useState("");
  // const [billingAddress, setBillingAddress] = useState("");
  const [isTermsAccept, setIsTermsAccept] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentError, setPaymentError] = useState("");
  const [isNext, setIsNext] = useState(false);

  // for test
  const [cardNumber, setCardNumber] = useState("5424000000000015");
  const [cardExpiry, setCardExpiry] = useState("2025-12");
  const [cardCVC, setCardCVC] = useState(999);
  const [firstName, setFirstName] = useState("Ellen");
  const [lastName, setLastName] = useState("Johnson");
  const [city, setCity] = useState("14 Main Street");
  const [state, setState] = useState("TX");
  const [zip, setZip] = useState("44628");
  const [billingAddress, setBillingAddress] = useState("Pecan Springs");

  // Refs for error fields
  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardCVCRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const handleCardExpiryChange = (e) => {
    const allowedChars = /^[0-9/]*$/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault();
    }
    setCardExpiry(e.target.value);
  };

  const nestedLeadData = useSelector((state) => state.form);
  const stepFourData = nestedLeadData.stepFour;

  // from the nested object, merge them into one object
  const leadData = useMemo(
    () => Object.assign({}, ...Object.values(nestedLeadData)),
    [nestedLeadData]
  );

  // Filter out properties that are empty or undefined
  const leadDataWithValues = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(leadData).filter(([_, value]) => value !== "")
      ),
    [leadData]
  );

  // adjust the order items details
  const orderDetails = useMemo(() => {
    const baseDetails = [
      {
        title: "Trademark registration",
        amount: nestedLeadData.stepThree.price,
      },
      { title: "Comprehensive Trademark Search", amount: 0 },
      { title: "Trademark monitoring", amount: 0 },
      { title: "Office Action Response", amount: 0 },
    ];

    if (stepFourData.rushAmount !== 0) {
      baseDetails.push({
        title: "Rush processing",
        amount: stepFourData.rushAmount,
      });
    }

    return baseDetails;
  }, [nestedLeadData, stepFourData]);

  //count the total and add to total amount into data object
  const totalAmount = orderDetails.reduce(
    (accumulator, current) => accumulator + current.amount,
    0
  );
  leadDataWithValues.totalAmount = totalAmount;

  // Create the lineItems array
  const lineItems = useMemo(
    () => ({
      lineItem: orderDetails.map((item, index) => ({
        itemId: `item${index + 1}`,
        name: item.title,
        description: item.title,
        quantity: "1",
        unitPrice: item.amount,
      })),
    }),
    [orderDetails]
  );

  // validate the form input
  const validateForm = () => {
    let tempErrors = {};

    if (!cardNumber) tempErrors.cardNumber = "Card Number is required";
    if (cardNumber?.length < 12)
      tempErrors.cardNumber = "Card Number is too short";
    if (!cardExpiry) tempErrors.cardExpiry = "Card Expiry is required";
    if (!cardCVC) tempErrors.cardCVC = "Card CVC is required";
    if (cardCVC?.length < 3) tempErrors.cardCVC = "CVC is too short";
    if (!firstName) tempErrors.firstName = "First Name is required";
    if (!lastName) tempErrors.lastName = "Last Name is required";
    if (!billingAddress)
      tempErrors.billingAddress = "Billing address is required";
    if (!state) tempErrors.state = "State is required";
    if (!zip) tempErrors.zip = "Zip code is required";
    if (!city) tempErrors.city = "City is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors)[0];
  };

  // handle the payment request --------------------------
  const handlePaymentRequest = () => {
    setIsLoading(true);

    //return (stop) if there validation issue
    const firstErrorField = validateForm();
    if (firstErrorField) {
      setIsLoading(false);

      // Scroll to the first error field
      const errorRefs = {
        cardNumber: cardNumberRef,
        cardExpiry: cardExpiryRef,
        cardCVC: cardCVCRef,
        firstName: firstNameRef,
        lastName: lastNameRef,
      };

      if (firstErrorField < 4) {
        errorRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
        });
      }
      return;
    }

    // prepare the request data for authorize.net
    const requestData = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: process.env.NEXT_PUBLIC_AUTHORIZE_API_NAME,
          transactionKey: process.env.NEXT_PUBLIC_AUTHORIZE_API_KEY,
        },
        refId: leadDataWithValues.receipt_ID,
        transactionRequest: {
          transactionType: "authCaptureTransaction",
          amount: leadDataWithValues.totalAmount,
          payment: {
            creditCard: {
              cardNumber: cardNumber?.replace(/\s+/g, ""),
              expirationDate: cardExpiry,
              cardCode: cardCVC,
            },
          },
          lineItems,
          poNumber: leadDataWithValues.phone,
          customer: {
            id: leadDataWithValues.customer_ID,
          },
          billTo: {
            firstName: firstName,
            lastName: lastName,
            company: leadDataWithValues.formation,
            address: billingAddress,
            city: city,
            state: state,
            zip: zip,
            country: "US",
          },
          customerIP: "",
          processingOptions: {
            isSubsequentAuth: "true",
          },
          subsequentAuthInformation: {},
          authorizationIndicatorType: {
            authorizationIndicator: "final",
          },
        },
      },
    };

    // requesting to authorize.net to make payment
    axios
      .post(process.env.NEXT_PUBLIC_AUTHORIZE_API_URL, requestData)
      .then((res) => {
        if ("transactionResponse" in res.data) {
          if ("messages" in res.data.transactionResponse) {
            if (res.data.transactionResponse.messages[0].code === "1") {
              // payment successful. now make a request to send the data to mail and zoho
              setPaymentError("");
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_API_URL}/save-data`,
                  leadDataWithValues
                )
                .then((res) => {
                  if (res.data.success) {
                    return router.push("/trademark-register/thank-you");
                  }
                })
                .catch((err) => {
                  setIsLoading(false);
                  console.log(
                    "Error sending data to save-data endpoint in payment page: ",
                    err
                  );
                  alert(
                    "Something went wrong, Check your network or please try again."
                  );
                });
            } else {
              setPaymentError(
                res.data.transactionResponse.messages[0].description
              );
              setIsLoading(false);
              return;
            }
          } else if ("errors" in res.data.transactionResponse) {
            setPaymentError(res.data.transactionResponse.errors[0].errorText);
            setIsLoading(false);
            return;
          } else {
            setPaymentError("Please enter a valid card information.");
            setIsLoading(false);
            return;
          }
        } else {
          setPaymentError("Please enter a valid card information.");
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
        setPaymentError(
          "Something went wrong, Check your network or please try again."
        );
        setIsLoading(false);
        return;
      });
  };

  return (
    <main>
      <FormHero />
      <div className="px-16 mt-16 mb-14 max-sm:px-2 max-md:mt-12 max-md:mb-8">
        <div className="flex flex-col gap-3 mb-8 w-[800px] max-md:w-auto max-sm:px-4">
          <h1 className="text-[#03589c] font-semibold text-4xl max-md:text-3xl">
            Confirm order and pay
          </h1>
          <NormalLabel
            text={`
            Please enter your payment details below to complete your Trademark
            order. Once completed, our experts will immediately begin reviewing
            and processing your submission.`}
          />
        </div>
        <div className="flex max-md:flex-col-reverse">
          <section className=" w-3/5 px-20 max-md:px-0 max-md:w-full">
            <div className="bg-white p-8 max-md:px-5 max-md:py-7 border-t-2 border-t-indigo-700 flex flex-col gap-3 mb-6">
              <div className="flex flex-col gap-3">
                <Input
                  type="number"
                  label="Card Number"
                  variant="underlined"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  ref={cardNumberRef}
                  isInvalid={!!errors.cardNumber}
                  errorMessage={errors.cardNumber}
                  endContent={
                    <Image
                      width={100}
                      height={30}
                      alt="cards"
                      src={`/images/visa-mastercard-discover-american-express-icons-21635415958rgxaunvs7z.png`}
                      className="max-sm::w-24 max-sm:h-6'"
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
                  value={cardExpiry}
                  onChange={handleCardExpiryChange}
                  isInvalid={!!errors.cardExpiry}
                  errorMessage={errors.cardExpiry}
                  ref={cardExpiryRef}
                />
                <Input
                  type="number"
                  label="Card CVC"
                  variant="underlined"
                  placeholder="123"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                  isInvalid={!!errors.cardCVC}
                  errorMessage={errors.cardCVC}
                  ref={cardCVCRef}
                />
              </div>
              <div className="flex gap-6">
                <Input
                  type="text"
                  label="First Name"
                  variant="underlined"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName}
                  ref={firstNameRef}
                />
                <Input
                  type="text"
                  label="Last Name"
                  variant="underlined"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName}
                  ref={lastNameRef}
                />
              </div>
              <Input
                type="text"
                label="Billing Address"
                variant="underlined"
                placeholder="1234 Elm Street"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                isInvalid={!!errors.billingAddress}
                errorMessage={errors.billingAddress}
              />
              <Select
                variant="underlined"
                label="State/Province/Region"
                onChange={(e) => setState(e.target.value)}
                isInvalid={!!errors.state}
                errorMessage={errors.state}
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  isInvalid={!!errors.city}
                  errorMessage={errors.city}
                />
                <Input
                  type="number"
                  label="ZIP Code"
                  variant="underlined"
                  placeholder="1234"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  isInvalid={!!errors.zip}
                  errorMessage={errors.zip}
                />
              </div>
              <div className="mt-5">
                <Checkbox
                  onChange={(e) => setIsTermsAccept(e.target.value)}
                  value={isTermsAccept}
                  size="md"
                >
                  <TinyWarning
                    text={`I ACCEPT THE TERMS. I HAVE READ, UNDERSTAND, & AGREE TO THE TERMS OF SERVICE.`}
                  />
                </Checkbox>
                {paymentError && (
                  <p className="text-[#f31260] text-sm text-center mt-4 mb-1 capitalize">
                    {paymentError}
                  </p>
                )}
                <Button
                  color="primary"
                  variant="shadow"
                  type="submit"
                  isLoading={isLoading}
                  className=" float-end mt-5 px-6"
                  radius="sm"
                  onClick={handlePaymentRequest}
                >
                  Confirm Payment
                </Button>
              </div>
            </div>
          </section>
          <section className="w-2/5 flex-center max-md:w-full">
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
      </div>
    </main>
  );
};

export default Payment;
