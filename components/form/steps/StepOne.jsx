"use client";

import React, { useEffect, useRef, useState } from "react";
import FormLoader from "@/components/form/FormLoader";
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
  trackFormStart,
  trackQualifiedLead,
  prepareEnhancedConversionData,
  getClickIds,
} from "@/utils/tracking";

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
import { HiOutlinePhotograph, HiOutlineSparkles, HiOutlineLightBulb, HiOutlineCloudUpload, HiOutlineTrash } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { LuMusic2, LuShieldCheck } from "react-icons/lu";
import GoogleAddressAutocomplete from "../GoogleAddressAutocomplete";

const protectionOptions = [
  {
    value: "name",
    title: "Business or product name",
    description: "Protect the words customers use to find and recognize you.",
    icon: MdOutlineBusinessCenter,
    badge: "Most popular",
  },
  {
    value: "logo",
    title: "Logo or design",
    description: "Protect a visual mark, symbol, icon or stylized design.",
    icon: HiOutlinePhotograph,
  },
  {
    value: "slogan",
    title: "Slogan or tagline",
    description: "Protect a memorable phrase associated with your brand.",
    icon: HiOutlineSparkles,
  },
  {
    value: "sound",
    title: "Sound mark",
    description: "Protect a distinctive jingle, tone or audio signature.",
    icon: LuMusic2,
    badge: "Specialty",
  },
];

const StepOne = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [intakeSection, setIntakeSection] = useState(0);
  // OTP DISABLED - Uncomment below line to re-enable OTP modal
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [wantToProtect, setWantToProtect] = useState(["name"]);

  useEffect(() => {
    try {
      const preselectedMark = sessionStorage.getItem("lto_preselected_mark");
      if (["name", "logo", "slogan", "sound"].includes(preselectedMark)) {
        setWantToProtect([preselectedMark]);
        sessionStorage.removeItem("lto_preselected_mark");
      }
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
  }, []);
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
  const [soundDescription, setSoundDescription] = useState("");
  const [soundFile, setSoundFile] = useState("");
  const [soundFileName, setSoundFileName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [formationGeographicalData, setFormationGeographicalData] = useState(
    [],
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

  const handleAddressSelect = React.useCallback((selection) => {
    setAddress(selection.address);
    setCity(selection.city);
    setState(selection.state);
    setZipCode(selection.zipCode);
    ["address", "city", "state", "zipCode"].forEach(clearError);
  }, []);

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
    process.env.NODE_ENV === "production" &&
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

  // Helper functions to clear field-specific errors as user types/selects
  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev || !prev[field]) return prev || {};
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const setValueAndClearError = (setter, field) => (e) => {
    trackFormStart(); // fires once per visitor
    setter(e.target.value);
    clearError(field);
  };

  const setSelectionAndClearError = (setter, field) => (value) => {
    trackFormStart(); // fires once per visitor
    const selectedValue =
      Array.isArray(value) || value instanceof Set ? [...value][0] : value;
    setter(selectedValue);
    clearError(field);
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
      setErrors((prev) => ({
        ...(prev || {}),
        emailAddress: "Please enter a valid email address.",
      }));
    } else {
      clearError("emailAddress");
    }
  };

  // VALIDATE FORM
  const validateForm = () => {
    let tempErrors = {};

    if (wantToProtect.includes("name") && !name) tempErrors.name = "Name is required";
    if (wantToProtect.includes("slogan") && !slogan)
      tempErrors.slogan = "Slogan is required";
    if (wantToProtect.includes("sound") && !soundDescription)
      tempErrors.soundDescription = "Please describe the sound mark";
    if (wantToProtect.includes("sound") && !soundFile)
      tempErrors.soundFile = "Please upload the sound you want to protect";
    if (wantToProtect.includes("logo") && !logo) tempErrors.logo = "Logo is required";
    if (wantToProtect.includes("logo") && !logo && !logoColors)
      tempErrors.logoColors = "Logo colors is required";
    if (wantToProtect.includes("logo") && !logo && !logoProtectionDescription)
      tempErrors.logoProtectionDescription =
        "Logo protection description is required";
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
    } else if (
      process.env.NODE_ENV === "production" &&
      !validatePhoneNumber(phoneNumber)
    ) {
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
  // Validates ONLY the mark-details fields shown in section 0, so the user
  // cannot skip ahead to owner details with an empty application.
  const handleContinueToOwnerDetails = () => {
    if (isValidationDisabled) {
      setIntakeSection(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const tempErrors = {};

    if (!wantToProtect || wantToProtect.length === 0) {
      tempErrors.wantToProtect = "Select what you want to protect";
    }
    if (wantToProtect.includes("name") && !name)
      tempErrors.name = "Name is required";
    if (wantToProtect.includes("slogan") && !slogan)
      tempErrors.slogan = "Slogan is required";
    if (wantToProtect.includes("sound") && !soundDescription)
      tempErrors.soundDescription = "Please describe the sound mark";
    if (wantToProtect.includes("sound") && !soundFile)
      tempErrors.soundFile = "Please upload the sound you want to protect";
    if (wantToProtect.includes("logo") && !logo)
      tempErrors.logo = "Logo is required";
    if (!trademarkCurrentlyBeingUsed)
      tempErrors.trademarkCurrentlyBeingUsed = "Please select an option";
    if (trademarkCurrentlyBeingUsed === "yes" && !firstAnywhereDate)
      tempErrors.firstAnywhereDate = "Please select first use anywhere date";
    if (trademarkCurrentlyBeingUsed === "yes" && !firstCommenceDate)
      tempErrors.firstCommenceDate = "Please select first use commerce date";

    setErrors(tempErrors);

    const firstErrorField = Object.keys(tempErrors)[0];
    if (firstErrorField) {
      const errorRefs = {
        name: protectNameRef,
        slogan: sloganNameRef,
        logo: logoRef,
        trademarkCurrentlyBeingUsed: trademarkCurrentlyBeingUsedRef,
        firstAnywhereDate: firstAnywhereDateRef,
        firstCommenceDate: firstCommenceDateRef,
      };
      errorRefs[firstErrorField]?.current?.scrollIntoView?.({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setIntakeSection(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      if (
        errorRefs[firstErrorField] &&
        typeof errorRefs[firstErrorField].current?.scrollIntoView === "function"
      ) {
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
      wantToProtect: wantToProtect.join(", "),
      protectionTypes: wantToProtect,
      name,
      slogan,
      soundDescription,
      soundFile,
      soundFileName,
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
      // Include reCAPTCHA token for server-side verification
      reChaptcha,
      zoho_step: 1,
      // Ad click ids so this lead can be attributed back to the click
      ...getClickIds(),
    };

    // FILTER OUT EMPTY AND UNDEFINED PROPERTIES
    const stepOneWithValues = Object.fromEntries(
      Object.entries(stepOne).filter(([_, value]) => value !== ""),
    );

    dispatch(saveStepOne(stepOneWithValues));

    // Local preview mode must not create CRM records or ad conversions.
    if (process.env.NODE_ENV !== "production") {
      setIsLoading(false);
      return router.push("/trademark-register/step-2");
    }

    // SEND DATA TO MAIL AND ZOHO
    const endPoint = "/api/save-data";

    axios
      .post(endPoint, stepOneWithValues)
      .then(async (res) => {
        if (res.data.success) {
          await prepareEnhancedConversionData({ email: emailAddress, phone: phoneNumber });
          // Backend confirmed the lead was created — safe to count it.
          trackQualifiedLead(String(stepOne.customer_ID), {
            protectionCount: wantToProtect.length,
            protectionTypes: wantToProtect,
          });
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
      <FormLoader isVisible={isLoading} />
      <div className="w-full h-full flex flex-col gap-8">
        {/* SERVICE INFORMATION FIELDS 1 */}
        <div className="w-full h-full grid grid-cols-1 gap-12">
          {intakeSection === 0 && <div className="flex flex-col gap-5">
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-theme">Your trademark</p>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">About 3 minutes</span>
              </div>
              <h1 className="font-inria text-heading-color text-3xl font-bold sm:text-4xl">
                What would you like to protect?
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Select one or more. Each selected type will open its own short set of questions.
              </p>
            </div>

            {/* FIELD 1.1 */}
            <div className={`w-full flex flex-col`}>
              <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {protectionOptions.map((option) => {
                    const Icon = option.icon;
                    const selected = wantToProtect.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setWantToProtect((current) =>
                            selected
                              ? current.length === 1
                                ? current
                                : current.filter((value) => value !== option.value)
                              : [...current, option.value],
                          );
                          trackFormStart();
                        }}
                        className={`relative flex min-h-[142px] w-full flex-col items-start rounded-2xl border-2 p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 ${selected ? "border-blue-600 bg-blue-50/70 shadow-sm" : "border-slate-200 bg-white"}`}
                      >
                        {option.badge && (
                          <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                            {option.badge}
                          </span>
                        )}
                        <span className={`mb-3 grid h-11 w-11 place-items-center rounded-xl text-2xl ${selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                          <Icon />
                        </span>
                        <span className="pr-16 text-base font-bold text-slate-900">{option.title}</span>
                        <span className="mt-1 text-sm leading-5 text-slate-600">{option.description}</span>
                        <span className={`absolute bottom-4 right-4 grid h-6 w-6 place-items-center rounded-full border-2 ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"}`}>
                          {selected && "✓"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  <HiOutlineLightBulb className="mt-0.5 shrink-0 text-xl" />
                  <p><strong>Not sure?</strong> Choose the version customers see most often. A name and a logo are usually filed as separate applications because they protect different things.</p>
                </div>

                <div className="mt-7 flex flex-col gap-6 border-t border-slate-100 pt-7">

                {wantToProtect.includes("logo") && (
                  <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Upload your logo or design</h2>
                      <p className="mt-1 text-sm text-slate-600">Use the clearest version available. You can replace it before checkout.</p>
                    </div>
                    <CldUploadWidget
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
                      options={{ multiple: false, resourceType: "image", clientAllowedFormats: ["png", "jpg", "jpeg", "webp", "svg"], maxFileSize: 10000000 }}
                      onSuccess={(results) => {
                        const public_url = results?.info?.secure_url || results?.info?.url;
                        setLogo(public_url);
                        clearError("logo");
                      }}
                      onOpen={() => setIsUploading(true)}
                      onClose={() => setIsUploading(false)}
                    >
                      {({ open }) => (
                        <div className="w-full" ref={logoRef}>
                          {!logo ? (
                            <button
                              type="button"
                              onClick={() => open()}
                              disabled={isUploading}
                              className="group flex min-h-[190px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-white px-6 py-8 text-center transition hover:border-blue-600 hover:bg-blue-50/60 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-wait disabled:opacity-70"
                            >
                              <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-100 text-3xl text-blue-700 transition group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                                {isUploading ? <LuLoader className="animate-spin" /> : <HiOutlineCloudUpload />}
                              </span>
                              <span className="text-base font-bold text-slate-900">Click to upload your logo</span>
                              <span className="mt-1 text-sm text-slate-500">or drag and drop in the upload window</span>
                              <span className="mt-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">PNG, JPG, WEBP or SVG · Max 10 MB</span>
                            </button>
                          ) : (
                            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center">
                              <div className="grid h-24 w-full place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:w-32">
                                <Image src={logo} alt="Uploaded trademark logo" width={160} height={96} className="max-h-20 w-auto object-contain" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-emerald-900">Logo uploaded successfully</p>
                                <p className="mt-1 text-sm text-emerald-800">This image will be included with your application details.</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <button type="button" onClick={() => open()} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm ring-1 ring-slate-200">Replace image</button>
                                  <button type="button" onClick={() => setLogo("")} className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50"><HiOutlineTrash /> Remove</button>
                                </div>
                              </div>
                            </div>
                          )}
                          {!!errors.logo && <p className="mt-2 text-xs text-rose-600">Please upload a logo or design.</p>}
                        </div>
                      )}
                    </CldUploadWidget>

                    {/* TAG 1001 */}
                    <Input
                      type="text"
                      variant="bordered"
                      labelPlacement="outside"
                      radius="lg"
                      size="lg"
                      placeholder="Example: blue, gold and white"
                      label={`List of colors that appears in the logo`}
                      className="w-full"
                      value={logoColors}
                      onChange={(e) => {
                        setLogoColors(e.target.value);
                        clearError("logoColors");
                      }}
                      errorMessage={errors.logoColors}
                      isInvalid={!!errors.logoColors}
                      ref={logoColorsRef}
                    />

                    {/* TAG 1001 */}
                    <Input
                      type="text"
                      variant="bordered"
                      labelPlacement="outside"
                      radius="lg"
                      size="lg"
                      placeholder="Example: ACME with a mountain symbol"
                      label={`Any literal element that appears in the logo`}
                      className="w-full"
                      value={logoProtectionDescription}
                      onChange={(e) => {
                        setLogoProtectionDescription(e.target.value);
                        clearError("logoProtectionDescription");
                      }}
                      errorMessage={errors.logoProtectionDescription}
                      isInvalid={!!errors.logoProtectionDescription}
                      ref={logoProtectionDescriptionRef}
                    />

                  </div>
                )}

                {wantToProtect.includes("name") && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                  <Input
                    type="text"
                    variant="bordered"
                    labelPlacement="outside"
                    radius="lg"
                    size="lg"
                    label="Business or product name"
                    placeholder="Enter the exact spelling of your mark"
                    description="Include punctuation and spacing exactly as you use it."
                    className="w-full"
                    value={name}
                    onChange={setValueAndClearError(setName, "name")}
                    errorMessage={errors.name}
                    isInvalid={!!errors.name}
                    ref={protectNameRef}
                  />
                  </div>
                )}

                {wantToProtect.includes("slogan") && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                  <Input
                    type="text"
                    variant="bordered"
                    labelPlacement="outside"
                    radius="lg"
                    size="lg"
                    label="Slogan or tagline"
                    placeholder="Enter the complete phrase"
                    description="Use the exact words and punctuation customers see."
                    className="w-full"
                    value={slogan}
                    onChange={setValueAndClearError(setSlogan, "slogan")}
                    errorMessage={errors.slogan}
                    isInvalid={!!errors.slogan}
                    ref={sloganNameRef}
                  />
                  </div>
                )}

                {wantToProtect.includes("sound") && (
                  <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Upload your sound mark</h2>
                      <p className="mt-1 text-sm text-slate-600">Provide the clearest audio-only version of the sound customers recognize.</p>
                    </div>

                    <CldUploadWidget
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
                      options={{ multiple: false, resourceType: "video", clientAllowedFormats: ["mp3", "wav", "m4a", "ogg"], maxFileSize: 20000000 }}
                      onSuccess={(results) => {
                        const uploadedUrl = results?.info?.secure_url || results?.info?.url;
                        setSoundFile(uploadedUrl || "");
                        setSoundFileName(results?.info?.original_filename || "Uploaded sound mark");
                        clearError("soundFile");
                      }}
                      onOpen={() => setIsUploading(true)}
                      onClose={() => setIsUploading(false)}
                    >
                      {({ open }) => (
                        <div>
                          {!soundFile ? (
                            <button
                              type="button"
                              onClick={() => open()}
                              disabled={isUploading}
                              className="group flex min-h-[175px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-300 bg-white px-6 py-8 text-center transition hover:border-violet-600 hover:bg-violet-50/60 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:cursor-wait disabled:opacity-70"
                            >
                              <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-violet-100 text-3xl text-violet-700 transition group-hover:scale-105 group-hover:bg-violet-600 group-hover:text-white">
                                {isUploading ? <LuLoader className="animate-spin" /> : <LuMusic2 />}
                              </span>
                              <span className="text-base font-bold text-slate-900">Click to upload your sound</span>
                              <span className="mt-1 text-sm text-slate-500">Choose a clean recording without extra speech</span>
                              <span className="mt-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">MP3, WAV, M4A or OGG · Max 20 MB</span>
                            </button>
                          ) : (
                            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                              <div className="flex items-center gap-3">
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-600 text-xl text-white"><LuMusic2 /></span>
                                <div className="min-w-0 flex-1"><p className="truncate font-bold text-violet-950">{soundFileName}</p><p className="text-xs text-violet-700">Audio uploaded successfully</p></div>
                              </div>
                              <audio controls src={soundFile} className="mt-4 h-10 w-full" preload="metadata">Your browser does not support audio playback.</audio>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <button type="button" onClick={() => open()} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-violet-700 shadow-sm ring-1 ring-slate-200">Replace audio</button>
                                <button type="button" onClick={() => { setSoundFile(""); setSoundFileName(""); }} className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50"><HiOutlineTrash /> Remove</button>
                              </div>
                            </div>
                          )}
                          {errors.soundFile && <p className="mt-2 text-xs text-rose-600">{errors.soundFile}</p>}
                        </div>
                      )}
                    </CldUploadWidget>

                    <div>
                    <label className="mb-2 block text-sm font-bold text-slate-900">Describe the sound you want to protect</label>
                    <textarea
                      value={soundDescription}
                      onChange={(event) => {
                        setSoundDescription(event.target.value);
                        clearError("soundDescription");
                      }}
                      placeholder="Example: a three-note ascending chime used at the end of our advertisements"
                      rows={4}
                      className={`w-full resize-y rounded-xl border bg-white p-4 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${errors.soundDescription ? "border-rose-500" : "border-slate-300"}`}
                    />
                    {errors.soundDescription && <p className="mt-1 text-xs text-rose-600">{errors.soundDescription}</p>}
                    <p className="mt-2 text-xs leading-5 text-slate-600">Sound marks require an audio specimen. Our team will explain the accepted file requirements before filing.</p>
                    </div>
                  </div>
                )}

                <fieldset ref={trademarkCurrentlyBeingUsedRef}>
                  <legend className="mb-3 text-base font-bold text-slate-900">Are you currently using this trademark in business?</legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { value: "yes", title: "Yes, I’m using it", copy: "Customers can already encounter this mark." },
                      { value: "no", title: "Not yet", copy: "I plan to use this mark in the future." },
                    ].map((option) => {
                      const selected = trademarkCurrentlyBeingUsed === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                            setTrademarkCurrentlyBeingUsed(option.value);
                            clearError("trademarkCurrentlyBeingUsed");
                          }}
                          className={`rounded-xl border-2 p-4 text-left transition hover:border-blue-400 ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"}`}
                        >
                          <span className="flex items-center justify-between font-bold text-slate-900">
                            {option.title}
                            <span className={`grid h-5 w-5 place-items-center rounded-full border text-xs ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}>{selected ? "✓" : ""}</span>
                          </span>
                          <span className="mt-1 block text-sm text-slate-600">{option.copy}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.trademarkCurrentlyBeingUsed && <p className="mt-2 text-xs text-rose-600">{errors.trademarkCurrentlyBeingUsed}</p>}
                </fieldset>

                {trademarkCurrentlyBeingUsed === "yes" && (
                  <>
                    <Input
                      type="date"
                      label="First used anywhere"
                      variant="bordered"
                      labelPlacement="outside"
                      className="w-full"
                      value={firstAnywhereDate}
                      onChange={setValueAndClearError(
                        setFirstAnywhereDate,
                        "firstAnywhereDate",
                      )}
                      errorMessage={errors.firstAnywhereDate}
                      isInvalid={!!errors.firstAnywhereDate}
                      ref={firstAnywhereDateRef}
                    />

                    <Input
                      type="date"
                      label="First used in interstate commerce"
                      variant="bordered"
                      labelPlacement="outside"
                      className="w-full"
                      value={firstCommenceDate}
                      onChange={setValueAndClearError(
                        setFirstCommenceDate,
                        "firstCommenceDate",
                      )}
                      errorMessage={errors.firstCommenceDate}
                      isInvalid={!!errors.firstCommenceDate}
                      ref={firstCommenceDateRef}
                    />

                    <Input
                      type="text"
                      variant="bordered"
                      labelPlacement="outside"
                      radius="lg"
                      size="lg"
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
            <div className="sticky bottom-3 z-20 mt-2 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
              <div className="hidden items-center gap-2 text-sm text-slate-600 sm:flex"><LuShieldCheck className="text-xl text-emerald-600" /> Saved securely as you continue</div>
              <Button
                className="h-[56px] w-full bg-primary-theme px-8 text-lg font-bold text-white sm:w-auto"
                onClick={handleContinueToOwnerDetails}
              >
                Continue to owner details
              </Button>
            </div>
          </div>}

          {/* FIELD 1.2 */}
          {intakeSection === 1 && <>
          <div className="flex flex-col gap-4">
            <h1 className="font-inria text-heading-color text-[24px] w-full">
              Formation Information
            </h1>

            <div
              className={`w-full flex flex-col border border-slate-200 bg-white shadow-sm rounded-2xl justify-start p-4 sm:p-7 gap-4`}
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
                        onChange={setValueAndClearError(
                          setOrganizationName,
                          "organizationName",
                        )}
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
                        selectedKeys={
                          organizationType
                            ? new Set([organizationType])
                            : new Set()
                        }
                        onSelectionChange={(keys) => {
                          setOrganizationType([...keys][0] || "");
                          clearError("organizationType");
                        }}
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
                        selectedKeys={new Set(
                          [selectedFormationType === "us_based"
                            ? stateFormation
                            : countryFormation].filter(Boolean),
                        )}
                        onSelectionChange={(keys) => {
                          const selectedValue = [...keys][0] || "";
                          if (selectedFormationType === "us_based") {
                            setStateFormation(selectedValue);
                            clearError("stateFormation");
                          } else if (selectedFormationType === "non_us_based") {
                            setCountryFormation(selectedValue);
                            clearError("countryFormation");
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
                        onChange={setValueAndClearError(
                          setOrganizationPosition,
                          "organizationPosition",
                        )}
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
          </>}
        </div>

        {/* PERSONAL INFORMATION FIELDS 2 */}
        {intakeSection === 1 && <>
          <div className="w-full flex flex-col gap-4">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <LuShieldCheck className="mt-0.5 shrink-0 text-2xl text-emerald-700" />
              <div><h1 className="font-inria text-xl font-bold text-slate-900">Your private contact information</h1><p className="mt-1 text-sm leading-5 text-slate-600">Used only for your application, filing questions and status updates. We do not sell your details.</p></div>
            </div>
          </div>

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
              onChange={setValueAndClearError(setFirstName, "firstName")}
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
              onChange={setValueAndClearError(setLastName, "lastName")}
              ref={lastNameRef}
              errorMessage={errors.lastName}
              isInvalid={!!errors.lastName}
            />
          </div>

          <GoogleAddressAutocomplete
            value={address}
            onChange={setValueAndClearError(setAddress, "address")}
            onAddressSelect={handleAddressSelect}
            inputRef={addressRef}
            errorMessage={errors.address}
          />

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
              onChange={setValueAndClearError(setCity, "city")}
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
              selectedKeys={state ? new Set([state]) : new Set()}
              onSelectionChange={(keys) => {
                setState([...keys][0] || "");
                clearError("state");
              }}
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

          <div className="w-full">
            <Input
              type="tel"
              label="Phone Number"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. 561-555-7689"
              description="Enter your phone number"
              radius="sm"
              size="lg"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                clearError("phoneNumber");
              }}
              ref={phoneRef}
              errorMessage={errors.phoneNumber}
              isInvalid={!!errors.phoneNumber}
            />

          </div>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="text"
              label="Zip Code"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Ex. 99515"
              description="Enter your zip code"
              radius="sm"
              size="lg"
              value={zipCode}
              onChange={setValueAndClearError(setZipCode, "zipCode")}
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

          <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-slate-700">
            <LuShieldCheck className="mt-0.5 shrink-0 text-xl text-emerald-700" />
            <p><strong className="text-slate-900">Your information is securely saved.</strong> Contact and application details are encrypted in transit and used to prepare and manage your trademark request.</p>
          </div>
        </div>

        {/* BUTTONS AND CAPCHA */}
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <IoMdLock className="text-[14px] -translate-y-[2px]" />

            <p className="text-[14px] font-semibold">{`Click on "Next" to save your application`}</p>
          </div>

          <div className="sticky bottom-3 z-20 grid w-full grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur sm:static sm:grid-cols-[auto_1fr_auto] sm:items-center sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
            {/* Google reCAPTCHA - render when enabled */}
            {isCaptchaEnabled && (
              <>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
                  onChange={ReCAPTCHAHandle}
                  ref={reChaptchaRef}
                />
                {!reChaptcha && !!errors.reChaptcha && (
                  <p
                    ref={reChaptchaRef}
                    className="text-[#f31260] text-sm mt-3 mb-2 capitalize"
                  >
                    {errors.reChaptcha}
                  </p>
                )}
              </>
            )}

            <Button
              onClick={() => setIntakeSection(0)}
              className="h-14 w-full border-2 border-primary-theme bg-white px-7 text-base font-bold text-primary-theme sm:w-auto"
            >
              Back
            </Button>

            {/* SUBMIT BUTTON */}
            <Button
              onClick={handleFormValidationAndSubmit}
              className="h-14 w-full bg-primary-theme px-7 text-base font-bold text-white sm:w-auto"
              isLoading={isLoading}
            >
              Save and continue
            </Button>
          </div>
        </div>
        </>}
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
