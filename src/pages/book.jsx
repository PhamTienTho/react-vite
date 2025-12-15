import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import PrivateRoute from "./private.route";
import { fetchAllBookAPI } from "../services/api.service";
import BookForm from "../components/book/create.book.control";

const BookPage = () => {

    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState();


    const loadBooks = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        setDataBooks(res.data.result)

        setCurrent(res.data.meta.current);
        setPageSize(res.data.meta.pageSize);
        setTotal(res.data.meta.total)
    } 

    useEffect(() => {
        loadBooks();
    },[current, pageSize]);

    return (
            <div style={{padding: "20px"}}>
                <BookTable
                    dataBooks={dataBooks}
                    loadBooks={loadBooks}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                    setTotal={setTotal}
                />
            </div>
    )
}

export default BookPage;