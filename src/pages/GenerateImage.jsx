import React, { useState } from "react";
import Form from "./Form";
import Card from "../components/Card";
import axios from "axios";
export default function GenerateImage() {
  const [loading, setLoading] = useState(false)

  const [cardData, setCardData] = useState({
    url: "",
    name: "",
    prompt: "",
  });


  return (
    <div>
      <div className="md:flex flex-1 ">
        <Form setCardData={setCardData} cardData={cardData} />
        {
          cardData?.name !== "" && cardData?.prompt !== "" && cardData?.url !== "" && !loading && (
            <Card
              cardData={cardData}
              setLoading={setLoading}
              className="flex items-start justify-start w-full sm:mx-5 md:mx-auto md:w-[350px] lg:w-1/3 mt-[8%] "
              classNameForContainer="flex flex-col items-start justify-start rounded-md pb-5  gap-5  shadow-md bg-gray-50 h-[500px] "
              ImageClassName=" md:h-[250px] lg:h-[250px] w-[300px]"
            />
          )
        }
      </div>
    </div>
  );
}