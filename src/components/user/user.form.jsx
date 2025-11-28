import { Button, Input } from "antd";
import { useState } from "react";
import axios from "axios";

const UserForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn = () => {
        const URL_BACKEND = "http://localhost:8080/api/v1/user";
        const data = {
            fullName: fullName,
            email: email,
            password: passWord,
            phone: phone
        }
        axios.post(URL_BACKEND, data);
        console.log(fullName, email, passWord, phone);
    }

    return (
        <div className="user-form" style={{margin: "20px 0"}}>
            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                <div>
                    <span>Full name</span>
                    <Input onChange={ (event) => { setFullName(event.target.value) } }/>
                </div>
                <div>
                    <span>Email</span>
                    <Input onChange={ (event) => { setEmail(event.target.value) } }/>
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password onChange={ (event) => { setPassWord(event.target.value) } }/>
                </div>
                <div>
                    <span>Phone Number</span>
                    <Input onChange={ (event) => { setPhone(event.target.value) } }/>
                </div>
                <div>
                    <Button 
                    type="primary" 
                    onClick={ () => handleClickBtn() }>Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;