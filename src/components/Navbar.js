import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {BasicTabs} from '../components/Tabs'
import { useNavigate } from "react-router-dom";


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
            "&:focus": {
                width: "100ch"
            }
        }
    }
}));




export const Navbar=()=> {
    let navigate = useNavigate();


    const [search , setSearch] = React.useState('')
    const [enter , setEnter] = React.useState(0)


    const searching =(event)=>{
        event.preventDefault();
        setEnter(1);
        // console.log(search)
        // history.push(/products${history.location.search}&sort=${sortWith})

        // console.log(navigate)
        navigate({
            pathname:'/',
            search: '?searchig='+search,

        })
    }

    return (

        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                        >
                        <p> <span style={{color:'red',fontWeight:'bold',fontSize:'25px'}}>Google </span>search </p>
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onKeyPress={event => event.key === 'Enter' ? searching(event) : null}
                                onChange={(event)=>setSearch(event.target.value)}
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>

            {
               enter === 0 ? <h1 className="text-muted" >Search for anything</h1> : <BasicTabs searchKey={search}/>
            }


        </>
        
    );
}
