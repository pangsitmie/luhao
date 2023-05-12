// import React, { useState, useContext, useRef, useEffect } from 'react'
// import { useLazyQuery, useQuery } from '@apollo/client';
// import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import Loader from '../../components/loader/Loader';
// import Error from '../../components/error/Error';
// import { ColorModeContext, tokens } from "../../theme";
// import { useTranslation } from 'react-i18next';

// const PAGE_SIZE = 10;

// const RESPONSE_PATH = [
//     { GET_MACHINE_STATISTIC_LIST: "getStore.0.getStoreMachinesStatisticsTotalPaginatedConnection" },
// ];


// const LoadMore = ({ QUERY, HANDLE_PAGE_CHANGE, TYPE, ARGS_ID, START_AT, END_AT, ORDER_BY, ORDER_METHOD }) => {
//     const { t } = useTranslation();
//     //THEME
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const colorMode = useContext(ColorModeContext);


//     const [hasNextPage, setHasNextPage] = useState(false);
//     const [latestCursor, setLatestCursor] = useState("");
//     useEffect(() => {
//         console.log("latest cursor " + latestCursor);
//     }, [latestCursor]);

//     const getResponsePath = (type) => {
//         const path = RESPONSE_PATH.find((p) => Object.keys(p)[0] === type);
//         return path ? path[type] : null;
//     };

//     const { loading: initLoading, error: initError, data: initData, fetchMore } = useQuery(QUERY, {
//         variables: {
//             args: [{
//                 id: ARGS_ID
//             }],
//             startAt: START_AT,
//             endAt: END_AT,
//             order: {
//                 by: ORDER_BY,
//                 method: ORDER_METHOD
//             },
//             next: { first: PAGE_SIZE },
//         },
//     });


//     // useEffect(() => {
//     //     if (initData) {
//     //         const path = getResponsePath(TYPE);
//     //         const response = path.split('.').reduce((acc, key) => acc && acc[key], initData);
//     //         console.log(response);
//     //         console.log
//     //         HANDLE_PAGE_CHANGE(response.edges);
//     //         setHasNextPage(response.hasNextPage);
//     //         setLatestCursor(response.edges[response.edges.length - 1].cursor);
//     //     }
//     // }, []);

//     useEffect(() => {
//         if (!initLoading && initData) {
//             const path = getResponsePath(TYPE);
//             const response = path.split('.').reduce((acc, key) => acc && acc[key], initData);
//             console.log(response);
//             HANDLE_PAGE_CHANGE(response.edges);
//             setHasNextPage(response.hasNextPage);
//             setLatestCursor(response.edges[response.edges.length - 1].cursor);
//         }
//     }, [initData, initLoading]);

//     const [loadMoreData, { loading: loadingLoadMore, data: dataLoadMore, error: errorLoadMore }] = useLazyQuery(QUERY);

//     useEffect(() => {
//         if (dataLoadMore) {
//             const path = getResponsePath(TYPE);
//             const response = path.split('.').reduce((acc, key) => acc && acc[key], dataLoadMore);
//             console.log(response);
//             HANDLE_PAGE_CHANGE(response.edges);
//             setHasNextPage(response.hasNextPage);
//             setLatestCursor(response.edges[response.edges.length - 1].cursor);
//         }
//     }, [dataLoadMore]);

//     const handleNextPage = () => {

//         const variables = {
//             args: [{
//                 id: ARGS_ID
//             }],
//             startAt: START_AT,
//             endAt: END_AT,
//             order: {
//                 by: ORDER_BY,
//                 method: ORDER_METHOD
//             },
//             next: { first: PAGE_SIZE, after: latestCursor },

//         }
//         loadMoreData({ variables });
//     }


//     // const handleNextPage = () => {
//     //     const path = getResponsePath(TYPE);
//     //     const response = path.split('.').reduce((acc, key) => acc && acc[key], data);

//     //     if (response.hasNextPage) {
//     //         const lastCursor = response.edges[PAGE_SIZE - 1].cursor;
//     //         setLatestCursor(lastCursor);

//     //         fetchMore({
//     //             variables: {
//     //                 args: [{ id: ARGS_ID }],
//     //                 next: { first: PAGE_SIZE, after: latestCursor },
//     //             },
//     //             updateQuery: (prevResult, { fetchMoreResult }) => {
//     //                 const newEdges = response.edges;

//     //                 if (!newEdges.length) {
//     //                     return prevResult;
//     //                 }

//     //                 console.log(fetchMoreResult);

//     //                 // call HANDLE_PAGE_CHANGE with the updated data
//     //                 // HANDLE_PAGE_CHANGE([...prevResult.managerGetMachinesPaginatedConnection.edges, ...newEdges]);

//     //                 return fetchMoreResult;
//     //             },
//     //         });
//     //     }
//     // };

//     if (initLoading || loadingLoadMore) return <Loader />;
//     // if (initError) return <Error />;
//     return (
//         <Button
//             onClick={handleNextPage}
//             disabled={!hasNextPage}
//             sx={{
//                 border: "1px solid #cecece",
//                 borderRadius: "12px",
//                 padding: "0.5rem 2rem",
//                 transition: "all 0.2s ease-in-out",
//                 display: !hasNextPage ? "none" : "block",
//                 "&:hover": {
//                     transform: "scale(1.02)",
//                 },
//             }}
//         >
//             <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
//                 {t('load_more')}
//             </Typography>
//         </Button>
//     )
// }
// export default LoadMore