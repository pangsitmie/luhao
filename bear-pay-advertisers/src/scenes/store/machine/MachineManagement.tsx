import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
// THEME
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CreateMachineModal from './CreateMachineModal';
import { HealthCheck } from '../../../graphQL/Queries';
// QRCODE
import QRCode from 'qrcode'
import jsPDF from 'jspdf';
import { useTranslation } from 'react-i18next';
import { PatchMachineFavorite } from '../../../graphQL/Mutations';
import { useMutation, useQuery } from '@apollo/client';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import axios from 'axios';
import { getRESTEndpoint } from '../../../utils/Utils';
import { Machine } from '../../../types/Machine';
import MachineListModal from './MachineListModal';
import MachineCommodityListModal from './MachineCommodityItem';

interface MachineQRCode {
    machineName: string;
    qrcode: string;
}


const MachineManagement = () => {
    const location = useLocation();
    const state = location.state;
    // console.log("STATE" + state.data.id); // output: "the-page-id"
    const { t } = useTranslation();

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== SEARCH ==========================
    const searchValueRef = useRef<HTMLInputElement>(null);

    // const [ApolloSearchMachineByName, { loading, error, data }] = useLazyQuery(SearchMachineByName);
    // useEffect(() => {
    //     if (data) {
    //         console.log(data);
    //         if (data.getMachine.length > 0) {
    //             const { node, ...machineData } = data.getMachine[0];
    //             console.log(machineData);
    //             // machineData now contains the whole data of the machine without the node object

    //             setMachineDatas([machineData]);
    //         } else {
    //             toast.error(t('cant_find'));
    //         }
    //     }
    //     if (loading) {
    //         console.log("loading");
    //     }
    //     if (error) {
    //         toast.error(error.message);
    //     }
    // }, [data, loading, error])

    const submitSearch = () => {
        let searchValue = searchValueRef.current?.value || "";

        console.log(searchValue);
        if (searchValue.length > 0) {
            let search = machineArraySearch(initMachineDatas, searchValue);
            setMachineDatas(search);
        } else {
            //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setMachineDatas(initMachineDatas);
        }

        // search with API
        // LOG SEARCH STATES
        // let searchValue = searchValueRef.current?.value || "";
        // if (searchValue === "") {
        //     setMachineDatas(initMachineDatas);
        //     return;
        // }
        // ApolloSearchMachineByName({
        //     variables: {
        //         args: [
        //             {
        //                 name: searchValue
        //             }
        //         ]
        //     }
        // });
    };


    //SEARCH FUNCTION
    const machineArraySearch = (array: Machine[], keyword: string): Machine[] => {
        const searchTerm = keyword;

        return array.filter((value) => {
            return (
                (value.name.match(new RegExp(searchTerm, "g")))
            );
        });
    };

    // ====================== SEARCH END ======================


    // ====================== PAGINATION ======================
    const [initMachineDatas, setInitMachineDatas] = useState<Machine[]>([]);
    const [machineDatas, setMachineDatas] = useState<Machine[]>([]);

    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);


    // const [refetchCount, setRefetchCount] = useState(0);
    // const triggerRefetch = () => {
    //     setRefetchCount(refetchCount + 1);
    // };
    // ====================== PAGINATION END ======================


    // ====================== GET MACHINE LIST REST ======================
    const { refetch: refetchHealthCheck } = useQuery(HealthCheck);

    const REST_FetchMachineList = async () => {
        console.log("REST_FetchMachineList");
        const MAX_RETRY_ATTEMPTS = 3;
        let retryCount = 0;

        while (retryCount < MAX_RETRY_ATTEMPTS) {
            try {
                setLoadingState(true);
                let URI = `${getRESTEndpoint()}/machine/getList`;

                const response = await axios.post(URI, {
                    "storeId": state.data.id,
                }, {
                    headers: {
                        // need to put Authorization Bearer token
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response);
                if (response.data && response.data.data) {
                    console.log(response.data.data);
                    setMachineDatas(response.data.data);
                    setInitMachineDatas(response.data.data);
                    break; // exit the loop if the API call was successful
                } else {
                    refetchHealthCheck();
                    toast("Loading...");
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoadingState(false);
            }

            retryCount++;
            console.log(`Retrying API call (attempt ${retryCount})...`);

            if (retryCount > 0) {
                await new Promise(resolve => setTimeout(resolve, 1500)); // wait for 1 second before retrying
            }
        }
        if (retryCount === MAX_RETRY_ATTEMPTS) {
            console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
        }
    };

    useEffect(() => {
        REST_FetchMachineList();
        REST_FetchMachineQRCodes();
    }, []);

    const [ApolloPatchMachineFavorite, { loading: loadingPatch, error: errorPatch, data: dataPatch }] = useMutation(PatchMachineFavorite);

    useEffect(() => {
        if (dataPatch) {
            console.log(dataPatch)
            REST_FetchMachineList();
        }
        if (errorPatch) {
            toast.error(errorPatch.message);
        }
        if (loadingPatch) {
            console.log(loadingPatch);
        }
    }, [dataPatch, errorPatch, loadingPatch])


    const handlePatchMachineFavorite = (selectedId: string, favoriteBool: boolean) => {
        console.log("machineId: " + selectedId);
        console.log("set Favorite to: " + !favoriteBool);

        ApolloPatchMachineFavorite({
            variables: {
                machineId: selectedId,
                favorite: !favoriteBool
            },
        });
        if (favoriteBool) {
            toast.error("Machine removed from favorite!");
        } else {
            toast.success("Machine added to favorite!");
        }
    };

    // =================== QR CODE ===================
    const [REST_MachineQRCodes, setREST_MachineQRCodes] = useState([]);



    const REST_FetchMachineQRCodes = async () => {
        setLoadingState(true);

        let URI = `${getRESTEndpoint()}/machine/generateQRCodes`;
        try {
            const response = await axios.post(URI, {
                "storeId": state.data.id,
            }, {
                headers: {
                    // need to put Authorization Bearer token
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                }
            });
            setREST_MachineQRCodes(response.data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoadingState(false);
        }
    }



    const [imgUrls, setImgUrls] = useState({});
    useEffect(() => {
        if (REST_MachineQRCodes) {
            for (const item of REST_MachineQRCodes as MachineQRCode[]) {
                generateQrCode(item.machineName, item.qrcode);
            }
        }
    }, [REST_MachineQRCodes]);

    const generateQrCode = async (machineName: string, qrCodePaypload: string) => {
        try {
            const response = await QRCode.toDataURL(qrCodePaypload);
            setImgUrls(prevUrls => ({ ...prevUrls, [machineName]: response }));
        } catch (error) {
            console.log(error);
        }
    }

    //create pdf
    function createPdfWithImages(images: string[], keys: string[]): jsPDF {
        const doc = new jsPDF();

        images.forEach((imageUrl: string, index: number) => {
            const x = index % 2 === 0 ? 10 : 105;
            const y = Math.floor(index / 2) % 2 === 0 ? 10 : 148;
            doc.addImage(imageUrl, 'JPEG', x, y, 88, 88);
            doc.text(keys[index], x + 44, y + 88, { align: 'center' });
            if (index % 4 === 3) {
                doc.addPage();
            }
        });

        return doc;
    }

    function downloadPdf() {
        const keys = Object.keys(imgUrls);
        const images: string[] = Object.values(imgUrls);

        const doc = createPdfWithImages(images, keys);
        doc.save(`${state.data.name}_機台 QRCODE.pdf`);
    }

    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"15%"}>
                <h1 className='userManagement_title'>{state.data.name} - {t('machines')}</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>
                {/* name Search */}
                <Box
                    display="flex"
                    borderRadius="10px"
                    height={"52px"}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}>
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('machine_name') || ''} inputRef={searchValueRef} />
                </Box>

                {/* SEARCH BTN */}
                <Button
                    sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        minWidth: "120px",
                        height: "52px",
                        borderRadius: "10px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                    onClick={submitSearch}>
                    <SearchIcon sx={{ mr: "10px", fontsize: ".8rem", color: "white" }} />
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        {t('search')}
                    </Typography>
                </Button>

                <Box
                    display="flex"
                    borderRadius="10px"
                    marginLeft={"auto"}
                    gap={"1rem"}
                >

                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        minWidth: "120px",
                        height: "52px",
                        borderRadius: "10px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={downloadPdf}
                    >
                        <Typography color={"white"} variant="h5" fontWeight="500">
                            {t('download')} QR
                        </Typography>
                    </Button>

                    <CreateMachineModal props={state.data} />
                </Box>
            </Box>



            {/* TABLE DIV */}
            <Box
                borderRadius="10px"
                height={"45%"}
                sx={{
                    backgroundColor: colors.primary[400],
                }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    p="15px"
                ></Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="10px"
                >
                    <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('favorite')}</Typography>
                    </Box>
                    <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('machine_name')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('machine_code')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('connection_status')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('products')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('details')}</Typography>
                    </Box>
                </Box>

                {/* machine data map here */}
                <Box
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}
                >
                    {loadingState ?
                        (
                            <Box p={"1rem"}>
                                <Loader />
                            </Box>
                        )
                        :
                        machineDatas.map((item, i) => (
                            <Box
                                key={`${item.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === machineDatas.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {
                                        item.favorite === true ?
                                            <IconButton onClick={() => { handlePatchMachineFavorite(item.id, item.favorite) }}>
                                                <StarRateIcon sx={{ color: "#ffb703" }} />
                                            </IconButton>
                                            :
                                            <IconButton onClick={() => { handlePatchMachineFavorite(item.id, item.favorite) }}>
                                                <StarBorderIcon />
                                            </IconButton>
                                    }
                                </Box>
                                <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.name}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.code}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (item.connStatus === true) {
                                            return (
                                                <Typography variant="h5" color={colors.greenAccent[400]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('online')}
                                                </Typography>
                                            )
                                        }
                                        else {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('offline')}
                                                </Typography>
                                            )
                                        }
                                    })()}
                                </Box>

                                <Box
                                    width={"20%"}
                                    display={"flex"}
                                    alignItems={"center"} justifyContent={"center"}
                                    borderRadius="4px">
                                    <MachineCommodityListModal props={item} storeData={state.data} onUpdate={() => REST_FetchMachineList()} />
                                </Box>
                                <Box
                                    width={"20%"}
                                    display={"flex"}
                                    alignItems={"center"} justifyContent={"center"}
                                    borderRadius="4px">
                                    <MachineListModal props={item} storeData={state.data} onUpdate={() => REST_FetchMachineList()} />
                                </Box>
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box >
    )
}



export default MachineManagement