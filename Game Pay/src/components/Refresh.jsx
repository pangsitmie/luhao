import React, { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

const Refresh = ({ limit, offset, onPageChange }) => {
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
        <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
            <Button
                onClick={() => handlePageChange(currentPage)}
                sx={{ padding: ".5rem", borderRadius: "12px", background: "transparent" }}>
                <RefreshIcon sx={{ color: "white" }} />
            </Button>
        </Box>
    )
}

export default Refresh