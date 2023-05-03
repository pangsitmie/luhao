import { useState, useEffect } from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useMutation, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { UpdateGamePayVersion } from "../../graphQL/Mutations";
// ICONS
import { GetCurrentVersion } from "../../graphQL/Queries";
import { useTranslation } from 'react-i18next';


interface FormValues {
    server: string;
    android: string;
    ios: string;
}

const checkoutSchema = yup.object().shape({
});




const AuditVersion = () => {
    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [initialValues, setInitialValues] = useState<FormValues>({
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

    const handleFormSubmit = (values: FormValues) => {
        const variables: any = {
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
                        Audit System {t('version')}
                    </Typography>
                    <Typography variant="h3" sx={{ fontSize: ".9rem", fontWeight: "500", color: colors.grey[200] }}>
                        {t('server_version')}: {initialValues.server}
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
                                            label={`Android ${t('version')}`}
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
                                            label={`IOS ${t('version')}`}
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
                                            {t('update')}
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