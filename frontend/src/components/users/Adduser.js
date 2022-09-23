import React, { useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Editadd.css';
// import { Dropdown, Option } from "./Dropdown";

const AddUser = () => {
    // const [status , setStatus] = useState("Blocked");
    const [inputField, setInputfield] = useState({
        name: "",
        email: "",
        status: "",
    });


    const inputsHandler = (e) => {
        const { name, value, status } = e.target;
        console.log(e);

        setInputfield((prevState) => ({
            ...prevState, [name]: value,
            
        }));
    }

    const submitButton = async (e) => {
        e.preventDefault();
        console.log(inputField);
        if (!inputField.name || !inputField.email || !inputField.status) {
            toast.error("Please provide value into each input feild");
        } else {
            await axios.post("http://localhost:3001/api/insert", {
                name: inputField.name,
                email: inputField.email,
                status: inputField.status
            })
                .then(res => {
                    console.log(res.inputField)
                    toast.success('Success !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
                .catch((err) => {
                    toast.error(`api fatch error${err}`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
        }
    }

    return (
        <div className="container">
            <div className="cardbox w-60 mx-auto shadow p-5">
                <h2 className=" heading text-center mb-4">Add New User</h2>
                <form >
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            onChange={inputsHandler}
                            placeholder="User Name"
                            className="form-control form-control-lg"

                            value={inputField.name} />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="email"
                            onChange={inputsHandler}
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={inputField.email} />
                    </div>
                    <div className="form-group"> 
                         <select
                            className="form-control form-control-lg"

                          name="status" placeholder="select one" value={inputField.value} onChange={inputsHandler}>
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                       
                    </div> 
                    <button onClick={submitButton} className="b1button btn btn-primary btn-block">Add User</button>
                    <a className='go' href='/'>go back </a>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default AddUser;