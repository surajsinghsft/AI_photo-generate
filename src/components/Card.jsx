import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { useEffect } from "react";

export default function Card(props) {
  const [deleting, setDeleting] = useState(false);
  const url = useLocation();
  const CalcuateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };
  console.log(props)
  // console.log(CalcuateDate("2025-08-23T05:17:02.268Z"));
  const handleDownLoad = async (url, filename = "image.jpg") => {
    try {
      // Step 1: fetch file from URL
      const response = await fetch(url);
      const blob = await response.blob();

      // Step 2: create temporary object URL
      const objectUrl = URL.createObjectURL(blob);

      // Step 3: create link & download
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Step 4: cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`https://ai-image-backend-3bea.onrender.com/api/image/delete-image/${id}`);
      props.setIsDeleted(true);
      setDeleting(false);
    } catch (error) {
      props.setIsDeleted(false);
      console.log(error);
      setDeleting(false);
    }
  };
  useEffect(() => {
    props.setLoading(false);
  }, []);
  return (
    <section className={props.className}>
      <div className={props.classNameForContainer}>
        <div className={props.ImageClass}>
          <img
            src={props.cardData.url}
            alt="card image"
            className="w-full h-full object-center rounded"
          />
        </div>
        <section
          className="flex items-start justify-between gap-5 max-w-max-content "
          style={{
            padding: `0px ${url.pathname == "/history" ? "0px" : "10px"}`,
          }}
        >
          <div>
            <span className="text-md font-normal">
              Name : {props.cardData.name}
            </span>
            <br />
            <span className="text-sm font-light">
              Prompt : {props.cardData.prompt}
            </span>
          </div>
          <div>
            <span>Date : {CalcuateDate(props.cardData.createdAt)}</span>
            <br />
            <div className="flex items-center justify-start gap-20 mt-3">
              <button
                onClick={() => handleDownLoad(props.cardData.url)}
                className="cursor-pointer"
              >
                <FaDownload size={20} className="hover:text-blue-500" />
              </button>

              {!deleting ? (
                <button
                  onClick={() => handleDelete(props.cardData._id)}
                  className="cursor-pointer"
                >
                  <MdDelete
                    className="text-gray-900 hover:text-red-500"
                    size={25}
                  />
                </button>
              ) : (
                <ImSpinner2
                  className="text-red-500   custom-animation animate-spin text-center"
                  size={25}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}