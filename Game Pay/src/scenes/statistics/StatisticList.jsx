import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client'
// QUERIES
import { GetAllBrands } from '../../graphQL/Queries'
import { BRAND_GetBrandList } from '../../graphQL/BrandPrincipalQueries'
// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Refresh from '../../components/Refresh';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useDispatch, useSelector } from "react-redux";
import { STORE_GetAllStores } from 'src/graphQL/StorePrincipalQueries';


const StatisticList = () => {
    const { entityName } = useSelector((state) => state.entity);

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================

    const [filter, setFilter] = useState('品牌名');
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };





    // ========================== REF ==========================
    const searchValueRef = useRef('');

    //========================== GRAPHQL ==========================

    // PAGINATION
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
    }

    const [initBrands, setInitBrands] = useState([]);
    const [brands, setBrands] = useState([]);


    let LIST_QUERY;
    switch (entityName) {
        case 'company':
            LIST_QUERY = GetAllBrands;
            break;
        case 'brand':
            LIST_QUERY = BRAND_GetBrandList;
            break;
        case 'store':
            LIST_QUERY = STORE_GetAllStores;
        default:
            break;
    }

    const { loading, error, data } = useQuery(LIST_QUERY, {
        variables: { limit, offset }
    });
    useEffect(() => {
        if (data) {
            switch (entityName) {
                case 'company':
                    setInitBrands(data.managerGetBrands); //all brand datas
                    setBrands(data.managerGetBrands); //datas for display
                    break;
                case 'brand':
                    setInitBrands(data.getBrandPrincipal.brands); //all brand datas
                    setBrands(data.getBrandPrincipal.brands); //datas for display
                    break;
                case 'store':
                    setInitBrands(data.getStorePrincipal.stores); //all brand datas
                    setBrands(data.getStorePrincipal.stores); //datas for display
                default:
                    break;
            }

        }
    }, [data, offset]);

    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        // LOG SEARCH STATES
        console.log("search: " + searchValueRef.current.value + " ");

        //CALL SEARCH FUNCTION
        let value = searchValueRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(brands, value);
            setBrands(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setBrands(initBrands)
        }
    };

    //SEARCH FUNCTION
    const arraySearch = (array, keyword, filter) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.name.match(new RegExp(searchTerm, 'g')) ||
                value.principal.name.match(new RegExp(searchTerm, 'g'))
        })
    }




    if (loading) return <Loader />;
    if (error) return <Error />;
    // ========================== RETURN ==========================
    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>統計</h1>
            </Box>

            {/* here */}
            {/* SEARCH DIV */}
            <Box className={"flex_media"}
                display="flex" marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, width: "200px" }} placeholder="品牌名 或 負責人" inputRef={searchValueRef} />
                </Box>


                {/* SEARCH BTN */}
                <Button sx={{
                    backgroundColor: colors.primary[300],
                    color: colors.grey[100],
                    minWidth: "150px",
                    height: "52px",
                    borderRadius: "10px",
                    padding: "0px",
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

            </Box>

            {/* here */}
            {/* TABLE DIV */}
            <Box
                backgroundColor={colors.primary[400]}
                borderRadius="10px"
                height={"100%"}
            >
                {/* PAGINATION & REFRESH DIV */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px 0 10px 0"
                >
                    <Pagination
                        limit={limit}
                        offset={offset}
                        onPageChange={handlePageChange}
                    />

                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    background={colors.grey[300]}
                    p="15px 0"
                >
                    <Box display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500" ml="15px">品牌名稱</Typography>
                    </Box>

                    <Box display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500" mr="25px">統計資料</Typography>
                    </Box>
                </Box>

                {/* here */}
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {/* MAP DATA */}
                    {brands.map((brand, i) => (
                        <Box
                            key={`${brand.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`3px solid ${colors.primary[500]}`}
                            p="10px 0"
                        >

                            <Box display="flex" alignItems={"center"} justifyContent={"center"} m={"0 15px"}>
                                <Typography color={colors.grey[100]} variant="h5" fontWeight="500">
                                    {brand.name}
                                </Typography>
                            </Box>
                            <Box
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-evenly"}
                                borderRadius="4px"
                                m={"0 15px"}
                            >
                                <Link
                                    to={"/statistic-management"}
                                    state={{
                                        data: brand,
                                    }}
                                >
                                    <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 1.2rem" }}>
                                        查看統計
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    ))}

                </Box>

            </Box>
        </Box >
    )
}

export default StatisticList