import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import PrivateRoute from "./private.route";
import { fetchAllBookAPI } from "../services/api.service";
import BookForm from "../components/book/book.form";

const BookPage = () => {

    const [dataBooks, setDataBooks] = useState([]);

    const loadBooks = async () => {
        const res = await fetchAllBookAPI();
        setDataBooks(res.data.result)
    } 

    useEffect(() => {
        loadBooks();
    },[]);

    return (
            <>
                <BookForm/>
                <BookTable
                    dataBooks={dataBooks}
                />
            </>
    )
}

export default BookPage;