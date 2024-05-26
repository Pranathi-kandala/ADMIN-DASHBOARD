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
      className="px-4 sm:px-5 bg-gray-900 min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/736x/f5/82/5e/f5825ee00a9b4bf01f7a1b2960718b07.jpg")',
      }}
    >
      <DashboardText />
      <div className="py-10 w-full flex flex-col items-center">
        {isLoading ? (
          <ReactLoading
            type="spin"
            color="#EFEEF4"
            className="mx-auto top-[30vh] relative"
          />
        ) : (
          <div className="w-full">
            <form
              onSubmit={handleAuthorSearch}
              className="mb-4 flex justify-center items-center w-full"
            >
              <div className="flex items-center w-full justify-center">
                <input
                  type="text"
                  id="authorName"
                  placeholder="Search by author name"
                  className="px-2 py-1 rounded-md bg-transparent border border-gray-500 text-white text-lg w-full max-w-xs text-center"
                />
                <button type="submit" className="bg-transparent border-none">
                  <FiSearch className="text-white ml-2" size={24} />
                </button>
              </div>
            </form>
            <div className="w-full overflow-x-auto">
              <BooksTable
                handleAuthorSearch={handleAuthorSearch}
                handleYearSort={handleYearSort}
                selectedSortOption={selectedSortOption}
                data={data}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-around gap-5 pt-10 w-full">
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
