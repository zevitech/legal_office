"use client";

import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveStepOne } from "@/features/formSlice";
import FieldContainer from "../FieldContainer";
import BoldLabel from "../BoldLabel";
import SmallLabel from "../SmallLabel";
import TinyWarning from "../TinyWarning";
import {
  Radio,
  RadioGroup,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import InputCol from "../InputCol";
import { stateList, organizationTypes } from "@/constant";
import { useRouter } from "next/navigation";
import validator from "email-validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { LuLoader } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";

const StepOne = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [ownedBy, setOwnedBy] = useState("individual");
  const [wantToProtect, setWantToProtect] = useState("name");
  const [protectName, setProtectName] = useState("");
  const [sloganName, setSloganName] = useState("");
  const [logo, setLogo] = useState("");
  const [formation, setFormation] = useState("us_based");
  const [countryOfFormation, setCountryOfFormation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [stateOfFormation, setStateOfFormation] = useState("");
  const [position, setPosition] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredPhone, setPreferredPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [reChaptcha, setReChaptcha] = useState("");

  // Refs for error fields
  const protectNameRef = useRef(null);
  const sloganNameRef = useRef(null);
  const logoRef = useRef(null);
  const organizationNameRef = useRef(null);
  const organizationTypeRef = useRef(null);
  const countryOfFormationRef = useRef(null);
  const stateOfFormationRef = useRef(null);
  const positionRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);
  const phoneRef = useRef(null);
  const preferredPhoneRef = useRef(null);
  const emailRef = useRef(null);

  // validate the phone number
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, "US");
    return phoneNumberObject ? phoneNumberObject.isValid() : false;
  };

  // validate the form input
  const validateForm = () => {
    let tempErrors = {};
    if (wantToProtect === "name" && !protectName)
      tempErrors.protectName = "Name is required";
    if (wantToProtect === "slogan" && !sloganName)
      tempErrors.sloganName = "Slogan is required";
    if (wantToProtect === "logo" && !logo) tempErrors.logo = "Logo is required";
    if (wantToProtect === "all_three") {
      if (!protectName) tempErrors.protectName = "Name is required";
      if (!sloganName) tempErrors.sloganName = "Slogan is required";
      if (!logo) tempErrors.logo = "Logo is required";
    }

    if (ownedBy === "organization") {
      if (!organizationName)
        tempErrors.organizationName = "Organization name is required";
      if (!organizationType)
        tempErrors.organizationType = "Organization type is required";
      if (formation === "non_us_based" && !countryOfFormation)
        tempErrors.countryOfFormation = "Country of formation is required";
      if (formation === "us_based" && !stateOfFormation)
        tempErrors.stateOfFormation = "State of formation is required";
      if (!position) tempErrors.position = "Position is required";
    }

    if (!firstName) tempErrors.firstName = "First name is required";
    if (!lastName) tempErrors.lastName = "Last name is required";
    if (!address) tempErrors.address = "Address is required";
    if (!state) tempErrors.state = "State is required";
    if (!zip) tempErrors.zip = "Zip code is required";
    if (!city) tempErrors.city = "City is required";
    if (!phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!validatePhoneNumber(phone)) {
      tempErrors.phone = "Invalid phone number";
    }
    if (!preferredPhone) {
      tempErrors.preferredPhone = "Preferred Phone number is required";
    } else if (!validatePhoneNumber(preferredPhone)) {
      tempErrors.preferredPhone = "Invalid phone number";
    }
    if (!email) {
      tempErrors.email = "Email address is required";
    } else if (!validator.validate(email)) {
      tempErrors.email = "Invalid email address";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors)[0]; // Return the first error key
  };

  const ReCAPTCHAHandle = (value) => {
    console.log("ReCAPTCHA Value is: " + value);
    setReChaptcha(value);
  };
  console.log("ReCAPTCHA", process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //return (stop) if there validation issue
    const firstErrorField = validateForm();
    if (firstErrorField) {
      setIsLoading(false);

      // Scroll to the first error field
      const errorRefs = {
        protectName: protectNameRef,
        sloganName: sloganNameRef,
        logo: logoRef,
        organizationName: organizationNameRef,
        organizationType: organizationTypeRef,
        countryOfFormation: countryOfFormationRef,
        stateOfFormation: stateOfFormationRef,
        position: positionRef,
        firstName: firstNameRef,
        lastName: lastNameRef,
        address: addressRef,
        city: cityRef,
        state: stateRef,
        zip: zipRef,
        phone: phoneRef,
        phone: preferredPhoneRef,
        email: emailRef,
      };
      // errorRefs[firstErrorField].current.scrollIntoView({ behavior: "smooth" });if (firstErrorField)
      if (errorRefs[firstErrorField] && errorRefs[firstErrorField].current) {
        errorRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
        });

        // Wait for the scrolling to finish and then adjust by the offset
        setTimeout(() => {
          window.scrollBy({
            top: -100,
            behavior: "smooth",
          });
        }, 500);
      }
      return;
    }

    const stepOne = {
      wantToProtect,
      protectName,
      sloganName,
      logo,
      ownedBy,
      formation,
      countryOfFormation,
      organizationName,
      organizationType,
      stateOfFormation,
      position,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      preferredPhone,
      email,
      customer_ID: Math.floor(Math.random() * 90000 + 10000),
      zoho_step: 1,
    };

    // Filter out properties that are empty or undefined
    const stepOneWithValues = Object.fromEntries(
      Object.entries(stepOne).filter(([_, value]) => value !== "")
    );

    // store data to state
    dispatch(saveStepOne(stepOneWithValues));

    // send the data to mail and zoho
    const endPoint = process.env.NEXT_PUBLIC_API_URL + "/save-data";
    axios
      .post(endPoint, stepOneWithValues)
      .then((res) => {
        if (res.data.success) {
          return router.push("/trademark-register/step-2");
        }
      })
      .catch((err) => {
        console.log("Error in step one: ", err);
        alert("Something went wrong, Check your network or Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="w-[70%] max-md:w-[95%] m-auto mt-16 max-md:mt-10">
      <form
        action=""
        method="post"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <FieldContainer>
          <BoldLabel text="Select what you are trying to protect" />
          <RadioGroup
            orientation="horizontal"
            value={wantToProtect}
            onValueChange={setWantToProtect}
            className="gap-4"
          >
            <Radio value="name">Name</Radio>
            <Radio value="slogan">Slogan</Radio>
            <Radio value="logo">Logo</Radio>
            <Radio value="all_three">All Three</Radio>
          </RadioGroup>

          {wantToProtect === "name" && (
            <Input
              name="protectName"
              type="text"
              variant="underlined"
              label="Enter the name you wish to protect"
              isInvalid={!!errors.protectName}
              errorMessage={errors.protectName}
              value={protectName}
              onChange={(e) => setProtectName(e.target.value)}
              ref={protectNameRef}
            />
          )}

          {wantToProtect === "slogan" && (
            <Input
              name="sloganName"
              type="text"
              variant="underlined"
              label="Enter the slogan you wish to protect"
              isInvalid={!!errors.sloganName}
              errorMessage={errors.sloganName}
              value={sloganName}
              onChange={(e) => setSloganName(e.target.value)}
              ref={sloganNameRef}
            />
          )}

          {wantToProtect === "logo" && (
            <>
              <br />
              <TinyWarning text="Upload the logo you wish to protect" />
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
                onSuccess={(results) => {
                  const public_url = results?.info?.url;
                  setLogo(public_url);
                }}
                onOpen={() => setIsUploading(true)}
                onClose={() => setIsUploading(false)}
              >
                {({ open }) => {
                  return (
                    <div className="w-full">
                      <div className="flex gap-3">
                        <div
                          onClick={() => open()}
                          className={`bg-gradient-to-tr to-slate-100 from-slate-200 rounded-md text-center p-3 text-sm cursor-pointer shadow-sm w-full flex-center ${
                            isUploading && `cursor-not-allowed opacity-75`
                          }`}
                          ref={logoRef}
                        >
                          {isUploading ? (
                            <LuLoader className=" animate-spin text-2xl" />
                          ) : (
                            "Select Image"
                          )}
                        </div>
                        {logo && (
                          <Image
                            src={logo}
                            alt="Logo"
                            width={100}
                            height={44}
                            className="h-[44px] w-auto"
                          />
                        )}
                      </div>
                      {!!errors.logo && (
                        <p className="text-[#f31260] text-xs pt-2">
                          Please select an image
                        </p>
                      )}
                    </div>
                  );
                }}
              </CldUploadWidget>
            </>
          )}

          {wantToProtect === "all_three" && (
            <section>
              <Input
                name="protectName"
                type="text"
                variant="underlined"
                label="Enter the name you wish to protect"
                isInvalid={!!errors.protectName}
                errorMessage={errors.protectName}
                value={protectName}
                onChange={(e) => setProtectName(e.target.value)}
                ref={protectNameRef}
              />
              <Input
                name="sloganName"
                type="text"
                variant="underlined"
                label="Enter the slogan you wish to protect"
                isInvalid={!!errors.sloganName}
                errorMessage={errors.sloganName}
                value={sloganName}
                onChange={(e) => setSloganName(e.target.value)}
                ref={sloganNameRef}
              />
              <>
                <br />
                <TinyWarning text="Upload the logo you wish to protect" />
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
                  onSuccess={(results) => {
                    const public_url = results?.info?.url;
                    setLogo(public_url);
                  }}
                  onOpen={() => setIsUploading(true)}
                  onClose={() => setIsUploading(false)}
                >
                  {({ open }) => {
                    return (
                      <div className="w-full">
                        <div className="flex gap-3">
                          <div
                            onClick={() => open()}
                            className={`bg-gradient-to-tr to-slate-100 from-slate-200 rounded-md text-center p-3 text-sm cursor-pointer shadow-sm w-full flex-center ${
                              isUploading && `cursor-not-allowed opacity-75`
                            }`}
                            ref={logoRef}
                          >
                            {isUploading ? (
                              <LuLoader className=" animate-spin text-2xl" />
                            ) : (
                              "Select Image"
                            )}
                          </div>
                          {logo && (
                            <Image
                              src={logo}
                              alt="Logo"
                              width={100}
                              height={44}
                              className="h-[44px] w-auto"
                            />
                          )}
                        </div>
                        {!!errors.logo && (
                          <p className="text-[#f31260] text-xs pt-2">
                            Please select an image
                          </p>
                        )}
                      </div>
                    );
                  }}
                </CldUploadWidget>
              </>
            </section>
          )}
        </FieldContainer>

        <FieldContainer>
          <BoldLabel text="Will the trademark be owned by an individual or an entity such as a corporation or LLC?" />
          <h1 className="text-xs text-slate-800">
            Identify the owner of the trademark. This is the person or
            organization who will be the owner of record. If you choose
            individuals, you can enter as many names as you want who own the
            mark. With an organization, you will have to identify someone to be
            the person of contact for the organization.
          </h1>
          <RadioGroup
            orientation="horizontal"
            value={ownedBy}
            onValueChange={setOwnedBy}
            className="gap-4"
          >
            <Radio value="individual">Individual</Radio>
            <Radio value="organization">Organization</Radio>
          </RadioGroup>
        </FieldContainer>

        {ownedBy === "organization" && (
          <FieldContainer>
            <SmallLabel text="FORMATION" />
            <RadioGroup
              orientation="horizontal"
              value={formation}
              onValueChange={setFormation}
              className="gap-4"
            >
              <Radio value="us_based">US Based</Radio>
              <Radio value="non_us_based">Non US Based</Radio>
            </RadioGroup>
            <InputCol>
              <Input
                name="organizationName"
                type="text"
                variant="underlined"
                label="Organization Name"
                isInvalid={!!errors.organizationName}
                errorMessage={errors.organizationName}
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                ref={organizationNameRef}
              />
              <Select
                variant="underlined"
                label="Organization Type"
                onChange={(e) => setOrganizationType(e.target.value)}
                ref={organizationTypeRef}
              >
                {organizationTypes.map((type) => (
                  <SelectItem key={type.label} value={type.label}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            </InputCol>
            <InputCol>
              {formation === "non_us_based" ? (
                <Input
                  name="countryOfFormation"
                  type="text"
                  variant="underlined"
                  label="Country Of Formation"
                  isInvalid={!!errors.countryOfFormation}
                  errorMessage={errors.countryOfFormation}
                  value={countryOfFormation}
                  onChange={(e) => setCountryOfFormation(e.target.value)}
                  ref={countryOfFormationRef}
                />
              ) : (
                <Select
                  variant="underlined"
                  label="State Of Formation"
                  isInvalid={!!errors.stateOfFormation}
                  errorMessage={errors.stateOfFormation}
                  onChange={(e) => setStateOfFormation(e.target.value)}
                  ref={stateOfFormationRef}
                >
                  {stateList.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
              <Input
                name="position"
                type="text"
                variant="underlined"
                label="Position"
                isInvalid={!!errors.position}
                errorMessage={errors.position}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                ref={positionRef}
              />
            </InputCol>
          </FieldContainer>
        )}

        {/* personal information */}
        <FieldContainer>
          <InputCol>
            <Input
              name="firstName"
              type="text"
              variant="underlined"
              label="First Name"
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              ref={firstNameRef}
            />
            <Input
              name="lastName"
              type="text"
              variant="underlined"
              label="Last Name"
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              ref={lastNameRef}
            />
          </InputCol>
          <InputCol>
            <Input
              name="address"
              type="text"
              variant="underlined"
              label="Enter Full Address"
              isInvalid={!!errors.address}
              errorMessage={errors.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              ref={addressRef}
            />
          </InputCol>
          <InputCol>
            <Input
              name="city"
              type="text"
              variant="underlined"
              label="Enter City"
              isInvalid={!!errors.city}
              errorMessage={errors.city}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              ref={cityRef}
            />
            <Select
              variant="underlined"
              label="State/Province/Region"
              onChange={(e) => setState(e.target.value)}
              isInvalid={!!errors.state}
              errorMessage={errors.state}
              ref={stateRef}
            >
              {stateList.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </Select>
          </InputCol>
          <InputCol>
            <Input
              name="phone"
              type="number"
              variant="underlined"
              label="Phone Number"
              isInvalid={!!errors.phone}
              errorMessage={errors.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              ref={phoneRef}
            />
            <Input
              name="preferred_phone"
              type="number"
              variant="underlined"
              label="Preferred Phone Number"
              isInvalid={!!errors.preferredPhone}
              errorMessage={errors.preferredPhone}
              value={preferredPhone}
              onChange={(e) => setPreferredPhone(e.target.value)}
              ref={preferredPhoneRef}
            />
          </InputCol>
          <InputCol>
            <Input
              name="zipCode"
              type="number"
              variant="underlined"
              label="Zip Code"
              isInvalid={!!errors.zip}
              errorMessage={errors.zip}
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              ref={zipRef}
            />
            <Input
              name="email"
              type="email"
              variant="underlined"
              label="Enter Email Address"
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          </InputCol>
        </FieldContainer>

        {/* Google ReCAPTCHA */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
          onChange={ReCAPTCHAHandle}
        />

        {/* next or previous button */}
        <div className="my-10 gap-5 flex-between">
          <div className="flex-center max-md:items-start gap-2 text-slate-700">
            <IoMdLock className="text-lg max-md:text-2xl" />
            <p className="max-md:text-sm">{`Click on "Next" to save your application`}</p>
          </div>
          <Button
            color="primary"
            variant="shadow"
            type="submit"
            isLoading={isLoading}
            className="float-end px-10 py-5 max-md:px-14"
          >
            Next
          </Button>
        </div>
        <p className="text-sm max-md:text-xs text-slate-500 mb-16">
          Once your search results have been reviewed and our specialists have
          curated your trademark application, Legal Trademark Office will
          collect the necessary fees and pay the discounted TEAS Standard
          electronic filing fee of $350 on your behalf.
        </p>
      </form>
    </section>
  );
};

export default StepOne;
