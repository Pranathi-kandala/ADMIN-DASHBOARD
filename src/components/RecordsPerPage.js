// src/RecordsPerPage.js
import React from "react";

const RecordsPerPage = ({ postsPerPage, handlePostsPerPageChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="recordsPerPage" className="text-white">Records per page:</label>
            <select
                id="recordsPerPage"
                value={postsPerPage}
                onChange={handlePostsPerPageChange}
                className="px-3 py-1 rounded-md"
            >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
};

export default RecordsPerPage;
