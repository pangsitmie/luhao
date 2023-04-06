import React, { useEffect, useState, useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
// THEME
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "src/theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CreateMachineModal from './CreateMachineModal';
import MachineListModal from './MachineListModal';
import { GetMachineListPagination } from 'src/graphQL/Queries';
// QRCODE
import QRCode from 'qrcode'
import jsPDF from 'jspdf';
import MachineCommodityListModal from './MachineCommodityItem';
import { useTranslation } from 'react-i18next';
import Pagination from 'src/components/Pagination';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { PatchMachineFavorite } from 'src/graphQL/Mutations';
import { useMutation, useQuery } from '@apollo/client';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import { toast } from 'react-toastify';

const MachineManagement = () => {
    const location = useLocation();
    const state = location.state;
    // console.log("STATE" + state.data.id); // output: "the-page-id"
    const { t } = useTranslation();


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // ====================== SEARCH ======================
    const searchRef = useRef('');
    //FUNCTIONS
    const submitSearch = () => {
        //CALL SEARCH FUNCTION
        let value = searchRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(machineDatas, value);
            setMachineDatas(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setMachineDatas(initMachineDatas.node)
        }
    }
    //SEARCH FUNCTION
    const arraySearch = (array, keyword) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.code.match(new RegExp(searchTerm, 'g')) ||
                value.name.match(new RegExp(searchTerm, 'g'))
        })
    }
    // ====================== SEARCH END ======================


    // ====================== PAGINATION ======================
    const [initMachineDatas, setInitMachineDatas] = useState([]);
    const [machineDatas, setMachineDatas] = useState([]);

    const handlePageChange = (data) => {
        setMachineDatas(data);
    }
    // ====================== PAGINATION END ======================


    const [ApolloPatchMachineFavorite, { loading: loadingPatch, error: errorPatch, data: dataPatch }] = useMutation(PatchMachineFavorite);

    const handlePatchMachineFavorite = (selectedId, favoriteBool) => {
        console.log("machineId: " + selectedId);
        console.log("set Favorite to: " + !favoriteBool);

        ApolloPatchMachineFavorite({
            variables: {
                machineId: selectedId,
                favorite: !favoriteBool
            },
        });

        //we want to find the machine in the machineDatas array and update the favorite value
        let machineDatasCopy = [...machineDatas];
        let machineIndex = machineDatasCopy.findIndex(machine => machine.node.id === selectedId);
        machineDatasCopy[machineIndex].node.favorite = !favoriteBool;
        setMachineDatas(machineDatasCopy);

        if (favoriteBool) {
            toast.error("Machine removed from favorite!");
        } else {
            toast.success("Machine added to favorite!");
        }
    };




    // =================== QR CODE ===================
    const [imgUrls, setImgUrls] = useState({});
    useEffect(() => {
        if (machineDatas) {
            for (const machine of machineDatas) {
                generateQrCode(machine.node.name, machine.node.qrCode);
            }
        }
    }, [machineDatas]);

    useEffect(() => {
        setImgUrls({});// clear the img url array so it can download per page
        const machinesInCurrentPage = machineDatas;
        for (const machine of machinesInCurrentPage) {
            generateQrCode(machine.node.name, machine.node.qrCode);
        }
    }, [machineDatas]);

    const generateQrCode = async (machineName, qrCodePaypload) => {
        try {
            const response = await QRCode.toDataURL(qrCodePaypload);
            setImgUrls(prevUrls => ({ ...prevUrls, [machineName]: response }));
        } catch (error) {
            console.log(error);
        }
    }

    //create pdf
    function createPdfWithImages(images, keys) {
        const doc = new jsPDF();

        images.forEach((imageUrl, index) => {
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
        const images = Object.values(imgUrls);
        // const keys = Object.keys(imgUrls).slice(startIndex, endIndex);
        // const images = Object.values(imgUrls).slice(startIndex, endIndex);

        const doc = createPdfWithImages(images, keys);
        doc.save(`${state.data.name}_機台_QR.pdf`);
    }
    // ====================== QRCODE END ======================

    // if (loading) return <Loader />;
    // if (error) return <Error />;

    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"15%"}>
                <h1 className='userManagement_title'>{state.data.name} - {t('machines')}</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box className='flex_media' marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={150}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder={t('machine_name')} inputRef={searchRef} />
                </Box>

                {/* SEARCH BTN */}
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
                    onClick={submitSearch}>
                    <SearchIcon sx={{ mr: "10px", fontsize: ".8rem", color: "white" }} />
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        {t('sesarch')}
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
                backgroundColor={colors.primary[400]}
                borderRadius="10px"
                height={"45%"}
            >
                {/* PAGINATION & REFRESH DIV */}
                <Box
                    display="flex"
                    justifyContent="center"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                >
                    <Box width={"90%"}>
                        <Pagination QUERY={GetMachineListPagination} HANDLE_PAGE_CHANGE={handlePageChange} TYPE={"GET_MACHINE_LIST"} ARGS_ID={state.data.id} />
                    </Box>

                    <Box width={"10%"}>
                        {/* refresh button */}
                        {/* <Refresh
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange} /> */}
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    background={colors.grey[300]}
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
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {machineDatas.map((item, i) => (
                        <Box
                            key={`${item.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`3px solid ${colors.primary[500]}`}
                            p="10px"
                        >
                            <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {
                                    item.node.favorite === true ?
                                        <IconButton onClick={() => { handlePatchMachineFavorite(item.node.id, item.node.favorite) }}>
                                            <StarRateIcon sx={{ color: "#ffb703" }} />
                                        </IconButton>
                                        :
                                        <IconButton onClick={() => { handlePatchMachineFavorite(item.node.id, item.node.favorite) }}>
                                            <StarBorderIcon />
                                        </IconButton>
                                }
                            </Box>
                            <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.node.name}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.node.code}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {(() => {
                                    if (item.node.connStatus === true) {
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
                                <MachineCommodityListModal props={item.node} storeData={state.data} />
                            </Box>
                            <Box
                                width={"20%"}
                                display={"flex"}
                                alignItems={"center"} justifyContent={"center"}
                                borderRadius="4px">
                                <MachineListModal props={item.node} />
                            </Box>
                        </Box>
                    ))}
                </Box>

            </Box>
        </Box >
    )
}



export default MachineManagement