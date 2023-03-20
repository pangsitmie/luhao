import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Loader from './loader/Loader';
import Error from './error/Error';

const PAGE_SIZE = 1;

const NewPagination = ({ QUERY, HANDLE_PAGE_CHANGE, RESPONSE_KEY, argsID }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    const { loading, error, data, fetchMore } = useQuery(QUERY, {
        variables: {
            args: [{ id: argsID }],
            next: { first: PAGE_SIZE },
        },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data) {
            console.log(data.getStore[0].managerGetMachinesPaginatedConnection);
            const pageInfo = data.getStore[0].managerGetMachinesPaginatedConnection.pageInfo;
            HANDLE_PAGE_CHANGE(data.getStore[0].managerGetMachinesPaginatedConnection.edges);
            setTotalPages(pageInfo.totalPageCount);
            setHasNextPage(pageInfo.hasNextPage);
            setHasPreviousPage(pageInfo.hasPreviousPage);
        }
    }, [data]);

    // if (loading) return <Loader />;
    if (error) return <Error />;

    const handleNextPage = () => {
        if (data.getStore[0].managerGetMachinesPaginatedConnection.pageInfo.hasNextPage) {
            const lastCursor = data.getStore[0].managerGetMachinesPaginatedConnection.edges[currentPage - 1].cursor;

            fetchMore({
                variables: {
                    args: [{ id: argsID }],
                    next: { first: PAGE_SIZE, after: lastCursor },
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.getStore[0].managerGetMachinesPaginatedConnection.edges;

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
        if (data.getStore[0].managerGetMachinesPaginatedConnection.pageInfo.hasPreviousPage) {
            const firstCursor = data.getStore[0].managerGetMachinesPaginatedConnection.edges[currentPage - 2].cursor;

            fetchMore({
                variables: {
                    args: [{ id: argsID }],
                    previous: { last: PAGE_SIZE, before: firstCursor },
                    next: undefined
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.getStore[0].managerGetMachinesPaginatedConnection.edges;

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
        >
            <Box width={"100px"} display={"flex"} justifyContent={"center"}>
                <Button
                    variant="contained"
                    onClick={handlePreviousPage}
                    disabled={!hasPreviousPage}
                    sx={{ padding: ".5rem 1rem", margin: "0 2rem", borderRadius: "12px", opacity: currentPage === 1 ? "0.3" : "1" }}
                >
                    <NavigateBeforeIcon sx={{ color: "white" }} />
                </Button>
            </Box>
            <span>{currentPage}</span>
            <Box width={"100px"} display={"flex"} justifyContent={"center"}>
                <Button
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    variant="contained"
                    sx={{ padding: ".5rem 1rem", margin: "0 2rem", borderRadius: "12px" }}
                >
                    <NavigateNextIcon sx={{ color: "white", opacity: currentPage === totalPages ? "0.3" : "1" }} />
                </Button>
            </Box>
        </Box>
    )
}
export default NewPagination