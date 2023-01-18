import React, { useState } from 'react'
import { Login } from '../graphql/Mutation';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';

const Form = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [login, { error }] = useMutation(Login);

    const handleLogin = () => {
        console.log(phone, password);
        login({
            variables: {
                phone: { country: "tw", number: phone },
                password: password,
                deviceCode: "",
                firebaseToken: ""
            }
        });
        if (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <input
                type="number"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="text"
                placeholder="Pasword"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
        </div>
    )
}

export default Form