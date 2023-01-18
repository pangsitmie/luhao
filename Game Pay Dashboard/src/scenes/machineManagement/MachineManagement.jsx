import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// THEME
import { Box, Button, Card, CardContent, Grid, TextField, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CreateMachineModal from './CreateMachineModal';
import MachineListModal from './MachineListModal';
import { GetMachineList } from '../../graphQL/Queries';
import Pagination from '../../components/Pagination';
import Refresh from '../../components/Refresh';

// QRCODE
import QRCode from 'qrcode'
import jsPDF from 'jspdf';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';



const MachineManagement = () => {
    const location = useLocation();
    const state = location.state;
    // console.log(state); // output: "the-page-id"
    // console.log("STATE" + state.data.id); // output: "the-page-id"
    // console.log("STATE" + state.data.name); // output: "the-page-id"

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // ====================== STATES ======================

    // PAGINATION
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
        setCurrentPage(offset / limit + 1);
    }

    const [searchFilter, setSearchFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    const [initMachineDatas, setInitMachineDatas] = useState([]);
    const [machineDatas, setMachineDatas] = useState([]);


    const [imgUrls, setImgUrls] = useState({});


    //REF
    const searchRef = useRef('');

    const { loading, error, data } = useQuery(GetMachineList
        , {
            variables: {
                args: [
                    {
                        id: state.data.id
                    }
                ],
                limit: limit,
                offset: offset
            }
        }
    );
    useEffect(() => {
        if (data) {
            setMachineDatas(data.getStore[0].managerGetMachines);
            setInitMachineDatas(data.getStore[0].managerGetMachines);
        }
    }, [data]);



    //FUNCTIONS
    const submitSearch = () => {
        //CALL SEARCH FUNCTION
        let value = searchRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(machineDatas, value);
            setMachineDatas(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setMachineDatas(initMachineDatas)
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

    // =================== QR CODE ===================
    useEffect(() => {
        if (machineDatas) {
            for (const machine of machineDatas) {
                generateQrCode(machine.name, machine.qrCode);
            }
        }
    }, [machineDatas]);


    useEffect(() => {
        setImgUrls({});// clear the img url array so it can download per page
        const startIndex = offset;
        const endIndex = offset + limit;
        const machinesInCurrentPage = machineDatas.slice(startIndex, endIndex);
        for (const machine of machinesInCurrentPage) {
            generateQrCode(machine.name, machine.qrCode);
        }
        // ...
    }, [offset, limit, machineDatas]);


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
        doc.save(`${currentPage}_${state.data.name}_機台_QR.pdf`);
    }

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Box p={2} position="flex" height={"100%"} overflow={"hidden"} flexDirection={"column"}>
            <Box height={"15%"}>
                <h1 className='userManagement_title'>{state.data.name} - 機台管理</h1>
                <Typography variant="h5" sx={{ color: colors.grey[400], margin: "-1rem 0 1rem 0" }}>{state.data.location.city} - {state.data.location.district} - {state.data.location.address}</Typography>
            </Box>

            {/* SEARCH DIV */}
            <Box display="flex" marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    mr={"1rem"}
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder="機台名稱" inputRef={searchRef} />
                </Box>

                {/* SEARCH BTN */}
                <Button sx={{
                    backgroundColor: colors.primary[300],
                    color: colors.grey[100],
                    minWidth: "120px",
                    height: "52px",
                    marginLeft: "1rem",
                    borderRadius: "10px",
                    padding: "0px",
                    marginRight: "2rem",
                    ':hover': {
                        bgcolor: colors.primary[300],
                        border: '1px solid white',
                    }
                }}
                    onClick={submitSearch}>
                    <SearchIcon sx={{ mr: "10px", fontsize: ".8rem", color: "white" }} />
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        查詢
                    </Typography>
                </Button>

                <Box
                    display="flex"
                    borderRadius="10px"
                    marginLeft={"auto"}
                    padding={"0"}
                >

                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        minWidth: "120px",
                        height: "52px",
                        marginLeft: "1rem",
                        borderRadius: "10px",
                        padding: "0px",
                        marginRight: "2rem",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={downloadPdf}
                    >
                        <Typography color={"white"} variant="h5" fontWeight="500">
                            下載 QR
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
                        {/* pagination */}
                        <Pagination
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange}
                        />
                    </Box>

                    <Box width={"10%"}>
                        {/* refresh button */}
                        <Refresh
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange} />
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

                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">UUID</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">機台名稱</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">機台號碼</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">連接狀態</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">更新資料</Typography>
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
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"} padding={"0 1rem"}>{item.uuid}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.name}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.code}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {(() => {
                                    if (item.connStatus === true) {
                                        return (
                                            <Typography variant="h5" color={colors.greenAccent[400]} sx={{ margin: ".5rem .5rem" }}>
                                                連線中
                                            </Typography>
                                        )
                                    }
                                    else {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                已斷線
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
                                <MachineListModal props={item} />
                            </Box>
                        </Box>
                    ))}
                </Box>

            </Box>
        </Box >
    )
}



export default MachineManagement