"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
// OTP DISABLED - Uncomment below imports to re-enable OTP functionality
// import { auth } from "@/firebase";
// import OTPInput from "react-otp-input";
// import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

import {
  OrganizationType,
  ServiceProvided,
} from "@/constant/form2.0/system-step-one-data";

import { GetGeographicalData } from "@/utils/get-geographical-data";

import { saveStepOne } from "@/features/formSlice";

import {
  Radio,
  RadioGroup,
  Input,
  Button,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { LuClock3, LuLoader } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { RiHome5Fill } from "react-icons/ri";

const StepOne = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // OTP DISABLED - Uncomment below line to re-enable OTP modal
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  // OTP DISABLED - Uncomment below state variables to re-enable OTP functionality
  // const [otp, setOtp] = useState("");
  // const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  // const [resendCountdown, setResendCountdown] = useState(0);
  // const [confirmationResult, setConfirmationResult] = useState(null);
  // const [otpError, setOtpError] = useState("");
  // const [resendLoading, setResendLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // Explicit flag to enable/disable captcha independent of site key
  const isCaptchaEnabled =
    !!process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY &&
    process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== "true";

  // Global validation bypass (development/production toggle)
  const isValidationDisabled =
    process.env.NEXT_PUBLIC_DISABLE_VALIDATION === "true";

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

  // FETCH GEOGRAPHICAL DATA
  useEffect(() => {
    if (selectedFormationType === "us_based") {
      setFormationGeographicalData(GetGeographicalData("state", "US"));
    } else {
      setFormationGeographicalData(GetGeographicalData("country"));
    }
  }, [selectedFormationType]);

  // OTP DISABLED - Uncomment below useEffect to re-enable Firebase RecaptchaVerifier
  // useEffect(() => {
  //   const RV = new RecaptchaVerifier(auth, "recaptcha-container-2", {
  //     size: "invisible",
  //   });
  //   setRecaptchaVerifier(RV);

  //   return () => {
  //     RV.clear();
  //   };
  // }, [auth]);

  // OTP DISABLED - Uncomment below useEffect to re-enable OTP resend countdown
  // useEffect(() => {
  //   let timer;
  //   if (resendCountdown > 0) {
  //     timer = setTimeout(() => {
  //       setResendCountdown((prevCountdown) => prevCountdown - 1);
  //     }, 1000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [resendCountdown]);

  // VALIDATE PHONE NUMBER
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, "US");
    return phoneNumberObject ? phoneNumberObject.isValid() : false;
  };

  // VALIDATE EMAIL ADRESS STRUCTURE
  const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // VALIDATE EMAIL ADRESS AUTHENTICITY - COMMENTED OUT ZEROBOUNCE VALIDATION
  // const verifyEmailWithZeroBounce = async (email) => {
  //   const API_KEY = "a19ffe28ca9f474aae800e31900febbd";

  //   try {
  //     const response = await axios.get(
  //       `https://api.zerobounce.net/v2/validate?api_key=${API_KEY}&email=${email}`
  //     );
  //     return response.data.status === "valid";
  //   } catch (error) {
  //     console.error("Error verifying email:", error);
  //     return false;
  //   }
  // };

  // EMAIL VALIDATOR ON CHANGE - SIMPLIFIED WITHOUT ZEROBOUNCE
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailAddress(email);

    if (!validateEmailFormat(email)) {
      setErrors({ emailAddress: "Please enter a valid email address." });
    } else {
      setErrors({});
    }
  };

  // VALIDATE FORM
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
    } else if (!validateEmailFormat(emailAddress)) {
      tempErrors.emailAddress = "Invalid email address";
    }
    // Only validate reCAPTCHA if enabled
    if (isCaptchaEnabled && !reChaptcha) {
      tempErrors.reChaptcha = "Please verify that you are not a robot";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length ? Object.keys(tempErrors)[0] : null;
  };

  // HANDLE RECAPTCHA
  const ReCAPTCHAHandle = (value) => {
    setReChaptcha(value);
  };

  // OTP DISABLED - Direct form submission without OTP verification
  const handleFormValidationAndSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If validation is disabled, submit immediately
    if (isValidationDisabled) {
      return handleFormSubmit();
    }

    const firstErrorField = validateForm();
    if (firstErrorField) {
      setIsLoading(false);
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

      if (errorRefs[firstErrorField] && errorRefs[firstErrorField].current) {
        errorRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
        });

        setTimeout(() => {
          window.scrollBy({
            top: -100,
            behavior: "smooth",
          });
        }, 500);
      }
      return;
    }

    // Skip OTP verification and directly submit the form
    handleFormSubmit();
  };

  // OTP DISABLED - Uncomment below function to re-enable OTP verification
  // const OtpVerification = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const firstErrorField = validateForm();
  //   if (firstErrorField) {
  //     setIsLoading(false);
  //     const errorRefs = {
  //       name: protectNameRef,
  //       slogan: sloganNameRef,
  //       logo: logoRef,
  //       logoColors: logoColorsRef,
  //       logoProtectionDescription: logoProtectionDescriptionRef,
  //       trademarkCurrentlyBeingUsed: trademarkCurrentlyBeingUsedRef,
  //       firstAnywhereDate: firstAnywhereDateRef,
  //       firstCommenceDate: firstCommenceDateRef,
  //       organizationName: organizationNameRef,
  //       organizationType: organizationTypeRef,
  //       countryFormation: countryOfFormationRef,
  //       stateFormation: stateOfFormationRef,
  //       organizationPosition: positionRef,
  //       firstName: firstNameRef,
  //       lastName: lastNameRef,
  //       address: addressRef,
  //       city: cityRef,
  //       state: stateRef,
  //       zipCode: zipRef,
  //       phoneNumber: phoneRef,
  //       emailAddress: emailRef,
  //       reChaptcha: reChaptchaRef,
  //     };

  //     if (errorRefs[firstErrorField] && errorRefs[firstErrorField].current) {
  //       errorRefs[firstErrorField].current.scrollIntoView({
  //         behavior: "smooth",
  //       });

  //       setTimeout(() => {
  //         window.scrollBy({
  //           top: -100,
  //           behavior: "smooth",
  //         });
  //       }, 500);
  //     }
  //     return;
  //   }

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       `+1` + phoneNumber,
  //       recaptchaVerifier
  //     );
  //     onOpen();
  //     setResendCountdown(60);
  //     setConfirmationResult(confirmationResult);
  //     setIsLoading(false);
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.log("Failed to send OTP:", err);

  //     if (err.code === "auth/invalid-phone-number") {
  //       setErrors((...prev) => ({
  //         ...prev,
  //         phoneNumber: "Invalid phone number, Please enter a valid number.",
  //       }));
  //     } else if (err.code === "auth/too-many-requests") {
  //       alert("Too many requests. Please try again.");
  //     } else {
  //       alert("Failed to send OTP. Please try again.");
  //     }
  //   }
  // };

  // OTP DISABLED - Uncomment below function to re-enable OTP verification
  // const verifyOtp = async () => {
  //   setOtpError("");
  //   setIsLoading(true);
  //   try {
  //     await confirmationResult?.confirm(otp);
  //     handleFormSubmit();
  //   } catch (error) {
  //     console.log("Failed to verify OTP. Please check the OTP:", error);
  //     setOtpError("Failed to verify OTP. Please check the OTP.");
  //     setIsLoading(false);
  //   }
  // };

  // OTP DISABLED - Uncomment below function to re-enable OTP resend functionality
  // const requestOtp = async (e) => {
  //   setResendCountdown(60);
  //   setOtpError("");
  //   setResendLoading(true);

  //   if (!recaptchaVerifier) {
  //     return setOtpError("Please verify that you are not a robot.");
  //   }

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       `+1` + phoneNumber,
  //       recaptchaVerifier
  //     );
  //     setResendCountdown(60);
  //     setConfirmationResult(confirmationResult);
  //   } catch (err) {
  //     console.log("Failed to resend OTP:", err);

  //     if (err.code === "auth/invalid-phone-number") {
  //       setErrors((...prev) => ({
  //         ...prev,
  //         phoneNumber: "Invalid phone number, Please enter a valid number.",
  //       }));
  //     } else if (err.code === "auth/too-many-requests") {
  //       setOtpError("Too many requests. Please try again.");
  //     } else {
  //       setOtpError("Failed to send OTP. Please try again.");
  //     }
  //   }
  //   setResendLoading(false);
  // };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = async (e) => {
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

    // FILTER OUT EMPTY AND UNDEFINED PROPERTIES
    const stepOneWithValues = Object.fromEntries(
      Object.entries(stepOne).filter(([_, value]) => value !== "")
    );

    dispatch(saveStepOne(stepOneWithValues));

    // SEND DATA TO MAIL AND ZOHO
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
                color="primary"
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
                      color="primary"
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
              errorMessage={errors.emailAddress}
              isInvalid={!!errors.emailAddress}
            />
          </div>

          <div className="w-full">
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
            {/* Google ReCAPTCHA - Only show if site key is available */}
            {/* {process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY && (
              <>
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
              </>
            )} */}
            
            {/* Show message when reCAPTCHA is disabled for testing */}
            {/* {!process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY && (
              <div className="text-sm text-gray-600 italic">
                reCAPTCHA disabled for testing
              </div>
            )} */}

            {/* SUBMIT BUTTON */}
            <Button
              onClick={handleFormValidationAndSubmit}
              className="h-[60px] w-full md:w-[165px] bg-primary-theme rounded-[5px] text-white font-inria font-bold text-[20px]"
              isLoading={isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* OTP DISABLED - Uncomment below modal to re-enable OTP verification */}
      {/* <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        isDismissable={false}
        backdrop={"blur"}
        hideCloseButton={true}
        className="py-4"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Phone OTP Verification
              </ModalHeader>
              <ModalBody>
                <p className="text-xs mt-[-15px] mb-3">
                  An OTP has been sent to your phone number. Please enter the
                  OTP below to continue the process.
                </p>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={
                    <span className="p-1 text-slate-300"> • </span>
                  }
                  renderInput={(props) => (
                    <Input
                      variant="bordered"
                      onClick={() => setOtpError("")}
                      {...props}
                    />
                  )}
                />

                {otpError && (
                  <p className="text-[#f31260] text-sm mt-4 capitalize text-center">
                    {otpError}
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="mt-1 flex-between">
                <Button
                  color="danger"
                  variant="light"
                  size={`sm`}
                  onPress={onClose}
                >
                  Edit Number
                </Button>
                <Button
                  color="warning"
                  variant="light"
                  size={`sm`}
                  onPress={requestOtp}
                  isDisabled={resendCountdown > 0}
                >
                  {resendCountdown > 0
                    ? `Resend in ${resendCountdown}s`
                    : `Resend OTP`}
                </Button>
                <Button
                  color="primary"
                  size={`sm`}
                  onPress={verifyOtp}
                  isLoading={isLoading}
                >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}

      {/* OTP DISABLED - Uncomment below div to re-enable OTP recaptcha */}
        {/* <div id="recaptcha-container-2" /> */}
    </section>
  );
};

export default StepOne;
