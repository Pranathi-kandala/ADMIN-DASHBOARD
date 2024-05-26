import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { FiSearch } from "react-icons/fi"; // Import the search icon
import CreateCSV from "./CreateCSV";
import DashboardText from "./DashboardText";
import BooksTable from "./BooksTable";
import PaginationComponent from "./PaginationComponent";
import RecordsPerPage from "./RecordsPerPage";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState(
    "https://openlibrary.org/search.json?q=random&fields=author_key,ratings_average,author_name,title,first_publish_year,subject"
  );
  const [authorName, setAuthorName] = useState("random");
  const [yearSort, setYearSort] = useState("default");
  const [selectedSortOption, setSelectedSortOption] = useState("default");

  const fetchBooks = useCallback(() => {
    setIsLoading(true);
    const limit = postsPerPage;
    const offset = (currentPage - 1) * postsPerPage;

    axios
      .get(`${apiEndpoint}&limit=${limit}&offset=${offset}`)
      .then((response) => {
        const books = response.data.docs;
        setTotalRecords(response.data.numFound);

        const authorPromises = books.map((book) => {
          const authorName = book.author_name?.[0];
          return axios
            .get(`https://openlibrary.org/search/authors.json?q=${authorName}`)
            .then((authorResponse) => {
              const authorData = authorResponse.data.docs[0];
              return {
                ...book,
                birth_date: authorData?.birth_date || "N/A",
                top_work: authorData?.top_work || "N/A",
              };
            });
        });

        Promise.all(authorPromises).then((updatedBooks) => {
          setData(updatedBooks);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      });
  }, [apiEndpoint, currentPage, postsPerPage]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalRecords / postsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleAuthorSearch = (event) => {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("authorName").value;
    setAuthorName(name);
    setSelectedSortOption("default");
    setYearSort("default");
    setApiEndpoint(
      `https://openlibrary.org/search.json?q=${name}&fields=author_key,ratings_average,author_name,title,first_publish_year,subject`
    );
    setCurrentPage(1);
  };

  const handleYearSort = (event) => {
    const year = event.target.value;
    setYearSort(year);
    setSelectedSortOption(year);
    setApiEndpoint(
      `https://openlibrary.org/search.json?q=${authorName}&fields=author_key,ratings_average,author_name,title,first_publish_year,subject&sort=${year}`
    );
    setCurrentPage(1);
  };

  return (
    <div
      className="px-4 sm:px-5 bg-gray-900 min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/736x/f5/82/5e/f5825ee00a9b4bf01f7a1b2960718b07.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <DashboardText />
      <div className="py-10">
        {isLoading ? (
          <ReactLoading
            type="spin"
            color="#EFEEF4"
            className="mx-auto top-[30vh] relative"
          />
        ) : (
          <div>
            <form
              onSubmit={handleAuthorSearch}
              className="mb-4 flex justify-center items-center"
              style={{ marginTop: "-20px" }}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  id="authorName"
                  placeholder="Search by author name"
                  className="px-2 py-1 rounded-md ml-3 mr-2 mb-3 bg-transparent border border-gray-500 text-white text-lg" // Adjusted class
                  style={{ textAlign: "center" }} // Center the text
                  onKeyPress={(e) => e.key === "Enter" && handleAuthorSearch(e)}
                />
                <button type="submit" className="bg-transparent border-none">
                  <FiSearch className="text-white" size={24} style={{ marginBottom: '10px' }} /> {/* Adjusted size */}
                </button>
              </div>
            </form>
            <div style={{ marginTop: "-20px" }}>
              <BooksTable
                handleAuthorSearch={handleAuthorSearch}
                handleYearSort={handleYearSort}
                selectedSortOption={selectedSortOption}
                data={data}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
              />
            </div>
            <div className="flex items-center justify-around flex-col md:flex-row gap-5 pt-10">
              <PaginationComponent
                prevPage={handlePrevPage}
                nextPage={handleNextPage}
                changeCurrPage={handlePageChange}
                currentPage={currentPage}
              />
              <CreateCSV data={data} />
              <RecordsPerPage
                postsPerPage={postsPerPage}
                handlePostsPerPageChange={handlePostsPerPageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Main;  