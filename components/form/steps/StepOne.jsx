"use client";

import React, { useState } from "react";
import FieldContainer from "../FieldContainer";
import BoldLabel from "../BoldLabel";
import NormalLabel from "../NormalLabel";
import SmallLabel from "../SmallLabel";
import TinyWarning from "../TinyWarning";
import InputField from "../InputField";
import RadioGroupField from "../RadioGroupField";
import { Radio, RadioGroup, Input, Button } from "@nextui-org/react";
import ContainerTab from "../ContainerTab";
import GroupContainer from "../GroupContainer";
import ButtonContainer from "../ButtonContainer";
import InputCol from "../InputCol";

const StepOne = () => {
  const [ownedBy, setOwnedBy] = useState("individual");

  const [wantToProtect, setWantToProtect] = useState("name");
  const [protectName, setProtectName] = useState("");
  const [sloganName, setSloganName] = useState("");

  const [livingPersonsName, setLivingPersonsName] = useState("yes");
  const [includingPseudonymInYours, setIncludingPseudonymInYours] =
    useState("yes");
  const [nameOfLivingPersonsInYourMark, setNameOfLivingPersonsInYourMark] =
    useState("");
  const [includingPseudonymOther, setIncludingPseudonymOther] = useState("yes");

  const [wordOtherThenEnglish, setWordOtherThenEnglish] = useState("no");
  const [englishTranslationWord, setEnglishTranslationWord] = useState("");

  const [
    currentlyUsingTrademarkInBusiness,
    setCurrentlyUsingTrademarkInBusiness,
  ] = useState("no");

  const [validate, setValidate] = useState({
    protectNameV: false,
    sloganNameV: false,
  });

  // handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // after submit validate the form
    validateForm();
  };

  // validate the form
  const validateForm = () => {
    setValidate((prev) => ({
      ...prev,
      protectNameV: protectName ? false : true,
    }));
  };

  return (
    <section className="w-[70%] max-md:w-[95%] m-auto mt-16">
      <form
        action=""
        method="post"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <FieldContainer>
          {/* Select what you are trying to protect */}
          <BoldLabel text={`Select what you are trying to protect`} />
          <RadioGroup
            orientation="horizontal"
            value={wantToProtect}
            onValueChange={setWantToProtect}
            className="gap-4"
          >
            <Radio value="name">Name</Radio>
            <Radio value="slogan">Slogan</Radio>
            <Radio value="logo">logo</Radio>
            <Radio value="all_three">All Three</Radio>
          </RadioGroup>

          {/* Enter the name you wish to protect */}
          {wantToProtect == "name" && (
            <Input
              name="protectName"
              type="text"
              variant="underlined"
              label="Enter the name you wish to protect"
              isInvalid={validate.protectNameV}
              errorMessage="This field is required!"
              value={protectName}
              onChange={(e) => setProtectName(e.target.value)}
            />
          )}

          {/* Enter the slogan you wish to protect */}
          {wantToProtect == "slogan" && (
            <Input
              name="sloganName"
              type="text"
              variant="underlined"
              label="Enter the slogan you wish to protect"
              isInvalid={validate.sloganNameV}
              errorMessage="This field is required!"
              value={sloganName}
              onChange={(e) => setSloganName(e.target.value)}
            />
          )}

          {/* Upload logo you wish to protect */}
          {wantToProtect == "logo" && (
            <>
              <br />
              <TinyWarning text={"Upload the logo you wish to protect"} />
              <Input
                name="logo"
                type="file"
                variant="flat"
                label="  "
                isInvalid={validate.sloganNameV}
                errorMessage="This field is required!"
                value={sloganName}
                onChange={(e) => setSloganName(e.target.value)}
              />
            </>
          )}
        </FieldContainer>

        <FieldContainer>
          {/* Will the trademark be owned by an individual or an entity such as a corporation or LLC? */}
          <BoldLabel
            text={`Will the trademark be owned by an individual or an entity such as a corporation or LLC?`}
          />
          <h1 className="text-xs text-slate-800 capitalize">{`Identify the owner of the trademark. This is the person or organization who will be the owner of record. If you choose individuals, you can enter as many names as you want who own the mark. With an organization, you will have to identify someone to be the person of contact for the organization.`}</h1>
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

        <FieldContainer>
          <InputCol>
            <Input
              name="protectName"
              type="text"
              variant="underlined"
              label="Please provide the english translation"
              isInvalid={false}
              errorMessage="This field is required!"
              value={englishTranslationWord}
              onChange={(e) => setEnglishTranslationWord(e.target.value)}
            />
            <Input
              name="protectName"
              type="text"
              variant="underlined"
              label="Please provide the english translation"
              isInvalid={false}
              errorMessage="This field is required!"
              value={englishTranslationWord}
              onChange={(e) => setEnglishTranslationWord(e.target.value)}
            />
          </InputCol>
          <InputCol>
            <Input
              name="protectName"
              type="text"
              variant="underlined"
              label="Please provide the english translation"
              isInvalid={false}
              errorMessage="This field is required!"
              value={englishTranslationWord}
              onChange={(e) => setEnglishTranslationWord(e.target.value)}
            />
            <Input
              name="protectName"
              type="text"
              variant="underlined"
              label="Please provide the english translation"
              isInvalid={false}
              errorMessage="This field is required!"
              value={englishTranslationWord}
              onChange={(e) => setEnglishTranslationWord(e.target.value)}
            />
          </InputCol>
        </FieldContainer>

        {/* next or previous button */}
        <ButtonContainer>
          <Button color="secondary" variant="shadow">
            Previous
          </Button>
          <Button color="primary" variant="shadow" type="submit">
            Next
          </Button>
        </ButtonContainer>
      </form>
    </section>
  );
};

export default StepOne;
