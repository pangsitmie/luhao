import { useState } from 'react';
import { IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';



const OrderMethodButton = ({ CALLBACK_FUNCTION }) => {
    const [isDescending, setIsDescending] = useState(false);

    const handleClick = () => {
        const newMethod = isDescending ? 'asc' : 'desc';
        setIsDescending(!isDescending);
        CALLBACK_FUNCTION(newMethod);
    };

    return (
        <IconButton onClick={handleClick}>
            {isDescending ? (
                <ArrowDownward sx={{ color: "#fff" }} />
            ) : (
                <ArrowUpward sx={{ color: "#fff" }} />
            )}
        </IconButton>
    );
};

export default OrderMethodButton;
