import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useMutation, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { UpdateGamePayVersion } from "../../graphQL/Mutations";
import { defaultCoverURL, defaultLogoURL } from "../../data/strings";
// ICONS
import InputBase from "@mui/material/InputBase";
import { GetCurrentVersion } from "../../graphQL/Queries";

const checkoutSchema = yup.object().shape({
    // android: yup.string().required("請輸入版本號"),
    // ios: yup.string().required("請輸入版本號"),
});
const AuditVersion = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [initialValues, setInitialValues] = useState({
        server: "",
        android: "",
        ios: "",
    });

    const { data } = useQuery(GetCurrentVersion, {
        variables: {
            clientName: "audit"
        }
    })
    useEffect(() => {
        if (data) {
            setInitialValues({
                server: data.getCurrentVersion.server,
                android: data.getCurrentVersion.android,
                ios: data.getCurrentVersion.ios,
            });
        }
    }, [data]);

    const [ApolloUpdateVersion, { loading: versionLoading, error: versionError, data: versionData }] = useMutation(UpdateGamePayVersion);
    useEffect(() => {
        if (versionData) {
            window.location.reload();
        }
    }, [versionData]);

    const handleFormSubmit = (values) => {
        const variables = {
            clientName: "audit",
        };
        if (values.android) {
            variables.android = values.android;
        }
        if (values.ios) {
            variables.ios = values.ios;
        }

        if (values.android === "" && values.ios === "")
            return alert("請輸入版本號");
        ApolloUpdateVersion({ variables });
    }


    return (
        <Box pl={2}>
            <div className="container">
                <div className="box">
                    <Typography variant="h3" sx={{ mt: "5px", fontSize: "1.5rem", fontWeight: "500", color: colors.grey[200] }}>
                        Audit System Version
                    </Typography>
                    <Typography variant="h3" sx={{ fontSize: ".9rem", fontWeight: "500", color: colors.grey[200] }}>
                        伺服器版本: {initialValues.server}
                    </Typography>
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
                                    <Box>
                                        <Typography variant="h3" sx={{ m: "2rem 0 1rem", fontSize: "1rem", fontWeight: "500", color: colors.grey[200], textAlign: "left" }}>
                                            ANDROID - {initialValues.ios}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Android 版本號"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.android}
                                            name="android"
                                            error={!!touched.android && !!errors.android}
                                            helperText={touched.android && errors.android}
                                            sx={{ marginBottom: "1rem", mr: "1rem", borderRadius: "5px" }}
                                        />
                                        <Typography variant="h3" sx={{ m: "2rem 0 1rem", fontSize: "1rem", fontWeight: "500", color: colors.grey[200], textAlign: "left" }}>
                                            IOS - {initialValues.ios}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="IOS 版本號"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.ios}
                                            name="ios"
                                            error={!!touched.ios && !!errors.ios}
                                            helperText={touched.ios && errors.ios}
                                            sx={{ marginBottom: "1rem", mr: "1rem", borderRadius: "5px" }}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" paddingTop={"2rem"}>
                                        <button className='btn_right_arrow' type="submit">
                                            Update
                                            <div className="arrow-wrapper">
                                                <div className="arrow"></div>
                                            </div>
                                        </button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </Box >
    )
}

export default AuditVersion