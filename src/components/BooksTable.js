import React, { useState } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";


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
    color: "#1a1a1a",
    fontWeight: "600",
    padding: "0.5rem",
  };

  return (
    <div className="table-container">
      <table className="min-w-full text-black-1200">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              style={{ ...cellStyle, fontWeight: "700", fontSize: "1.1rem" }}
              onClick={() => requestSort("title")}
            >
              Title
              {renderSortIcon("title")}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              style={{ ...cellStyle, fontSize: "1rem" }}
              onClick={() => requestSort("author_name")}
            >
              Author
              {renderSortIcon("author_name")}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              style={{ ...cellStyle, fontSize: "1rem" }}
              onClick={() => requestSort("first_publish_year")}
            >
              First Publish Year
              {renderSortIcon("first_publish_year")}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
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
        <tbody>
          {sortedData().map((book, index) => (
            <tr key={index} className="text-center">
              <td
                className="py-2 px-4 border-b"
                style={{ ...cellStyle, fontWeight: "700" }}
                data-label="Title"
              >
                {book.title}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle} data-label="Author">
                {book.author_name?.[0]}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle} data-label="First Publish Year">
                {book.first_publish_year}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle} data-label="Ratings Average">
                <div className="flex justify-center items-center">
                  {book.ratings_average
                    ? renderRatingStars(parseFloat(book.ratings_average))
                    : "N/A"}
                </div>
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle} data-label="Subject">
                {book.subject?.join(", ").slice(0, 50)}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle} data-label="Author Birth Date">
                {book.birth_date}
              </td>
              <td className="py-2 px-4 border-b" style={cellStyle} data-label="Author Top Work">
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
