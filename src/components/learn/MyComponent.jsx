
import './style.css';

// component = html + css + js
const MyComponent = () => {  // tên component phải viết hoa chữ cái đầu
    const str1 = "tho";
    const num1 = 5;
    return (
        // sử dụng Fragment để bọc giúp cho có thể return nhiều thẻ html trong 1 component
        <>
            <div> {str1} {num1} First component ver 2.0 </div>
            <div className="child">child</div>
            <div> { console.log("tho")} </div>
        </>
    );
}

export default MyComponent // default có ý nghĩa là file này luôn mặc định là export ra component này

