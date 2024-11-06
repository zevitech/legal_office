"use client";

import React, { useState } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import SearchingAnimation from "../../../public/new-form/animations/searching-animation.json";
import SearchedAnimation from "../../../public/new-form/animations/searched-animation.json";

const Searchbar2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleOpen = () => {
    setIsSearching(true);
    setIsSearchComplete(false);
    onOpen();

    // Simulate search with a timeout
    setTimeout(() => {
      setIsSearching(false);
      setIsSearchComplete(true);
    }, 3000); // Set your desired delay in milliseconds
  };

  const handleClose = () => {
    onClose();
    setIsSearching(false);
    setIsSearchComplete(false);
  };

  return (
    <>
      <div className="flex-center gap-4 max-md:flex-col">
        <div className="relative w-[650px] max-md:w-full">
          <input
            className="p-6 h-[30px] rounded-md text-sm w-full outline-blue-600"
            type="text"
            placeholder="Search Trademark Here..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <CiSearch className="absolute top-1/2 -translate-y-1/2 right-7 text-3xl text-slate-400" />
        </div>
        <Button
          className="py-[25px] px-14 font-semibold bg-color-primary text-white"
          radius="sm"
          onClick={handleOpen}
          disabled={!searchInput.trim()}
        >
          Search
        </Button>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isSearching ? "Searching..." : "Search Results"}
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-between">
                  <p className="text-black/60 text-[24px]">{searchInput || "Trademark"}</p>
                  {isSearchComplete ? (
                    <>
                      <DotLottiePlayer
                        src={SearchedAnimation}
                        className="w-[80px] h-[80px]"
                        autoplay
                        loop={isSearching}
                      />
                    </>
                  ) : (
                    <>
                      <DotLottiePlayer
                        src={SearchingAnimation}
                        className="w-[60px] h-[60px]"
                        autoplay
                        loop={isSearching}
                      />
                    </>
                  )}
                </div>
                <Divider />
                {isSearchComplete ? (
                  <p className="mb-4">
                    &quot;<span className="font-semibold">{searchInput}</span>&quot; is
                    available! Hurry and trademark it now before it&apos;s too late.
                  </p>
                ) : (
                  <p className="mb-4 text-black/50">
                    Please wait while we check availability...
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-primary text-white"
                  onPress={onClose}
                  disabled={isSearching}
                >
                  Trademark Now
                </Button>
                <Button className="bg-danger text-white" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Searchbar2;
