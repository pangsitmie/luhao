import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useLazyQuery } from '@apollo/client'
import { BanMember, BanBrand, BanStore, BanBillboard, BanMachine, BanAds } from "../../graphQL/Queries";
import "./ConfirmModal.css";
import { useTranslation } from 'react-i18next';

export default function ConfirmModal({ props }: any) {
    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const reasonRef = useRef<HTMLInputElement>(null) //creating a refernce for TextField Component


    // BAN BRAND
    const [ApolloBanBrand, { error, data }] = useLazyQuery(BanBrand);

    // BAN STORE
    const [ApolloBanStore, { error: error1, data: data1 }] = useLazyQuery(BanStore);

    // BAN STORE
    const [ApolloBanMember, { error: error2, data: data2 }] = useLazyQuery(BanMember);

    // BAN BILLBOARD
    const [ApolloBanBillboard, { error: error3, data: data3 }] = useLazyQuery(BanBillboard);

    // BAN MACHINE
    const [ApolloBanMachine, { error: error4, data: data4 }] = useLazyQuery(BanMachine);

    // BAN ADS
    const [ApolloBanAds, { error: error5, data: data5 }] = useLazyQuery(BanAds);

    useEffect(() => {
        if (data || data1 || data2 || data3 || data4 || data5) {
            window.location.reload();
        }
        if (error || error1 || error2 || error3 || error4 || error5) {
            console.log(error || error1 || error2 || error3 || error4 || error5);
        }
    }, [data, data1, data2, data3, data4, data5, error, error1, error2, error3, error4, error5]);



    //date
    const [date, setDate] = useState('');
    const [unixTime, setUnixTime] = useState<number>(0);

    useEffect(() => {
        const dateObject = new Date(date);
        const unix = dateObject.getTime();
        setUnixTime(unix);
    }, [date]);

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDate(event.target.value);
    }


    const handleBan = () => {
        const targetId = props.id;
        const unixSecond = unixTime / 1000;

        console.log("SEND BAN API REQUEST");
        console.log("TARGET ID: " + targetId);
        console.log("TARGET ID: " + props.type);

        console.log(unixSecond);
        console.log(reasonRef.current?.value);
        switch (props.type) {
            case "brand":
                ApolloBanBrand({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: unixSecond,
                        reason: reasonRef.current?.value
                    }
                });
                break;
            case "store":
                ApolloBanStore({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: unixSecond,
                        reason: reasonRef.current?.value
                    }
                });
                break;
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
                        expireAt: unixSecond,
                        reason: reasonRef.current?.value
                    }
                });
                break;
            case "billboard":
                ApolloBanBillboard({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: unixSecond,
                        reason: reasonRef.current?.value
                    }
                });
                break;
            case "machine":
                ApolloBanMachine({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: unixSecond,
                        reason: reasonRef.current?.value
                    }
                });
                break;
            case "ads":
                ApolloBanAds({
                    variables: {
                        args: [
                            {
                                id: targetId
                            }
                        ],
                        expireAt: unixSecond,
                        reason: reasonRef.current?.value
                    }
                });
                break;
        }


    };


    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "2px solid #e36414" }}>{t('ban')}</Button>

            {modal && (
                <div className="confirm-modal">
                    <div onClick={toggleModal} className="confirm-overlay"></div>
                    <Box className="confirm-modal-content">
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
                                    required
                                    sx={{ marginBottom: "1rem", borderRadius: "5px", color: "black" }}
                                />
                            </Box>

                            <Box display={"flex"} justifyContent={"center"} padding={".5rem 0 0 0"}>
                                <button className="my-button" onClick={handleBan}>{t('confirm')}</button>
                            </Box>
                        </Box>
                    </Box>
                </div>
            )}
        </>
    )
}