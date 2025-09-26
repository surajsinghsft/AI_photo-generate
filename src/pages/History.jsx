import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { data } from "../data/data";
import Card from "../components/Card";
import axios from "axios";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const [filteredData, setFilteredData] = useState([]);

  const searchData = useCallback(() => {
    if (searchTerm == "" || searchTerm == null) {
      setFilteredData(data);
      return;
    }
    const searchValue = searchTerm.toLowerCase();
    const applyFilter = data?.filter((image) => {
      const name = image.name.toLowerCase();
      const prompt = image.prompt.toLowerCase();
      return (
        name.includes(searchValue.trim()) || prompt.includes(searchValue.trim())
      );
    });

    console.log(applyFilter);
    setFilteredData(applyFilter);
  }, [searchTerm]);
  useEffect(() => {
    searchData();
  }, [searchTerm]);

  const loadImages = async () => {
    try {
      const images = await axios.get(
        "https://ai-image-backend-3bea.onrender.com/api/image/get-images"
      );
      console.log(images);
      setFilteredData(images.data.images);
      setIsDeleted(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, [searchData, searchTerm, isDeleted]);

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <section className="flex items-center justify-center gap-3 w-[300px] md:w-1/3 border py-3 px-2 rounded-md">
        <div>
          {" "}
          <FaSearch size={20} />
        </div>
        <input
          type="search"
          placeholder="Search here..."
          className="w-full outline-none"
          onChange={handleSearch}
        />
      </section>
      <ul className="flex items-center justify-center gap-5 flex-wrap  ">
        {filteredData?.length >= 1 &&
          filteredData?.map((image, index) => {
            return (
              <li key={index}>
                <Card
                  cardData={image}
                  setIsDeleted={setIsDeleted}
                  isDeleted={isDeleted}
                  setLoading={setLoading}
                  className="flex items-center justify-center min-w-[400px] w-[400px] mx-auto mt-[8%] h-[500px]"
                  classNameForContainer="flex flex-col items-center justify-center rounded-md pb-5 px-5 gap-5  shadow-md bg-gray-50 w-full h-full"
                  ImageClass={"w-[400px] h-full "}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}