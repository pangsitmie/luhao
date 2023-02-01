import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import { useLazyQuery } from '@apollo/client'
import { BanMember, BanBrand, BanStore, BanBillboard, BanMachine, BanAds } from "../../graphQL/Queries";
import "./ConfirmModal.css";



const checkoutSchema = yup.object().shape({
    reason: yup.string().required("required"),
});

export default function ConfirmModal({ props }) {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const expireAtRef = useRef('') //creating a refernce for TextField Component
    const reasonRef = useRef('') //creating a refernce for TextField Component


    // BAN BRAND
    const [ApolloBanBrand, { loading, error, data }] = useLazyQuery(BanBrand);
    useEffect(() => {
        if (data) {
            window.location.reload();
        }
    }, [data]);

    // BAN STORE
    const [ApolloBanStore, { loading: loading1, error: error1, data: data1 }] = useLazyQuery(BanStore);
    useEffect(() => {
        if (data1) {
            window.location.reload();
        }
    }, [data1]);

    // BAN STORE
    const [ApolloBanMember, { loading: loading2, error: error2, data: data2 }] = useLazyQuery(BanMember);
    useEffect(() => {
        if (data2) {
            window.location.reload();
        }
    }, [data2]);

    // BAN BILLBOARD
    const [ApolloBanBillboard, { loading: loading3, error: error3, data: data3 }] = useLazyQuery(BanBillboard);
    useEffect(() => {
        if (data3) {
            window.location.reload();
        }
    }, [data3]);

    // BAN MACHINE
    const [ApolloBanMachine, { loading: loading4, error: error4, data: data4 }] = useLazyQuery(BanMachine);
    useEffect(() => {
        if (data4) {
            window.location.reload();
        }
    }, [data4]);

    // BAN ADS
    const [ApolloBanAds, { loading: loading5, error: error5, data: data5 }] = useLazyQuery(BanAds);
    useEffect(() => {
        if (data5) {
            window.location.reload();
        }
    }, [data5]);


    //date
    const [date, setDate] = useState('');
    const [unixTime, setUnixTime] = useState('');
    useEffect(() => {
        const dateObject = new Date(date);
        const unix = dateObject.getTime();
        setUnixTime(unix);
    }, [date]);

    function handleDateChange(event) {
        setDate(event.target.value);
    }

    const handleBan = () => {
        const targetId = props.id;
        const unixSecond = unixTime / 1000;

        console.log("SEND BAN API REQUEST");
        console.log("TARGET ID: " + targetId);
        console.log("TARGET ID: " + props.type);

        console.log(unixSecond);
        console.log(reasonRef.current.value);
        switch (props.type) {
            case "brand":
                ApolloBanBrand({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: parseInt(unixSecond),
                        reason: reasonRef.current.value
                    }
                })
            case "store":
                ApolloBanStore({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: parseInt(unixSecond),
                        reason: reasonRef.current.value
                    }
                })
            case "member":
                ApolloBanMember({
                    variables: {
                        params: [
                            {
                                id: targetId,
                                phone: {
                                    country: props.phone.country,
                                    number: props.phone.number
                                }
                            }
                        ],
                        expireAt: parseInt(unixSecond),
                        reason: reasonRef.current.value
                    }
                })
            case "billboard":
                ApolloBanBillboard({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: parseInt(unixSecond),
                        reason: reasonRef.current.value
                    }
                })
            case "machine":
                ApolloBanMachine({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: parseInt(unixSecond),
                        reason: reasonRef.current.value
                    }
                })
            case "ads":
                ApolloBanAds({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: parseInt(unixSecond),
                        reason: reasonRef.current.value
                    }
                })
        }

    };


    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "2px solid #e36414" }}>封鎖</Button>


            {modal && (
                <div className="confirm-modal">
                    <div onClick={toggleModal} className="confirm-overlay"></div>
                    <div className="confirm-modal-content">
                        <Box m="20px">

                            {/* <TextField type="date" value={date} onChange={handleDateChange} /> */}
                            {/* <Button onClick={handleGetUnix}>Get Unix time</Button> */}

                            <Box padding={".5rem 0"}>Unix time: {unixTime}</Box>
                            <Box color={"black"}>
                                <TextField
                                    fullWidth
                                    id="datetime-local"
                                    label="過期時間"
                                    type="datetime-local"
                                    // defaultValue="2017-05-24T10:30"
                                    value={date}
                                    onChange={handleDateChange}
                                    sx={{ marginBottom: "1rem" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField className="modal_input_textfield"
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="封鎖原因"
                                    inputRef={reasonRef}
                                    sx={{ marginBottom: "1rem", backgroundColor: "#1F2A40", borderRadius: "5px", color: "black" }}
                                />

                            </Box>

                            <Box display={"flex"} justifyContent={"center"} padding={".5rem 0 0 0"}>
                                <button className="my-button" onClick={handleBan}>確認</button>
                            </Box>



                        </Box>
                    </div>
                </div>
            )}
        </>
    )
}