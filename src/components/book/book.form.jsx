import { Button } from "antd";

const BookForm = () => {



    return(
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}> 
                <div>Table Books</div>
                <Button type="primary">Create Book</Button>
            </div>
        </>
    )
}

export default BookForm;