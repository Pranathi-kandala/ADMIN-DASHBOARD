import React from "react";
import { CSVLink } from "react-csv";

const CreateCSV = ({ data }) => {
    const headers = [
        { label: "Title", key: "title" },
        { label: "Author", key: "author_name[0]" },
        { label: "First Publish Year", key: "first_publish_year" },
        { label: "Ratings Average", key: "ratings_average" },
        { label: "Subject", key: "subject" },
        { label: "Author Birth Date", key: "birth_date" },
        { label: "Author Top Work", key: "top_work" },
    ];

    return (
        <CSVLink
            data={data}
            headers={headers}
            filename="books_data.csv"
            className="px-4 py-2 bg-transperant text-white rounded-md border border-white "
        >
            Download CSV
        </CSVLink>
    );
};

export default CreateCSV;
