"use client";

import { AddPost } from "@/lib/actions";
import { PostType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PostForm from "./PostForm";
import { toast } from "react-toastify";

export default function Modal({
  modalVisibility,
}: {
  modalVisibility: () => void;
}) {
  const [formData, setFormData] = useState<PostType>({
    title: "",
    body: "",
    userId: 0,
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const formSubmitRes = await AddPost(formData);
    console.log(formSubmitRes);
    modalVisibility();
    toast.success("Form has been submitted successfully");
    toast(
      "You may not see the new post as JSONPlaceholder API doesn't allow modifying its database."
    );
    router.push(`/`);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-black opacity-60 z-10"
        onClick={modalVisibility}
      ></div>
      <div
        className="fixed flex justify-center w-full border-0 rounded-md p-0 overflow-hidden z-20"
        onClick={modalVisibility}
      >
        <PostForm
          submitHandler={submitHandler}
          formData={formData}
          handleInputChange={handleInputChange}
          modalVisibility={modalVisibility}
        />
      </div>
    </>
  );
}
