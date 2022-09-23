import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Editadd.css';

export default function Edituser() {
    const { id } = useParams();
    const [inputField, setInputfield] = useState({
        name: "",
        email: "",
        status: "",
    });
    useEffect(() => {
        loadUser();
    }, []);

    const { name, email, status } = inputField;
    const inputsHandler = e => {
        setInputfield({ ...inputField, [e.target.name]: e.target.value });
    };

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:3001/api/get/${id}`);
            setInputfield(result.data[0]);
            toast.success('Fatch Data sucess fully!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        catch (err) {
            throw new Error('erroe in get api');
        }
    }

    const submitButton = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/api/update/${id}`, {
            name: name,
            email: email,
            status: status,
            
        })
            .then(res => {
                console.log(res.inputField)
                toast.success('Sucess fully Update Data!', {
                    position: toast.POSITION.TOP_RIGHT
                });
                
            }).catch((error) => {
                console.log(error);
                
            })
    }

    return (
        <div className="container">
            <div className="cardbox w-60 mx-auto shadow p-5">
                <h2 className="heading text-center mb-4">Edit User</h2>
                <form >
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            onChange={inputsHandler}
                            placeholder="User Name"
                            className="form-control form-control-lg"
                            value={inputField.name}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="email"
                            onChange={inputsHandler}
                            className="form-control form-control-lg"

                            placeholder="Email"
                            value={inputField.email}
                        />
                    </div>
                    
                    <div className="form-group"> 
                    <select
                            className="form-control form-control-lg"

                          name="status" placeholder="select one" value={inputField.value} onChange={inputsHandler}>
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    </div>

                    <button onClick={submitButton} className=" b1button btn btn-primary btn-block">Submit</button>
                    <a className='go' href='/'>go back </a>
                </form>
                <ToastContainer />

            </div>
        </div>
    );
}
