
import './style.css';

// component = html + css + js
const MyComponent = () => {  // tên component phải viết hoa chữ cái đầu
    return (
        // sử dụng Fragment để bọc giúp cho có thể return nhiều thẻ html trong 1 component
        <>
            <div> First component ver 2.0 </div>
            <div className="child">child</div>
        </>
    );
}

export default MyComponent // default có ý nghĩa là file này luôn mặc định là export ra component này

