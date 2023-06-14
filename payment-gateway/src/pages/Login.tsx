import { Formik } from "formik"
import * as yup from "yup";
import { H1 } from "../components/styles/Typography.styled";
import TextField from "../components/TextField";
import { StyledButtonFill } from "../components/styles/ButtonFill.styled";
import { Canvas } from "@react-three/fiber";
import Blob from "../components/3D/blob/Blob";
import axios from "axios";
import { getEndpoint } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const checkoutSchema = yup.object().shape({
    account: yup.string().required("required"),
    password: yup.string().required("required").nullable(),
});


const Login = () => {
    const navigate = useNavigate();

    //========================== INITIAL VALUES ==========================
    const initialValues = {
        account: "",
        password: ""
    }

    //  ========================== PASSWORD VISIBILITY ==========================
    const handleFormSubmit = async (values: any): Promise<void> => {
        console.log(values);

        const MAX_RETRY_ATTEMPTS = 3;
        let retryCount = 0;

        while (retryCount < MAX_RETRY_ATTEMPTS) {
            try {
                let URI = `${getEndpoint()}/member/v1/web-login`;

                const response = await axios.post(URI, {
                    "phoneCountry": "TW",
                    "phoneNumber": values.account,
                    "password": values.password,
                    "deviceCode": "123",
                }, {
                    headers: {
                        // need to put Authorization Bearer token
                        // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response);
                if (response.data && response.data.data) {
                    console.log(response.data.data);
                    // save the token to local storage
                    localStorage.setItem('token', response.data.data.login_token);
                    toast.success("Login Success");

                    navigate("/")
                    break; // exit the loop if the API call was successful
                }
            } catch (error) {
                toast.error('Error:');
            }

            retryCount++;
            console.log(`Retrying API call (attempt ${retryCount})...`);

            if (retryCount > 0) {
                await new Promise(resolve => setTimeout(resolve, 1500)); // wait for 1 second before retrying
            }
        }
        if (retryCount === MAX_RETRY_ATTEMPTS) {
            console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
            toast.error("Login Failed");
        }
    }

    return (
        <div className="grid grid-cols-2 p-8">
            <div className="p-20">
                <div className="pb-12">
                    <H1>
                        Recharge Your Balance
                    </H1>
                    <p className="mt-2">
                        Enter your credentials to access your account
                    </p>
                </div>

                {/* form */}
                <div>
                    <div>
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <TextField
                                            type="text"
                                            label="Account"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.account}
                                            name="account"
                                            error={!!(touched.account && errors.account)} // Convert to boolean
                                            helperText={touched.account && errors.account ? errors.account : ""}
                                        />
                                        <TextField
                                            type="password"
                                            label="Password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={!!(touched.password && errors.password)} // Convert to boolean
                                            helperText={touched.password && errors.password ? errors.account : ""}
                                        />
                                    </div>
                                    <StyledButtonFill
                                        type="submit"
                                    >
                                        Login
                                    </StyledButtonFill>
                                </form>
                            )}
                        </Formik>
                    </div>


                </div>

            </div>

            {/* right div */}
            <div>
                <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
                    <Blob />
                </Canvas>
            </div>
        </div>

    )
}
export default Login