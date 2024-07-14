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

const StepOne = () => {
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
          {/* living person's name */}
          <BoldLabel
            text={`Does your mark include a living person's name—even if a stage name or pseudonym or could it be perceived to include a person's name?`}
          />
          <RadioGroup
            orientation="horizontal"
            value={livingPersonsName}
            onValueChange={setLivingPersonsName}
            className="gap-4"
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
          {livingPersonsName === "yes" && (
            <ContainerTab>
              {/* including a pseudonym, nickname or stage name in yours */}
              <NormalLabel
                text={`Does your mark include a name (including a pseudonym, nickname or stage name) that is yours?`}
              />
              <RadioGroup
                orientation="horizontal"
                value={includingPseudonymInYours}
                onValueChange={setIncludingPseudonymInYours}
                className="gap-4"
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
              {includingPseudonymInYours === "yes" ? (
                <GroupContainer>
                  {/* PLEASE TYPE THE LEGAL NAME TO WHOM THE MARK REFERENCES. */}
                  <br />
                  <SmallLabel
                    text={`PLEASE TYPE THE LEGAL NAME TO WHOM THE MARK REFERENCES.`}
                  />
                  <Input
                    name="protectName"
                    type="text"
                    variant="underlined"
                    label="What is the name of the living person in your mark?"
                    isInvalid={false}
                    errorMessage="This field is required!"
                    value={nameOfLivingPersonsInYourMark}
                    onChange={(e) =>
                      setNameOfLivingPersonsInYourMark(e.target.value)
                    }
                  />
                </GroupContainer>
              ) : (
                <>
                  <GroupContainer>
                    {/* including a pseudonym, nickname or stage name other than yours */}
                    <NormalLabel
                      text={`Does your mark include a name (including a pseudonym, nickname or stage name) that is not yours?`}
                    />
                    <RadioGroup
                      orientation="horizontal"
                      value={includingPseudonymOther}
                      onValueChange={setIncludingPseudonymOther}
                      className="gap-4"
                    >
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </RadioGroup>
                  </GroupContainer>
                  {includingPseudonymOther === "yes" && (
                    <GroupContainer>
                      {/* WHAT IS THE NAME OF THE LIVING PERSON IN YOUR MARK? */}
                      <SmallLabel
                        text={`WHAT IS THE NAME OF THE LIVING PERSON IN YOUR MARK?`}
                      />
                      <Input
                        name="protectName"
                        type="text"
                        variant="underlined"
                        label="What is the name of the living person in your mark?"
                        isInvalid={false}
                        errorMessage="This field is required!"
                        value={nameOfLivingPersonsInYourMark}
                        onChange={(e) =>
                          setNameOfLivingPersonsInYourMark(e.target.value)
                        }
                      />
                    </GroupContainer>
                  )}
                </>
              )}
            </ContainerTab>
          )}
        </FieldContainer>

        <FieldContainer>
          {/* Does your mark include any words other than English or non-Latin characters? */}
          <BoldLabel
            text={`Does your mark include any words other than English or non-Latin characters?`}
          />
          <RadioGroup
            orientation="horizontal"
            value={wordOtherThenEnglish}
            onValueChange={setWordOtherThenEnglish}
            className="gap-4"
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
          {wordOtherThenEnglish === "yes" && (
            <ContainerTab>
              <GroupContainer>
                {/* PLEASE PROVIDE THE ENGLISH TRANSLATION OR TRANSLITERATION OF ANY NON-LATIN CHARACTERS OR NON-ENGLISH WORDS */}
                <SmallLabel
                  text={`LEASE PROVIDE THE ENGLISH TRANSLATION OR TRANSLITERATION OF ANY NON-LATIN CHARACTERS OR NON-ENGLISH WORDS:`}
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
              </GroupContainer>
            </ContainerTab>
          )}
        </FieldContainer>

        <FieldContainer>
          {/* Are you currently using this trademark in your business? */}
          <BoldLabel
            text={`Are you currently using this trademark in your business?`}
          />
          <RadioGroup
            orientation="horizontal"
            value={currentlyUsingTrademarkInBusiness}
            onValueChange={setCurrentlyUsingTrademarkInBusiness}
            className="gap-4"
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
          {currentlyUsingTrademarkInBusiness === "yes" && (
            <ContainerTab>
              <GroupContainer>
                {/* PLEASE PROVIDE THE ENGLISH TRANSLATION OR TRANSLITERATION OF ANY NON-LATIN CHARACTERS OR NON-ENGLISH WORDS */}
                <SmallLabel
                  text={`LEASE PROVIDE THE ENGLISH TRANSLATION OR TRANSLITERATION OF ANY NON-LATIN CHARACTERS OR NON-ENGLISH WORDS:`}
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
              </GroupContainer>
            </ContainerTab>
          )}
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
