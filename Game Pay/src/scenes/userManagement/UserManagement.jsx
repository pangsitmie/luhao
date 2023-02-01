import React, { useEffect, useState, useRef } from 'react'
import { useQuery, } from '@apollo/client'
import "./userManagement.css"
// QUERIES
import { GetAllMember } from '../../graphQL/Queries'
// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import UserListModal from './UserListModal';
import Pagination from '../../components/Pagination';
import Refresh from '../../components/Refresh';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';


const UserManagement = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // STATES
    const [status, setStatus] = useState('');

    //REF
    const searchValueRef = useRef('');

    //FUNCTIONS
    const handleChange = (e) => {
        setStatus(e.target.value);
    };



    // PAGINATION
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
    }

    const { loading, error, data } = useQuery(GetAllMember, {
        variables: { limit, offset }
    });
    const [initMember, setInitMember] = useState([]);
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (data) {
            setInitMember(data.getAllMember);
            setMembers(data.getAllMember);
        }
    }, [data]);

    const submitSearch = () => {
        //CALL SEARCH FUNCTION
        let searchValue = searchValueRef.current.value;

        if (searchValue.length > 2) {
            let search = memberArraySearch(members, searchValue);
            setMembers(search)
        }
        else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setMembers(initMember)
        }
    }
    //SEARCH FUNCTION
    const memberArraySearch = (array, keyword) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.profile.nickname.match(new RegExp(searchTerm, 'g')) ||
                value.phone.number.match(new RegExp(searchTerm, 'g'))
        })
    }

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Box p={2} position="flex" height={"100%"} overflow={"hidden"} flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>使用者管理</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box display="flex" marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    mr={"1rem"}
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder="暱稱 或 手機" inputRef={searchValueRef} />
                </Box>
                {/* phone search */}
                <FormControl sx={{ minWidth: 150 }} >
                    <InputLabel id="demo-simple-select-label" >狀態</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleChange}
                    >
                        <MenuItem value={"無"}>無</MenuItem>
                        <MenuItem value={"正常"}>正常</MenuItem>
                        <MenuItem value={"封鎖"}>封鎖</MenuItem>
                    </Select>
                </FormControl>
                {/* SEARCH BTN */}
                <Button sx={{
                    backgroundColor: colors.primary[300],
                    color: colors.grey[100],
                    minWidth: "120px",
                    height: "52px",
                    marginLeft: "1rem",
                    borderRadius: "10px",
                    padding: "0px",
                    marginRight: "2rem",
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
            </Box>


            {/* TABLE DIV */}
            <Box
                backgroundColor={colors.primary[400]}
                borderRadius="10px"
                height={"50%"}
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
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">暱稱</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">手機</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">狀態</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">更新資料</Typography>
                    </Box>
                </Box>

                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {members.map((member, i) => (
                        <Box
                            key={`${member.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`3px solid ${colors.primary[500]}`}
                            p="10px"
                        >
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{member.profile.nickname}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{member.phone.number}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {(() => {
                                    if (member.status.name === "disable") {
                                        return (
                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                停用
                                            </Typography>)
                                    }
                                    else if (member.status.name === "banned") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                封鎖
                                            </Typography>)
                                    }
                                    else if (member.status.name === "removed") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                移除
                                            </Typography>)
                                    }
                                    else {
                                        return (
                                            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                正常
                                            </Typography>)
                                    }
                                })()}
                            </Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}><UserListModal props={member} /></Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >
    )
}

export default UserManagement







