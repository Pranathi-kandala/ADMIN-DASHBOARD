import React, { useState } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi"; // Importing the icons
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Importing star icons

const BooksTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FiArrowUp /> : <FiArrowDown />;
  };

  const renderRatingStars = (rating) => {
    const starIcons = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FaStar key={i} color="#FFD700" />);
    }

    if (hasHalfStar) {
      starIcons.push(<FaStarHalfAlt key={starIcons.length} color="#FFD700" />);
    }

    return starIcons;
  };

  const sortedData = () => {
    const sortedItems = [...data];
    if (sortConfig.key) {
      sortedItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedItems;
  };

  const cellStyle = {
    color: "#1a1a1a", // Darker text color
    fontWeight: "600" // Thicker text
  };

  return (
    <div className="flex justify-center mt-12">
      <table className="min-w-[50%] text-black-1200">
        {/* Table Headers */}
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b"
              style={{ ...cellStyle, fontWeight: "700", fontSize: "1.1rem" }} // Thicker for the first column
              onClick={() => requestSort("title")}
            >
              Title
              {renderSortIcon("title")}
            </th>
            <th
              className="py-2 px-4 border-b"
              style={{ ...cellStyle, fontSize: "1rem" }}
              onClick={() => requestSort("author_name")}
            >
              Author
              {renderSortIcon("author_name")}
            </th>
            <th
              className="py-2 px-4 border-b"
              style={{ ...cellStyle, fontSize: "1rem" }}
              onClick={() => requestSort("first_publish_year")}
            >
              First Publish Year
              {renderSortIcon("first_publish_year")}
            </th>
            <th
              className="py-2 px-4 border-b"
              style={{ ...cellStyle, fontSize: "1rem" }}
              onClick={() => requestSort("ratings_average")}
            >
              Ratings Average
              {renderSortIcon("ratings_average")}
            </th>
            <th className="py-2 px-4 border-b" style={cellStyle}>
              Subject
            </th>
            <th className="py-2 px-4 border-b" style={cellStyle}>
              Author Birth Date
            </th>
            <th className="py-2 px-4 border-b" style={cellStyle}>
              Author Top Work
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {sortedData().map((book, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b" style={{ ...cellStyle, fontWeight: "700" }}>
                {book.title}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle}>
                {book.author_name?.[0]}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle}>
                {book.first_publish_year}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle}>
                <div className="flex justify-center items-center">
                  {book.ratings_average
                    ? renderRatingStars(parseFloat(book.ratings_average))
                    : "N/A"}
                </div>
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle}>
                {book.subject?.join(", ").slice(0, 50)}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle}>
                {book.birth_date}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle}>
                {book.top_work}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
