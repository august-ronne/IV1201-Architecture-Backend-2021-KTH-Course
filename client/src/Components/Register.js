import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const Register = (props) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
    });
    const [serverMessage, setServerMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const onChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const resetForm = () => {
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        AuthService.register(user).then((data) => {
            console.log(data);
            const { serverMessage } = data;
            console.log(serverMessage);
            setServerMessage(serverMessage);
            console.log(serverMessage);
            resetForm();
            if (!serverMessage.isError) {
                timerID = setTimeout(() => {
                    props.history.push("/login");
                }, 2000);
            }
        });
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please register an account</h3>

                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name..."
                    value={user.firstName}
                    onChange={onChange}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name..."
                    value={user.lastName}
                    onChange={onChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter email..."
                    value={user.email}
                    onChange={onChange}
                />

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter username..."
                    value={user.username}
                    onChange={onChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    name="password"
                    placeholder="Enter password..."
                    value={user.password}
                    onChange={onChange}
                />

                <button type="submit">Register Account</button>
            </form>
            {serverMessage ? <Message message={serverMessage} /> : null}
        </div>
    );
};

export default Register;
