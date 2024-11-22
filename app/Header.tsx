"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [modal, setModal] = useState(false);

  const modalVisibility = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="mx-16 my-8">
        <nav className="flex justify-between items-center my-6">
          <Link href={"/"} className="text-2xl">
            Blog Manager App : Md Adnan Hussain
          </Link>
          <div>
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
      {modal && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black opacity-60 z-10"
            onClick={modalVisibility}
          ></div>
          <div
            className="fixed flex justify-center w-full border-0 rounded-md p-0 overflow-hidden z-20"
            onClick={modalVisibility}
          >
            <form
              className="max-w-[25rem] w-full bg-zinc-800 p-8 shadow-md rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold">Add a New Post</h2>
              <hr className="mt-2 mb-8" />
              <p className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full border-0 rounded-md min-h-8"
                />
              </p>
              <p className="mb-4">
                <label htmlFor="body" className="block mb-2">
                  Body
                </label>
                <textarea
                  id="body"
                  className="w-full border-0 rounded-md min-h-8"
                ></textarea>
              </p>
              <p className="mb-8">
                <label htmlFor="userid" className="block mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  id="userid"
                  className="w-full border-0 rounded-md min-h-8"
                />
              </p>
              <div className="flex justify-between">
                <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-white/75">
                  Add Post
                </button>
                <button
                  className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-zinc-600/75"
                  onClick={modalVisibility}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
