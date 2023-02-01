import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
const Pagination = ({ limit, offset, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(Math.ceil(offset / limit) + 1)
    }, [offset, limit])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const newOffset = (newPage - 1) * limit;
        onPageChange({ limit, offset: newOffset });
    }

    return (
        <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} pl={"11%"}>
            <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                variant="contained"
                sx={{ padding: ".5rem 1rem", margin: "0 2rem", borderRadius: "12px" }}>
                <NavigateBeforeIcon sx={{ color: "white" }} />
            </Button>

            <span >{currentPage}</span>

            <Button
                // disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                variant="contained"
                sx={{ padding: ".5rem 1rem", margin: "0 2rem", borderRadius: "12px" }}>
                <NavigateNextIcon sx={{ color: "white" }} />
            </Button>

        </Box >
    );
}

export default Pagination;
