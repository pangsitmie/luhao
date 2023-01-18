import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utilities/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material"

import { gql } from "@apollo/client"; //fixme: harus buat folder graphql-tag
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
    mutation login(
        $loginInput: LoginInput
    ){
        loginUser(
            loginInput: $loginInput 
        ){
            phone
            password
        }
    }
`

function Login(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    function loginUserCallback() {
        loginUser()
    }
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
            context.login(userData);
            navigate('/')
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Login</h3>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="Username"
                    name="username"
                    onChange={onChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
            </Stack>
            {errors.map(function (error) {
                return (
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                );
            })}
            <Button variant="contained" onClick={onSubmit}>Login</Button>
        </Container>
    );
}
export default Login;