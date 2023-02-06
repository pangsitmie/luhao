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
import { GetCommodityList } from 'src/graphQL/Queries';
import Pagination from 'src/components/Pagination';
import Refresh from 'src/components/Refresh';

// QRCODE
import Loader from 'src/components/loader/Loader';
import Error from 'src/components/error/Error';



const CommodityManagement = () => {
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


  const [initCommodityDatas, setInitCommodityDatas] = useState([]);
  const [commodityDatas, setComodityDatas] = useState([]);


  const [imgUrls, setImgUrls] = useState({});


  //REF
  const searchRef = useRef('');

  const { loading, error, data } = useQuery(GetCommodityList
    , {
      variables: {
        args: [
          {
            id: state.data.id
          }
        ],
        // limit: limit,
        // offset: offset
      }
    }
  );
  useEffect(() => {
    if (data) {
      console.log(data);
      setComodityDatas(data.getStore[0].commodities);
      setInitCommodityDatas(data.getStore[0].commodities);
    }
  }, [data]);



  //FUNCTIONS
  const submitSearch = () => {
    //CALL SEARCH FUNCTION
    let value = searchRef.current.value;
    if (value.length > 2) {
      let search = arraySearch(commodityDatas, value);
      setComodityDatas(search)
    } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
      setComodityDatas(initCommodityDatas)
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


  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <Box p={2} position="flex" flexDirection={"column"}>
      <Box height={"15%"}>
        <h1 className='userManagement_title'>{state.data.name} - 商品</h1>
        <Typography variant="h5" sx={{ color: colors.grey[400], margin: "-1rem 0 1rem 0" }}>{state.data.location.city} - {state.data.location.district} - {state.data.location.address}</Typography>
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
          <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder="機台名稱" inputRef={searchRef} />
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
            查詢
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
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">商品名稱</Typography>
          </Box>
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">價格</Typography>
          </Box>
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">庫存量</Typography>
          </Box>
          <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
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
          {commodityDatas.map((item, i) => (
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