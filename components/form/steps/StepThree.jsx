"use client";

import Package from "../Package";
import FormLoader from "@/components/form/FormLoader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NormalLabel from "../NormalLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { saveStepFour, saveStepThree } from "@/features/formSlice";
import { _35_USD, _135_USD, _235_USD } from "@/constant/packages";
import PageLoader from "@/components/pages/PageLoader";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { SystemStepThreeData } from "@/constant/form2.0/system-step-three-data";
import { trackPackageSelected } from "@/utils/tracking";

const StepThree = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(1);
  const stepTwoData = useSelector((state) => state.form.stepTwo);
  const stepOneData = useSelector((state) => state.form.stepOne);

  useEffect(() => {
    try {
      const storedPlanId = Number(sessionStorage.getItem("lto_preselected_plan"));
      if (SystemStepThreeData.some((plan) => plan.id === storedPlanId)) {
        setSelectedPlanId(storedPlanId);
      }
      sessionStorage.removeItem("lto_preselected_plan");
    } catch {}
  }, []);

  // page authorization | redirect if previous step has no data
  if (process.env.NODE_ENV === "production" && Object.keys(stepTwoData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  // handle form submission
  const handleNext = async (data) => {
    const packageName = data.planName;
    const price = data.price;

    setLoadingPlanId(data.id);

    dispatch(saveStepThree({ packageName, price })); // store data to state
    dispatch(
      saveStepFour({
        isRushProcessing: false,
        rushAmount: 0,
        previous: true,
        receipt_ID: Math.floor(Math.random() * 900000 + 100000),
      }),
    );

    // Send step 3 data to email endpoint
    const stepThreeData = {
      ...stepOneData,
      ...stepTwoData,
      packageName,
      price,
      zoho_step: 3,
    };

    try {
      if (process.env.NODE_ENV !== "production") {
        return router.push("/trademark-register/payment");
      }
      const endPoint = "/api/save-data";
      await axios.post(endPoint, stepThreeData);
      trackPackageSelected({
        packageName,
        value: price,
        classCount: stepTwoData.estimatedClassCount,
      });
      console.log("Step 3 data sent successfully");
    } catch (error) {
      console.log("Error sending step 3 data:", error);
    }

    return router.push("/trademark-register/payment");
  };

  const selectedPlan = SystemStepThreeData.find((plan) => plan.id === selectedPlanId);

  return (
    <section className="system-page-standard-layout flex flex-col gap-7" aria-labelledby="package-plan-heading">
      <FormLoader isVisible={!!loadingPlanId} />
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-theme">Service package</p>
        <h1 id="package-plan-heading" className="mt-2 font-inria text-3xl font-bold text-heading-color sm:text-4xl">Choose your preparation plan</h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Choose the service package that matches the preparation speed, search coverage and support you want. You can review every option before continuing.</p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>USPTO government filing fees are separate from every service plan.</strong> The current estimate is $350 per class. Your final class count will be reviewed and confirmed before filing.
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
        {[...SystemStepThreeData].sort((a, b) => [1, 3, 2, 4].indexOf(a.id) - [1, 3, 2, 4].indexOf(b.id)).map((data) => {
          const selected = selectedPlanId === data.id;
          const premium = data.id === 4;
          return (
            <Card key={data.id} className={`relative flex h-full w-full flex-col overflow-visible rounded-2xl border-2 p-3 transition ${selected ? "border-blue-600 shadow-xl shadow-blue-100" : "border-slate-200 shadow-sm"}`}>
              {premium && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">Recommended</div>}
              <CardHeader className="flex w-full flex-col items-center pt-7 text-center">
                <h2 className="text-xl font-bold text-slate-900">{data.planName}</h2>
                <p className="mt-3 text-5xl font-bold text-slate-950">{data.planPrice}</p>
                <p className="mt-1 text-sm text-slate-500">Service fee charged today</p>
                <div className="mt-4 w-full rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-950">+ $350 USPTO fee per class</div>
              </CardHeader>
              <CardBody className="flex w-full flex-1 flex-col gap-5">
                {data.OfferedDetails.map((detail) => <div className="flex gap-3" key={detail.title}><FaCircleCheck className="mt-1 shrink-0 text-lg text-emerald-600" /><div><h3 className="text-sm font-bold text-slate-900">{detail.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{detail.description}</p></div></div>)}
                {data.NotOfferedDetails?.map((detail) => <div className="flex gap-3 opacity-55" key={detail.title}><IoMdCloseCircle className="mt-1 shrink-0 text-lg text-slate-500" /><div><h3 className="text-sm font-semibold text-slate-700">{detail.title}</h3></div></div>)}
              </CardBody>
              <CardFooter>
                <Button onClick={() => setSelectedPlanId(data.id)} className={`h-12 w-full rounded-xl font-bold ${selected ? "bg-blue-600 text-white" : "border-2 border-blue-600 bg-white text-blue-700"}`}>{selected ? `✓ ${data.planName} selected` : `Select ${data.planName}`}</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="sticky bottom-3 z-20 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <Button onClick={() => router.back()} className="h-14 w-full border-2 border-primary-theme bg-white px-7 font-bold text-primary-theme sm:w-auto">Previous</Button>
        <p className="text-center text-sm text-slate-600"><strong className="text-slate-900">{selectedPlan?.planName}</strong> · {selectedPlan?.planPrice} today · USPTO fees separate</p>
        <Button onClick={() => handleNext(selectedPlan)} className="h-14 w-full bg-primary-theme px-7 font-bold text-white sm:w-auto" isLoading={loadingPlanId === selectedPlanId}>Continue with {selectedPlan?.planName}</Button>
      </div>
    </section>
  );
};

export default StepThree;
