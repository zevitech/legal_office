"use client";

import React, { useState } from "react";
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
import ButtonContainer from "../ButtonContainer";
import InputCol from "../InputCol";
import { stateList, organizationTypes } from "@/constant";
import { useRouter } from "next/navigation";

const StepOne = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ownedBy, setOwnedBy] = useState("individual");

  const [wantToProtect, setWantToProtect] = useState("name");
  const [protectName, setProtectName] = useState("");
  const [sloganName, setSloganName] = useState("");

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
  const [email, setEmail] = useState("");

  const [validate, setValidate] = useState({
    protectNameV: false,
    sloganNameV: false,
  });

  // handle form submission
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // after submit validate the form
    validateForm();

    return router.push("/trademark-register/step-2");
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
            <Radio value="logo">Logo</Radio>
            <Radio value="all_three">All Three</Radio>
          </RadioGroup>

          {/* Enter the name you wish to protect */}
          {wantToProtect == "name" && (
            <Input
              name="protectName"
              type="text"
              variant="underlined"
              label="Enter the name you wish to protect"
              isInvalid={false}
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
              isInvalid={false}
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
                isInvalid={false}
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

        {/* show organization info taker if owned by organization is selected   */}
        {ownedBy === "organization" && (
          <FieldContainer>
            {/* formation */}
            <SmallLabel text={`FORMATION`} />
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
                isInvalid={false}
                errorMessage="This field is required!"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
              <Select
                variant="underlined"
                label="Organization Type"
                onChange={(e) => setOrganizationType(e.target.value)}
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
                  isInvalid={false}
                  errorMessage="This field is required!"
                  value={countryOfFormation}
                  onChange={(e) => setCountryOfFormation(e.target.value)}
                />
              ) : (
                <Select
                  variant="underlined"
                  label="State Of Formation"
                  onChange={(e) => setStateOfFormation(e.target.value)}
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
                isInvalid={false}
                errorMessage="This field is required!"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </InputCol>
          </FieldContainer>
        )}

        <FieldContainer>
          <InputCol>
            <Input
              name="firstName"
              type="text"
              variant="underlined"
              label="First Name"
              isInvalid={false}
              errorMessage="This field is required!"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              name="lastName"
              type="text"
              variant="underlined"
              label="Last Name"
              isInvalid={false}
              errorMessage="This field is required!"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </InputCol>
          <InputCol>
            <Input
              name="address"
              type="text"
              variant="underlined"
              label="Enter Full Address"
              isInvalid={false}
              errorMessage="This field is required!"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputCol>
          <InputCol>
            <Input
              name="city"
              type="text"
              variant="underlined"
              label="Enter City"
              isInvalid={false}
              errorMessage="This field is required!"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
          </InputCol>
          <InputCol>
            <Input
              name="zipCode"
              type="number"
              variant="underlined"
              label="Zip Code"
              isInvalid={false}
              errorMessage="This field is required!"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <Input
              name="phone"
              type="number"
              variant="underlined"
              label="Phone Number"
              isInvalid={false}
              errorMessage="This field is required!"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputCol>
          <InputCol>
            <Input
              name="email"
              type="email"
              variant="underlined"
              label="Enter Email Address"
              isInvalid={false}
              errorMessage="This field is required!"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputCol>
        </FieldContainer>

        {/* next or previous button */}
        <div className="my-5 mb-11 items-center float-end">
          <Button
            color="primary"
            variant="shadow"
            type="submit"
            isLoading={isLoading}
            className=" float-end"
          >
            Next
          </Button>
        </div>
      </form>
    </section>
  );
};

export default StepOne;
