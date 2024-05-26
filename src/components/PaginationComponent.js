import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Importing icons

const PaginationComponent = ({ prevPage, nextPage, changeCurrPage, currentPage }) => {
  const [inputPage, setInputPage] = useState(""); // State to store input page number

  // Function to handle input page change
  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  // Function to handle input page submit
  const handlePageSubmit = (e) => {
    e.preventDefault();
    if (inputPage.trim() !== "" && !isNaN(inputPage)) {
      // Check if input is not empty and is a valid number
      changeCurrPage(parseInt(inputPage)); // Change current page to the input page number
    }
    setInputPage(""); // Clear input field after submission
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={prevPage}
        className="flex items-center px-2 py-1 bg-transparent text-white rounded-md hover:bg-beige-600 focus:outline-none focus:ring-2 focus:ring-beige-300"
      >
        <FiChevronLeft size={20} className="text-white" />
      </button>
      <form onSubmit={handlePageSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          placeholder="Page"
          className="px-2 py-1 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-beige-300"
          style={{ width: "40px" }} // Set width of input box
        />
      </form>
      <span className="text-white text-lg font-semibold">{`Page ${currentPage}`}</span>
      <button
        onClick={nextPage}
        className="flex items-center px-2 py-1 bg-transparent text-white rounded-md hover:bg-beige-600 focus:outline-none focus:ring-2 focus:ring-beige-300"
      >
        <FiChevronRight size={20} className="text-white" />
      </button>
    </div>
  );
};

export default PaginationComponent;
