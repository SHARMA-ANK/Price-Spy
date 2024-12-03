"use client";
import React, { FormEvent, Fragment } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { addUserEmailToProduct } from "../lib/actions";

interface ModalProps {
  productId: string;
}

const Modal = ({ productId }: ModalProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(productId);
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);
    setIsSubmitting(false);
    setEmail("");
    setIsOpen(false);
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="btn" type="button" onClick={openModal}>
        Track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          open={isOpen}
          onClose={closeModal}
          className="dialog-container"
        >
          <div className="min-h-screen px-4 text-center">
            {/* Overlay for backdrop */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal Content */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="dialog-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border border-gray-200 rounded-10">
                      <Image
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={28}
                        height={28}
                      />
                    </div>
                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      onClick={closeModal}
                      className="cursor-pointer"
                    />
                  </div>
                  <h4 className="dialog-head_text">
                    Stay Updated with Product pricing alerts right in your
                    inbox!
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    We will notify you when the price of this product drops
                  </p>
                  <form
                    className="flex flex-col mt-5"
                    onSubmit={handleSubmit}
                  >
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="dialog-input_container">
                      <Image
                        src="/assets/icons/mail.svg"
                        width={18}
                        height={18}
                        alt="email"
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="dialog-input"
                      />
                    </div>
                    <button type="submit" className="dialog-btn">
                      {isSubmitting ? "Submitting..." : "Track Price"}
                    </button>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
