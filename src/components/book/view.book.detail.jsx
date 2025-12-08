import { Drawer } from "antd";


const ViewBookDetail = (props) => {

    const { isBookDetailOpen, setIsBookDetailOpen, bookDetail } = props

    return (
        <>
            <Drawer
                title="Thông tin chi tiết sản phẩm"
                onClose={() => {
                    setIsBookDetailOpen(false)
                }}
                open={isBookDetailOpen}
            >
                {bookDetail ?
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>ID: {bookDetail._id}</div>
                        <div>Tiêu đề: {bookDetail.mainText}</div>
                        <div>Thể loại: {bookDetail.category}</div>
                        <div>Giá tiền: {new Intl.NumberFormat('vi-VN',
                            { style: 'currency', currency: 'VND' }).format(bookDetail.price)}</div>
                        <div>Số lượng: {bookDetail.quantity}</div>
                        <div>Đã bán: {bookDetail.sold}</div>
                        <div>Thumbnail: </div>
                        <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "solid 1px #ccc" }}>
                        <img
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail?.thumbnail}`}
                        />
                    </div>
                    </div>
                    : <div>Không có dữ liệu</div>
                }
            </Drawer>
        </>
    )
}

export default ViewBookDetail;