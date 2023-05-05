import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { HealthCheck } from '../../../graphQL/Queries';

import Loader from '../../../components/loader/Loader';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getRESTEndpoint } from '../../../utils/Utils';
import { toast } from 'react-toastify';
import Commodity from '../../../types/Commodity';
import CommodityListModal from './CommodityListModal';
import CreateCommodityModal from './CreateCommodityModal';


const CommodityManagement = () => {
  const location = useLocation();
  const state = location.state;
  const { t } = useTranslation();

  //THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // ====================== STATES ======================
  // LOADING STATE
  const [loadingState, setLoadingState] = useState(false);


  const [initCommodityDatas] = useState<Commodity[]>([]);
  const [commodityDatas, setCommodityDatas] = useState<Commodity[]>([]);

  //REF
  const searchValueRef = useRef<HTMLInputElement>(null);

  // ====================== GET MACHINE LIST REST ======================
  const { refetch: refetchHealthCheck } = useQuery(HealthCheck);

  const [refetchCount, setRefetchCount] = useState(0);
  const triggerRefetch = () => {
    setRefetchCount(refetchCount + 1);
  };

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
  }, [refetchCount]);



  //FUNCTIONS
  const submitSearch = (): void => {
    //CALL SEARCH FUNCTION
    let searchValue = searchValueRef.current?.value || "";

    if (searchValue.length > 2) {
      let search = arraySearch(commodityDatas, searchValue);
      setCommodityDatas(search)
    } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
      setCommodityDatas(initCommodityDatas)
    }
  }

  //SEARCH FUNCTION
  const arraySearch = (array: Commodity[], keyword: string) => {
    const searchTerm = keyword

    return array.filter(value => {
      return value.name.match(new RegExp(searchTerm, 'g'))
    })
  }


  return (
    <Box p={2} display="flex" flexDirection={"column"}>
      <Box height={"15%"}>
        <h1 className='userManagement_title'>{state.data.name} - {t('products')}</h1>
      </Box>

      {/* SEARCH DIV */}
      <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>
        {/* name Search */}
        <Box
          display="flex"
          borderRadius="10px"
          height={"52px"}
          maxWidth={150}
          sx={{
            backgroundColor: colors.primary[400],
          }}>
          <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder={t('product_name') || ''} inputRef={searchValueRef} />
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
        borderRadius="10px"
        height={"45%"}
        sx={{
          backgroundColor: colors.primary[400],
        }}
      >
        {/* PAGINATION & REFRESH DIV */}
        <Box
          display="flex"
          justifyContent="center"
          borderBottom={`0px solid ${colors.primary[500]}`}
          p="15px"
        >

        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
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
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('details')}</Typography>
          </Box>
        </Box>

        {/* machine data map here */}
        <Box
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
                borderBottom={i === commodityDatas.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
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
                  <CommodityListModal props={item} onUpdate={triggerRefetch} />
                </Box>
              </Box>
            ))}
        </Box>

      </Box>
    </Box >
  )
}



export default CommodityManagement