import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Loader from './loader/Loader';
import Error from './error/Error';
import { ColorModeContext, tokens } from "src/theme";

const PAGE_SIZE = 10;

const RESPONSE_PATH = [
    { GET_BRAND_LIST: "managerGetBrandsPaginatedConnection" },
    { GET_STORE_LIST: "managerGetStoresPaginatedConnection" },
    { GET_MACHINE_LIST: "getStore.0.managerGetMachinesPaginatedConnection" },
    { GET_BILLBOARD_LIST: "getBrand.0.managerGetBrandBillboardsPaginatedConnection" },
    { GET_BRAND_PRINCIPAL_BRAND_LIST: "getBrandPrincipal.getBrandsPaginatedConnection" },
    { GET_BRAND_PRINCIPAL_STORE_LIST: "getBrandPrincipal.brands.0.managerGetStoresPaginatedConnection" },
];


const Pagination = ({ QUERY, HANDLE_PAGE_CHANGE, TYPE, ARGS_ID }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    const getResponsePath = (type) => {
        const path = RESPONSE_PATH.find((p) => Object.keys(p)[0] === type);
        return path ? path[type] : null;
    };

    const { loading, error, data, fetchMore } = useQuery(QUERY, {
        variables: {
            args: [{ id: ARGS_ID }],
            next: { first: PAGE_SIZE },
        },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data) {
            console.log(data);
            const path = getResponsePath(TYPE);
            const response = path.split('.').reduce((acc, key) => acc && acc[key], data);
            // console.log(response);
            HANDLE_PAGE_CHANGE(response.edges);
            setTotalPages(response.totalPageCount);
            setHasNextPage(response.hasNextPage);
            setHasPreviousPage(response.hasPreviousPage);
        }
    }, [data]);

    // if (loading) return <Loader />;
    if (error) return <Error />;

    const handleNextPage = () => {
        const path = getResponsePath(TYPE);
        const response = path.split('.').reduce((acc, key) => acc && acc[key], data);
        console.log("nextpage called");
        if (response.hasNextPage) {
            const lastCursor = response.edges[PAGE_SIZE - 1].cursor;

            fetchMore({

                variables: {
                    args: [{ id: ARGS_ID }],
                    next: { first: PAGE_SIZE, after: lastCursor },
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newEdges = response.edges;

                    if (!newEdges.length) {
                        return prevResult;
                    }

                    setCurrentPage(currentPage + 1);

                    // call HANDLE_PAGE_CHANGE with the updated data
                    // HANDLE_PAGE_CHANGE([...prevResult.managerGetMachinesPaginatedConnection.edges, ...newEdges]);

                    return fetchMoreResult;
                },
            });
        }
    };

    const handlePreviousPage = () => {
        const path = getResponsePath(TYPE);
        const response = path.split('.').reduce((acc, key) => acc && acc[key], data);
        console.log("prevpage called");

        if (response.hasPreviousPage) {
            const firstCursor = response.edges[0].cursor;

            fetchMore({
                variables: {
                    args: [{ id: ARGS_ID }],
                    previous: { last: PAGE_SIZE, before: firstCursor },
                    next: undefined
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    const moreResultPath = getResponsePath(TYPE);
                    const moreResultResponse = path.split('.').reduce((acc, key) => acc && acc[key], data);
                    const newEdges = response.edges;

                    if (!newEdges.length) {
                        return prevResult;
                    }

                    setCurrentPage(currentPage - 1);

                    // call HANDLE_PAGE_CHANGE with the updated data
                    // HANDLE_PAGE_CHANGE([...newEdges, ...prevResult.managerGetMachinesPaginatedConnection.edges.slice(0, prevResult.managerGetMachinesPaginatedConnection.edges.length - newEdges.length)]);

                    return fetchMoreResult;
                },
            });
        }
    };
    return (
        <Box
            width={"110%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"1rem"}
        >
            <IconButton
                aria-label="previous"
                onClick={handlePreviousPage}
                disabled={!hasPreviousPage}
            >
                <NavigateBeforeIcon sx={{ color: colors.primary[100], opacity: currentPage === 1 ? "0.2" : "1" }} />
            </IconButton>

            <Typography color={colors.primary[100]} variant="h5" fontWeight="600">
                {currentPage}
            </Typography>

            <IconButton
                aria-label="previous"
                onClick={handleNextPage}
                disabled={!hasNextPage}
            >
                <NavigateNextIcon sx={{ color: colors.primary[100], opacity: currentPage === totalPages ? "0.2" : "1" }} />
            </IconButton>
        </Box>
    )
}
export default Pagination