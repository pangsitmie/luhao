import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// THEME
import { Box, Button, Card, CardContent, Grid, TextField, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "src/theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CreateCommodityModal from './CreateCommodityModal';
import CommodityListModal from './CommodityListModal';
import { GetCommodityList, HealthCheck } from 'src/graphQL/Queries';
import Pagination from 'src/components/Pagination';
import Refresh from 'src/components/Refresh';

// QRCODE
import Loader from 'src/components/loader/Loader';
import Error from 'src/components/error/Error';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getRESTEndpoint } from 'src/utils/Utils';
import { toast } from 'react-toastify';


const CommodityManagement = () => {
  const location = useLocation();
  const state = location.state;
  const { t } = useTranslation();

  //THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // ====================== STATES ======================
  // LOADING STATE
  const [loadingState, setLoadingState] = useState(false);
  const handleLoadingState = (loading) => {
    setLoadingState(loading);
  }


  const [initCommodityDatas, setInitCommodityDatas] = useState([]);
  const [commodityDatas, setCommodityDatas] = useState([]);

  //REF
  const searchRef = useRef('');

  // ====================== GET MACHINE LIST REST ======================
  const { loading: loadingHealthCheck, error: errorHealthCheck, data: dataHealthCheck, refetch: refetchHealthCheck } = useQuery(HealthCheck);

  const REST_FetchCommodityList = async () => {
    const MAX_RETRY_ATTEMPTS = 3;
    let retryCount = 0;

    while (retryCount < MAX_RETRY_ATTEMPTS) {
      try {
        setLoadingState(true);
        let URI = `${getRESTEndpoint()}/commodity/getList`;

        const response = await axios.post(URI, {
          "storeId": state.data.id,
        }, {
          headers: {
            // need to put Authorization Bearer token
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          }
        });

        if (response.data && response.data.data) {
          console.log(response.data.data);
          setCommodityDatas(response.data.data);

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
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait for 1 second before retrying
      }
    }
    if (retryCount === MAX_RETRY_ATTEMPTS) {
      console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
    }
  };

  useEffect(() => {
    REST_FetchCommodityList();
  }, []);



  //FUNCTIONS
  const submitSearch = () => {
    //CALL SEARCH FUNCTION
    let value = searchRef.current.value;
    if (value.length > 2) {
      let search = arraySearch(commodityDatas, value);
      setCommodityDatas(search)
    } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
      setCommodityDatas(initCommodityDatas)
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


  return (
    <Box p={2} position="flex" flexDirection={"column"}>
      <Box height={"15%"}>
        <h1 className='userManagement_title'>{state.data.name} - {t('products')}</h1>
      </Box>

      {/* SEARCH DIV */}
      <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>
        {/* name Search */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          height={"52px"}
          maxWidth={150}>
          <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder={t('product_name')} inputRef={searchRef} />
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
            {t('search')}
          </Typography>
        </Button>

        <Box
          display="flex"
          borderRadius="10px"
          marginLeft={"auto"}
          height={"52px"}
        >
          <CreateCommodityModal props={state.data} />
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
            {/* <Pagination
              limit={limit}
              offset={offset}
              onPageChange={handlePageChange}
            /> */}
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
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('product_name')}</Typography>
          </Box>
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('price')}</Typography>
          </Box>
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('stock')}</Typography>
          </Box>
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('detail')}</Typography>
          </Box>
        </Box>

        {/* machine data map here */}
        <Box
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          height={"100%"}
          overflow={"auto"}
        >
          {loadingState ?
            (
              <Box p={"1rem"}>
                <Loader />
              </Box>
            )
            :
            commodityDatas.map((item, i) => (
              <Box
                key={`${item.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`3px solid ${colors.primary[500]}`}
                p="10px"
              >
                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.name}</Box>
                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.price}</Box>
                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.stock}</Box>
                <Box
                  width={"25%"}
                  display={"flex"}
                  alignItems={"center"} justifyContent={"center"}
                  borderRadius="4px">
                  <CommodityListModal props={item} />
                </Box>
              </Box>
            ))}
        </Box>

      </Box>
    </Box >
  )
}



export default CommodityManagement