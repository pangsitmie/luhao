import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { tokens } from "../theme";

type Props = {
    QUERY: any;
    HANDLE_PAGE_CHANGE: (edges: any[]) => void;
    TYPE: string;
    ARGS_ID?: string;
    REFETCH: number;
    HANDLE_LOADING_STATE: (loading: boolean) => void;
};

type ResponsePath = {
    [key: string]: string;
};


const RESPONSE_PATH: ResponsePath[] = [
    { GET_BRAND_LIST: "managerGetBrandsPaginatedConnection" },
    { GET_STORE_LIST: "managerGetStoresPaginatedConnection" },
    { GET_MACHINE_LIST: "getStore.0.managerGetMachinesPaginatedConnection" },
    { GET_BILLBOARD_LIST: "getBrand.0.managerGetBrandBillboardsPaginatedConnection" },
    { GET_BRAND_PRINCIPAL_BRAND_LIST: "getBrandPrincipal.getBrandsPaginatedConnection" },
    { GET_BRAND_PRINCIPAL_STORE_LIST: "getBrandPrincipal.brands.0.managerGetStoresPaginatedConnection" },
    { GET_STORE_PRINCIPAL_STORE_LIST: "getStorePrincipal.getStoresPaginatedConnection" },
    { GET_STORE_PRINCIPAL_BONUS_GAME_LIST: "getBonusGamesPaginatedConnectionForStorePrincipal" },
];

const PAGE_SIZE = 10;

const Pagination = ({ QUERY, HANDLE_PAGE_CHANGE, TYPE, ARGS_ID, REFETCH, HANDLE_LOADING_STATE }: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [allCursors, setAllCursors] = useState([]);
    // const [lastIndexCursor, setLastIndexCursor] = useState("");
    const [refetchCursor, setRefetchCursor] = useState("");
    useEffect(() => {
        console.log("refetch cursor " + refetchCursor);
    }, [refetchCursor]);

    const handleRefetchCursor = (cursor: string) => {
        // console.log("All cursors " + allCursors);

        // check whether cursor is available in allCursors if available we want to set to index-1 cursor
        const index = allCursors.findIndex((c) => c === cursor);
        if (index > 0) {
            setRefetchCursor(allCursors[index - 1]);
        }
        else {
            setRefetchCursor("");
        }
    };


    const getResponsePath = (type: string): string | null => {
        const path = RESPONSE_PATH.find((p) => Object.keys(p)[0] === type);
        return path ? path[type] : null;
    };


    const { loading, data, fetchMore, refetch } = useQuery(QUERY, {
        variables: {
            args: [{ id: ARGS_ID }],
            next: { first: PAGE_SIZE },
        },
        // notifyOnNetworkStatusChange: true,
    });

    const handleDataUpdate = () => {
        const variables = {
            args: [{ id: ARGS_ID }],
            next: { first: PAGE_SIZE, after: refetchCursor },
            // next: { first: PAGE_SIZE },
        };

        refetch(variables);
        // setCurrentPage(1);
    };

    useEffect(() => {
        // console.log("refetch called " + REFETCH);
        handleDataUpdate();
    }, [REFETCH]);

    useEffect(() => {
        if (loading) {
            HANDLE_LOADING_STATE(true);
        } else {
            HANDLE_LOADING_STATE(false);
        }
    }, [loading]);

    useEffect(() => {
        if (data) {
            HANDLE_LOADING_STATE(false);
            console.log(data);
            const path = getResponsePath(TYPE);
            if (path !== null) {
                const response = path.split('.').reduce((acc: any, key: string) => acc && acc[key], data);
                if (response.edges.length > 0) {
                    HANDLE_PAGE_CHANGE(response.edges);
                    setTotalPages(response.totalPageCount);
                    setHasNextPage(response.hasNextPage);
                    setHasPreviousPage(response.hasPreviousPage);
                    setAllCursors(response.allCursors);
                    handleRefetchCursor(response.edges[response.edges.length - 1].cursor);
                }
            }
        }
    }, [data]);

    // if (loading) return <Loader />;
    // if (error) return <Error />;


    const handleNextPage = () => {
        const path = getResponsePath(TYPE);
        if (path !== null) {
            const response = path.split('.').reduce((acc: any, key: string) => acc && acc[key], data);
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
        }
    };

    const handlePreviousPage = () => {
        const path = getResponsePath(TYPE);
        if (path !== null) {
            const response = path.split('.').reduce((acc: any, key: string) => acc && acc[key], data);
            console.log("prevpage called");

            if (response.hasPreviousPage) {
                const firstCursor = response.edges[0].cursor;
                // setInitCursor(firstCursor);


                fetchMore({
                    variables: {
                        args: [{ id: ARGS_ID }],
                        previous: { last: PAGE_SIZE, before: firstCursor },
                        next: undefined
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        // const moreResultPath = getResponsePath(TYPE);
                        // const moreResultResponse = path.split('.').reduce((acc: any, key: string) => acc && acc[key], data);
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
        }
    };
    return (
        <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"1rem"}
        >
            {/* <IconButton
                aria-label="previous"
                onClick={handlePreviousPage}
                disabled={!hasPreviousPage}
            >
                <FirstPageIcon sx={{ color: colors.primary[100], opacity: currentPage === 1 ? "0.2" : "1" }} />
            </IconButton> */}
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
            {/* <IconButton
                aria-label="previous"
                onClick={handlePreviousPage}
                disabled={!hasPreviousPage}
            >
                <LastPageIcon sx={{ color: colors.primary[100], opacity: currentPage === 1 ? "0.2" : "1" }} />
            </IconButton> */}
        </Box>
    )
}
export default Pagination