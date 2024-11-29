"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal/Modal";

const Header = () => {
  const [modal, setModal] = useState(false);

  const modalVisibility = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="mx-6 md:mx-16 my-8">
        <nav className="md:flex justify-between items-center my-6">
          <Link href={"/"} className="text-2xl">
            Blog Manager App : Md Adnan Hussain
          </Link>
          <div className="mt-4 md:mt-0">
            <button
              className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-white/75"
              onClick={modalVisibility}
            >
              Add Post
            </button>
          </div>
        </nav>
        <hr className="hr" />
      </div>
      {modal && <Modal modalVisibility={modalVisibility} />}
    </>
  );
};

export default Header;
