"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
  Tabs,
  Tab,
  DatePicker,
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
import { LuClock3, LuLoader } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import { IoMail } from "react-icons/io5";
import { RiHome5Fill } from "react-icons/ri";
import {
  OrganizationType,
  ServiceProvided,
} from "@/constant/form2.0/system-step-one-data";
import { GetGeographicalData } from "@/utils/get-geographical-data";
import {
  now,
  getLocalTimeZone,
  parseZonedDateTime,
} from "@internationalized/date";

const StepOne = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [wantToProtect, setWantToProtect] = useState("name");
  const [selectedOwnerType, setSelectedOwnerType] = useState("individual");
  const [selectedFormationType, setSelectedFormationType] =
    useState("us_based");

  // BRAND INFORMATION
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [logoColors, setLogoColors] = useState("");
  const [logoProtectionDescription, setLogoProtectionDescription] =
    useState("");

  const [trademarkCurrentlyBeingUsed, setTrademarkCurrentlyBeingUsed] =
    useState("");
  const [firstAnywhereDate, setFirstAnywhereDate] = useState("");
  const [firstCommenceDate, setFirstCommenceDate] = useState("");
  const [ownershipDetail, setOwnershipDetail] = useState("");

  const [slogan, setSlogan] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [formationGeographicalData, setFormationGeographicalData] = useState(
    []
  );
  const [stateFormation, setStateFormation] = useState("");
  const [countryFormation, setCountryFormation] = useState("");
  const [organizationPosition, setOrganizationPosition] = useState("");
  const [reChaptcha, setReChaptcha] = useState("");
  const [errors, setErrors] = useState({});

  // PERSONAL INFORMATION
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [landLineNumber, setLandLineNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactTime, setContactTime] = useState("");

  const router = useRouter();

  // FETCH GEOGRAPHICAL DATA
  useEffect(() => {
    if (selectedFormationType === "us_based") {
      setFormationGeographicalData(GetGeographicalData("state", "US"));
    } else {
      setFormationGeographicalData(GetGeographicalData("country"));
    }
  }, [selectedFormationType]);

  // Refs for error fields
  const protectNameRef = useRef(null);
  const sloganNameRef = useRef(null);
  const logoRef = useRef(null);
  const logoColorsRef = useRef(null);
  const logoProtectionDescriptionRef = useRef(null);
  const trademarkCurrentlyBeingUsedRef = useRef(null);
  const firstAnywhereDateRef = useRef(null);
  const firstCommenceDateRef = useRef(null);
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
  const emailRef = useRef(null);
  const reChaptchaRef = useRef(null);

  // validate the phone number
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, "US");
    return phoneNumberObject ? phoneNumberObject.isValid() : false;
  };

  // validate the Email Address
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailAddress(email);

    if (!validateEmail(email)) {
      setErrors({ emailAddress: "Please enter a valid email address." });
    } else {
      setErrors({});
    }
  };

  // validate the form input
  const validateForm = () => {
    let tempErrors = {};

    if (wantToProtect === "name" && !name) tempErrors.name = "Name is required";
    if (wantToProtect === "slogan" && !slogan)
      tempErrors.slogan = "Slogan is required";
    if (wantToProtect === "logo" && !logo) tempErrors.logo = "Logo is required";
    if (wantToProtect === "logo" && !logo && !logoColors)
      tempErrors.logoColors = "Logo colors is required";
    if (wantToProtect === "logo" && !logo && !logoProtectionDescription)
      tempErrors.logoProtectionDescription =
        "Logo protection description is required";
    if (wantToProtect === "all-of-them") {
      if (!name) tempErrors.name = "Name is required";
      if (!slogan) tempErrors.slogan = "Slogan is required";
      if (!logo) tempErrors.logo = "Logo is required";
      if (!logoColors) tempErrors.logoColors = "Logo colors is required";
      if (!logoProtectionDescription)
        tempErrors.logoProtectionDescription =
          "Logo protection description is required";
    }
    if (!trademarkCurrentlyBeingUsed)
      tempErrors.trademarkCurrentlyBeingUsed =
        "Please select trademarke using anywhere";
    if (trademarkCurrentlyBeingUsed === "yes" && !firstAnywhereDate)
      tempErrors.firstAnywhereDate = "Please select first use anywhere date";
    if (trademarkCurrentlyBeingUsed === "yes" && !firstCommenceDate)
      tempErrors.firstCommenceDate = "Please select first use commerce date";

    if (selectedOwnerType === "organization") {
      if (!organizationName)
        tempErrors.organizationName = "Organization name is required";
      if (!organizationType)
        tempErrors.organizationType = "Organization type is required";
      if (selectedFormationType === "non_us_based" && !countryFormation)
        tempErrors.countryFormation = "Country of formation is required";
      if (selectedFormationType === "us_based" && !stateFormation)
        tempErrors.stateFormation = "State of formation is required";
      if (!organizationPosition)
        tempErrors.organizationPosition = "Position is required";
    }

    if (!firstName) tempErrors.firstName = "First name is required";
    if (!lastName) tempErrors.lastName = "Last name is required";
    if (!address) tempErrors.address = "Address is required";
    if (!state) tempErrors.state = "State is required";
    if (!zipCode) tempErrors.zipCode = "Zip code is required";
    if (!city) tempErrors.city = "City is required";
    if (!phoneNumber) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(phoneNumber)) {
      tempErrors.phoneNumber = "Invalid phone number";
    }
    if (!emailAddress) {
      tempErrors.emailAddress = "Email address is required";
    } else if (!validator.validate(emailAddress)) {
      tempErrors.emailAddress = "Invalid email address";
    }
    if (!reChaptcha) {
      tempErrors.reChaptcha = "Please verify that you are not a robot";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors)[0];
  };

  const ReCAPTCHAHandle = (value) => {
    setReChaptcha(value);
  };

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
        name: protectNameRef,
        slogan: sloganNameRef,
        logo: logoRef,
        logoColors: logoColorsRef,
        logoProtectionDescription: logoProtectionDescriptionRef,
        trademarkCurrentlyBeingUsed: trademarkCurrentlyBeingUsedRef,
        firstAnywhereDate: firstAnywhereDateRef,
        firstCommenceDate: firstCommenceDateRef,
        organizationName: organizationNameRef,
        organizationType: organizationTypeRef,
        countryFormation: countryOfFormationRef,
        stateFormation: stateOfFormationRef,
        organizationPosition: positionRef,
        firstName: firstNameRef,
        lastName: lastNameRef,
        address: addressRef,
        city: cityRef,
        state: stateRef,
        zipCode: zipRef,
        phoneNumber: phoneRef,
        emailAddress: emailRef,
        reChaptcha: reChaptchaRef,
      };

      // errorRefs[firstErrorField].current.scrollIntoView({ behavior: "smooth" });if (firstErrorField)
      if (errorRefs[firstErrorField] && errorRefs[firstErrorField].current) {
        errorRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
        });

        // Wait for the scrolling to finish and then adjust by the offset
        setTimeout(() => {
          window.scrollBy({
            top: -200,
            behavior: "smooth",
          });
        }, 500);
      }
      return;
    }

    const stepOne = {
      customer_ID: Math.floor(Math.random() * 90000 + 10000),
      wantToProtect,
      name,
      slogan,
      logo,
      logoColors,
      logoProtectionDescription,
      trademarkCurrentlyBeingUsed,
      firstAnywhereDate,
      firstCommenceDate,
      ownershipDetail,
      organizationName,
      selectedOwnerType,
      selectedFormationType,
      countryFormation,
      organizationName,
      organizationType,
      stateFormation,
      organizationPosition,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      landLineNumber,
      emailAddress,
      contactTime,
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

  console.log(firstAnywhereDate);
  console.log(firstCommenceDate);

  const formatDateString = (date) => {
    if (date) {
      const { year, month, day } = date;
      return `${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}-${year}`;
    }
    return "";
  };

  return (
    <section className="system-page-standard-layout">
      <div className="w-full h-full flex flex-col gap-8">
        {/* SERVICE INFORMATION FIELDS 1 */}
        <div className="w-full h-full grid grid-cols-1 gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="font-inria text-heading-color text-[24px] w-full">
              Register Your Brand
            </h1>

            {/* FIELD 1.1 */}
            <div className={`w-full flex flex-col`}>
              <div className="bg-primary-theme text-white font-inria lg:text-[24px] text-[20px] max-lg:leading-[20px] p-4 w-full text-center rounded-[8px_8px_0px_0px]">
                Select what you are trying to protect
              </div>
              <div className="w-full h-full rounded-[0px_0px_8px_8px] flex flex-col justify-between p-8 border border-border-color gap-8">
                <RadioGroup
                  label="Select what you are trying to protect"
                  orientation="horizontal"
                  color="primary" // TAG - 1001
                  value={wantToProtect}
                  onChange={(e) => setWantToProtect(e.target.value)}
                  size="md"
                >
                  {ServiceProvided.map((service, index) => (
                    <Radio key={index} value={service.value}>
                      {service.name}
                    </Radio>
                  ))}
                </RadioGroup>

                {wantToProtect === "logo" && (
                  <>
                    {/* TAG 1001 */}
                    <Input
                      type="text"
                      variant="underlined"
                      label={`List of colors that appears in the logo`}
                      className="w-full"
                      value={logoColors}
                      onChange={(e) => {
                        setLogoColors(e.target.value);
                      }}
                      errorMessage={errors.logoColors}
                      isInvalid={!!errors.logoColors}
                      ref={logoColorsRef}
                    />

                    {/* TAG 1001 */}
                    <Input
                      type="text"
                      variant="underlined"
                      label={`Any literal element that appears in the logo`}
                      className="w-full"
                      value={logoProtectionDescription}
                      onChange={(e) => {
                        setLogoProtectionDescription(e.target.value);
                      }}
                      errorMessage={errors.logoProtectionDescription}
                      isInvalid={!!errors.logoProtectionDescription}
                      ref={logoProtectionDescriptionRef}
                    />

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

                {wantToProtect === "name" && (
                  <Input
                    type="text"
                    variant="underlined"
                    label={`Enter the name you wish to protect`}
                    className="w-full"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    errorMessage={errors.name}
                    isInvalid={!!errors.name}
                    ref={protectNameRef}
                  />
                )}

                {wantToProtect === "slogan" && (
                  <Input
                    type="text"
                    variant="underlined"
                    label={`Enter the slogan you wish to protect`}
                    className="w-full"
                    value={slogan}
                    onChange={(e) => {
                      setSlogan(e.target.value);
                    }}
                    errorMessage={errors.slogan}
                    isInvalid={!!errors.slogan}
                    ref={sloganNameRef}
                  />
                )}

                {wantToProtect === "all-of-them" && (
                  <div className="flex flex-col gap-4 w-full">
                    <Input
                      type="text"
                      variant="underlined"
                      label="Enter the name you wish to protect"
                      className="w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      errorMessage={errors.name}
                      isInvalid={!!errors.name}
                      ref={protectNameRef}
                    />

                    <Input
                      type="text"
                      variant="underlined"
                      label="Enter the slogan you wish to protect"
                      className="w-full"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      errorMessage={errors.slogan}
                      isInvalid={!!errors.slogan}
                      ref={sloganNameRef}
                    />

                    {/* TAG 1001 */}
                    <Input
                      type="text"
                      variant="underlined"
                      label={`List of colors that appears in the logo`}
                      className="w-full"
                      value={logoColors}
                      onChange={(e) => {
                        setLogoColors(e.target.value);
                      }}
                      errorMessage={errors.logoColors}
                      isInvalid={!!errors.logoColors}
                      ref={logoColorsRef}
                    />

                    {/* TAG 1001 */}
                    <Input
                      type="text"
                      variant="underlined"
                      label={`Any literal element that appears in the logo`}
                      className="w-full"
                      value={logoProtectionDescription}
                      onChange={(e) => {
                        setLogoProtectionDescription(e.target.value);
                      }}
                      errorMessage={errors.logoProtectionDescription}
                      isInvalid={!!errors.logoProtectionDescription}
                      ref={logoProtectionDescriptionRef}
                    />

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
                          <div className="w-full mt-8">
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
                  </div>
                )}

                <Select
                  onSelectionChange={(value) => {
                    const selectedValue =
                      Array.isArray(value) || value instanceof Set
                        ? [...value][0]
                        : value;
                    setTrademarkCurrentlyBeingUsed(selectedValue);
                  }}
                  label="Are you currently using this trademark anywhere?"
                  radius="none"
                  variant="underlined"
                  errorMessage={errors.trademarkCurrentlyBeingUsed}
                  isInvalid={!!errors.trademarkCurrentlyBeingUsed}
                  ref={trademarkCurrentlyBeingUsedRef}
                >
                  <SelectItem key="yes" value="yes">
                    Yes, It is being used
                  </SelectItem>
                  <SelectItem key="no" value="no">
                    No, It&apos;s not being used anywhere
                  </SelectItem>
                </Select>

                {trademarkCurrentlyBeingUsed === "yes" && (
                  <>
                    {/* <DatePicker
                      label="Select trademark first use anywhere date"
                      variant="underlined"
                      className="w-full"
                      value={firstAnywhereDate}
                      onChange={(date) =>
                        setFirstAnywhereDate(formatDateString(date))
                      }
                      errorMessage={errors.firstAnywhereDate}
                      isInvalid={!!errors.firstAnywhereDate}
                      ref={firstAnywhereDateRef}
                    />

                    <DatePicker
                      label="Select trademark first use commerce date"
                      variant="underlined"
                      className="w-full"
                      value={firstCommenceDate}
                      onChange={setFirstCommenceDate}
                      defaultValue={parseZonedDateTime(
                        "2022-11-07T00:45[America/Los_Angeles]"
                      )}
                      errorMessage={errors.firstCommenceDate}
                      isInvalid={!!errors.firstCommenceDate}
                      ref={firstCommenceDateRef}
                    /> */}

                    <Input
                      type="text"
                      label="Select trademark first use anywhere date"
                      variant="underlined"
                      className="w-full"
                      placeholder="Ex. 10-208-2024"
                      value={firstAnywhereDate}
                      onChange={(e) => setFirstAnywhereDate(e.target.value)}
                      errorMessage={errors.firstAnywhereDate}
                      isInvalid={!!errors.firstAnywhereDate}
                      ref={firstAnywhereDateRef}
                    />

                    <Input
                      type="text"
                      label="Select trademark first use commerce date"
                      variant="underlined"
                      className="w-full"
                      placeholder="Ex. 10-208-2024"
                      value={firstCommenceDate}
                      onChange={(e) => setFirstCommenceDate(e.target.value)}
                      errorMessage={errors.firstCommenceDate}
                      isInvalid={!!errors.firstCommenceDate}
                      ref={firstCommenceDateRef}
                    />

                    <Input
                      type="text"
                      variant="underlined"
                      label="Enter ownership details affilated with your trademark"
                      className="w-full"
                      value={ownershipDetail}
                      onChange={(e) => setOwnershipDetail(e.target.value)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* FIELD 1.2 */}
          <div className="flex flex-col gap-4">
            <h1 className="font-inria text-heading-color text-[24px] w-full">
              Formation Information
            </h1>

            <div
              className={`w-full flex flex-col border border-border-color rounded-[8px] justify-start p-8 gap-4`}
            >
              <h1 className="font-inria font-bold lg:text-[24px] text-[20px] lg:leading-[26px] leading-[22px] text-heading-color">
                Will the trademark be owned by an individual or an entity such
                as a corporation or LLC?
              </h1>
              <p className="font-light text-[12px] leading-[18px]">
                Identify the owner of the trademark. This is the person or
                organization who will be the owner of record. If you choose
                individuals, you can enter as many names as you want who own the
                mark. With an organization, you will have to identify someone to
                be the person of contact for the organization.
              </p>

              <Tabs
                aria-label="owner-type"
                radius="sm"
                size="md"
                color="primary" // TAG - 1001
                fullWidth={true}
                selectedKey={selectedOwnerType}
                onSelectionChange={setSelectedOwnerType}
                classNames={{
                  tab: "h-[40px]",
                }}
              >
                <Tab key="individual" title="Individual" />
                <Tab key="organization" title="Organization" />
              </Tabs>

              {/* ORGANIZATION FIELDS 1.2.1 */}
              {selectedOwnerType === "organization" && (
                <div className="w-full h-full flex flex-col gap-8 mt-8">
                  <div className="w-full flex flex-col gap-2">
                    <Tabs
                      aria-label="formation-type"
                      size="md"
                      radius="sm"
                      color="primary" // TAG - 1001
                      fullWidth={true}
                      selectedKey={selectedFormationType}
                      onSelectionChange={setSelectedFormationType}
                      classNames={{
                        tab: "h-[40px]",
                      }}
                    >
                      <Tab key="us_based" title="Us Based" className="" />
                      <Tab
                        key="non_us_based"
                        title="Non Us Based"
                        className=""
                      />
                    </Tabs>
                  </div>

                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                      {/* FIELD 1.2.1.1 */}
                      <Input
                        type="text"
                        label="Organization Name"
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Ex. Global Giving"
                        description="Enter the name of your organization"
                        radius="sm"
                        size="lg"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        errorMessage={errors.organizationName}
                        isInvalid={!!errors.organizationName}
                        ref={organizationNameRef}
                      />

                      {/* FIELD 1.2.1.2 */}
                      <Select
                        label="Organization Type"
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Ex. C Corporation"
                        description="Select the type of your organization"
                        radius="sm"
                        size="lg"
                        value={organizationType}
                        onChange={(e) => setOrganizationType(e.target.value)}
                        ref={organizationTypeRef}
                        errorMessage={errors.organizationType}
                        isInvalid={!!errors.organizationType}
                      >
                        {OrganizationType.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                      {/* FIELD 1.2.1.3 */}
                      <Select
                        label={
                          selectedFormationType === "us_based"
                            ? "State Of Formation"
                            : "Country Of Formation"
                        }
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Ex. C Corporation"
                        description={`Select the ${
                          selectedFormationType === "us_based"
                            ? "State"
                            : "Country"
                        } of Formation `}
                        radius="sm"
                        size="lg"
                        value={
                          selectedFormationType === "us_based"
                            ? stateFormation
                            : countryFormation
                        }
                        onChange={(e) => {
                          if (selectedFormationType === "us_based") {
                            setStateFormation(e.target.value);
                          } else if (selectedFormationType === "non_us_based") {
                            setCountryFormation(e.target.value);
                          }
                        }}
                      >
                        {formationGeographicalData.map((data) => (
                          <SelectItem key={data.value} value={data.value}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </Select>

                      {/* FIELD 1.2.1.4 */}
                      <Input
                        type="text"
                        label="Organization Position"
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Ex. Global Giving"
                        description="Enter the position of your organization"
                        radius="sm"
                        size="lg"
                        value={organizationPosition}
                        onChange={(e) =>
                          setOrganizationPosition(e.target.value)
                        }
                        ref={positionRef}
                        errorMessage={errors.organizationPosition}
                        isInvalid={!!errors.organizationPosition}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PERSONAL INFORMATION FIELDS 2 */}
        <div className="w-full flex flex-col gap-4">
          <h1 className="font-inria text-heading-color text-[24px] w-full">
            Personal Information
          </h1>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="text"
              label="First Name"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. John"
              description="Enter your first name"
              radius="sm"
              size="lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              ref={firstNameRef}
              errorMessage={errors.firstName}
              isInvalid={!!errors.firstName}
            />

            <Input
              type="text"
              label="Last Name"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. Doe"
              description="Enter your last name"
              radius="sm"
              size="lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              ref={lastNameRef}
              errorMessage={errors.lastName}
              isInvalid={!!errors.lastName}
            />
          </div>

          <div className="w-full">
            <Input
              type="text"
              label="Address"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. 342 Jeffery Mills"
              description="Enter your full residential address"
              radius="sm"
              size="lg"
              startContent={
                <RiHome5Fill className="text-[20px] text-default-400 pointer-events-none flex-shrink-0" />
              }
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              ref={addressRef}
              errorMessage={errors.address}
              isInvalid={!!errors.address}
            />
          </div>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="text"
              label="City"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. San Francisco"
              description="Enter your current city"
              radius="sm"
              size="lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              ref={cityRef}
              errorMessage={errors.city}
              isInvalid={!!errors.city}
            />

            <Select
              label="State"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. Arizona"
              description="Select your current state"
              radius="sm"
              size="lg"
              value={state}
              onChange={(e) => setState(e.target.value)}
              ref={stateRef}
              errorMessage={errors.state}
              isInvalid={!!errors.state}
            >
              {GetGeographicalData("state", "US").map((data) => (
                <SelectItem key={data.value} value={data.value}>
                  {data.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="number"
              label="Phone Number"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. 561-555-7689"
              description="Enter your phone number"
              radius="sm"
              size="lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              ref={phoneRef}
              errorMessage={errors.phoneNumber}
              isInvalid={!!errors.phoneNumber}
            />

            <Input
              type="number"
              label="Landline Number"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. 916-555-2284"
              description="Enter your landline number"
              radius="sm"
              size="lg"
              value={landLineNumber}
              onChange={(e) => setLandLineNumber(e.target.value)}
            />
          </div>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="number"
              label="Zip Code"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. 99515"
              description="Enter your zip code"
              radius="sm"
              size="lg"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              ref={zipRef}
              errorMessage={errors.zipCode}
              isInvalid={!!errors.zipCode}
            />

            <Input
              type="email"
              label="Email Address"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. johndoe@example.com"
              description="Enter your email address"
              radius="sm"
              size="lg"
              startContent={
                <IoMail className="text-[20px] text-default-400 pointer-events-none flex-shrink-0" />
              }
              value={emailAddress}
              onChange={handleEmailChange}
              ref={emailRef}
              errorMessage={errors.emailAddress}
              isInvalid={!!errors.emailAddress}
            />
          </div>

          <div className="w-full">
            {/* <DatePicker
              fullWidth
              label="Preferred Contact Date"
              variant="bordered"
              labelPlacement="outside"
              description="Select your preferred date and time to call (must be business hours)"
              radius="sm"
              size="lg"
              hideTimeZone
              startContent={
                <LuClock3 className="text-[20px] text-default-400 pointer-events-none flex-shrink-0" />
              }
              value={contactTime}
              onChange={setContactTime}
            /> */}

            <Input
              type="text"
              label="Preferred Contact Date"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. 10-208-2024, 8:00 AM to 9:30 Am"
              description="Enter your preferred date and time to call (must be business hours)"
              radius="sm"
              size="lg"
              startContent={
                <LuClock3 className="text-[20px] text-default-400 pointer-events-none flex-shrink-0" />
              }
              value={contactTime}
              onChange={(e) => setContactTime(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTONS AND CAPCHA */}
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <IoMdLock className="text-[14px] -translate-y-[2px]" />

            <p className="text-[14px] font-semibold">{`Click on "Next" to save your application`}</p>
          </div>

          <div className="w-full flex max-md:flex-col max-md:gap-4 md:justify-between">
            {/* Google ReCAPTCHA */}
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
              onChange={ReCAPTCHAHandle}
              ref={reChaptchaRef}
            />
            {!reChaptcha && (
              <p
                ref={reChaptchaRef}
                className="text-[#f31260] text-sm mt-3 mb-2 capitalize"
              >
                {errors.reChaptcha}
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <Button
              onClick={handleFormSubmit}
              className="h-[60px] w-full md:w-[165px] bg-primary-theme rounded-[5px] text-white font-inria font-bold text-[20px]"
              isLoading={isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
