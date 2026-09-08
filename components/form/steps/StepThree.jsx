"use client";

import PackageComparison, { REVIEW_PLANS } from "../PackageComparison";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { saveStepFour, saveStepThree } from "@/features/formSlice";
import { trackPackageSelected } from "@/utils/tracking";

const StepThree = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const savedPackage = useSelector((state) => state.form.stepThree);
  const savedCheckout = useSelector((state) => state.form.stepFour);
  const [selectedPlanId, setSelectedPlanId] = useState(() => REVIEW_PLANS.find(plan => plan.planName === savedPackage.packageName || plan.price === savedPackage.price)?.id || 2);
  const stepTwoData = useSelector((state) => state.form.stepTwo);
  const stepOneData = useSelector((state) => state.form.stepOne);

  useEffect(() => {
    try {
      const storedPlan = sessionStorage.getItem("lto_preselected_plan");
      const storedPlanId = Number(storedPlan);
      if (storedPlan !== null && REVIEW_PLANS.some((plan) => plan.id === storedPlanId)) {
        setSelectedPlanId(storedPlanId);
      }
      sessionStorage.removeItem("lto_preselected_plan");
    } catch {}
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && Object.keys(stepTwoData).length === 0) router.replace("/trademark-register");
  }, [router, stepTwoData]);

  // handle form submission
  const handleNext = async (data) => {
    if (loadingPlanId !== null) return;
    const packageName = data.planName;
    const price = data.price;

    setLoadingPlanId(data.id);

    dispatch(saveStepThree({ packageName, price })); // store data to state
    dispatch(
      saveStepFour({
        websiteSupportInterest: Boolean(savedCheckout.websiteSupportInterest),
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

    if (process.env.NODE_ENV !== "production") {
      return router.push("/trademark-register/payment");
    }
    const endPoint = "/api/save-data";
    void axios.post(endPoint, stepThreeData).then(() => {
      trackPackageSelected({
        packageName,
        value: price,
        classCount: stepTwoData.estimatedClassCount,
      });
      console.log("Step 3 data sent successfully");
    }).catch((error) => {
      console.log("Error sending step 3 data:", error);
    });
    setLoadingPlanId(null);
    return router.push("/trademark-register/payment");
  };

  return <PackageComparison selectedId={selectedPlanId} onSelect={setSelectedPlanId} onContinue={handleNext} onBack={() => router.push("/trademark-register/step-2")} loading={loadingPlanId !== null} />;
};

export default StepThree;
