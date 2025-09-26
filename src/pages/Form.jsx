import axios from "axios";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
export default function Form(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [prompt, setprompt] = useState("");
  // const [url, setUrl] = useState("");

  const loadImage = async () => {
    // let res;
    try {
      let res = await axios.post(
        "https://ai-image-backend-3bea.onrender.com/api/image/generate-image",
        { name, prompt }
      );
      if (!res) {
        console.log("image not generated on frontend");
      }
      console.log(res);
      props.setCardData(res.data.image)
    } catch (error) {
      console.log(error);
    }
  };

  const handlepromptChange = (e) => {
    setprompt(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // const handleUrlChange = (e) => {
  //   setUrl(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loadImage();
    setName("");
    // setUrl("");
    setprompt("");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center md:w-[350px] lg:w-1/3 w-full mx-auto mt-[8%]">
      <form
        className="flex flex-col items-center justify-center rounded-md py-10 px-5   gap-5  shadow-md bg-gray-50 w-full"
        onSubmit={handleSubmit}
      >
        <h1 className=" text-xl font-bold text-center mb-5 text-black">
          Prompt page
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Enter your name ..."
          className="py-3 w-full px-1 outline-none border rounded"
          onChange={handleNameChange}
          value={name}
          required
          title="enter your"
        />
        {/* <input
          type="text"
          name="url"
          placeholder="Enter your name ..."
          className="py-3 w-full px-1 outline-none border rounded"
          onChange={handleUrlChange}
          value={url}
          required
          title="enter your"
        /> */}

        <textarea
          type="prompt"
          name="peompt"
          placeholder="Enter your prompt ..."
          className="py-3 w-full px-1 outline-none border rounded"
          onChange={handlepromptChange}
          value={prompt}
          required
          title="enter your"
        />

        <button className="bg-blue-500 w-1/2 py-3 rounded-md cursor-pointer text-center flex items-center justify-center">
          {loading ? (
            <ImSpinner2
              className="text-white   custom-animation animate-spin text-center"
              size={25}
            />
          ) : (
            "Generate"
          )}
        </button>
      </form>
    </div>
  );
}