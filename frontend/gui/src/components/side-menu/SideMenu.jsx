import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import ClassroomsList from "../classrooms-list/ClassroomsList";
import {useNavigate} from "react-router-dom";
import {Avatar, Menu, MenuItem} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SideMenu = ({
                      teacherData,
                      adddedClassroom,
                      inClassroomsPage,
                      inHomePage,
                      classroom
                  }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [textInput, setTextInput] = useState("");
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAccount, setAnchorElAccount] = useState(null);

    const handleAddButtonClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleAdd = async () => {
        console.log(teacherData);
        await fetch(
            "http://localhost:8080/api/teachers/addClass/" + teacherData.id,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: textInput,
                }),
            }
        );
        //const jsonResponse = await response.json();
        setTextInput("");
        handleCloseDialog();
        adddedClassroom(true);
    };

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleExercitiiClick = () => {
        navigate("/exercises", {
            state: {teacherData: teacherData},
        });
    };

    const navigateHome = () => {
        navigate("/teacher", {
            state: {teacherData: teacherData},
        });
    }

    const handleDropDownClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickAccount = (event) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleCloseAccount = () => {
        setAnchorElAccount(null);
    };
    const firstLetter = teacherData.firstName.charAt(0).toUpperCase();
    const handleLogout = () => {
        navigate("/");
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{backgroundColor: "white"}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex'}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                            }}
                        >
                            <MenuIcon sx={{color: 'grey'}}/>
                        </IconButton>

                        {inHomePage ?
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Button sx={{
                                    '&:hover': {
                                        backgroundColor: 'initial',
                                    },
                                }} onClick={navigateHome}>
                                    <Typography variant="h6" sx={{
                                        color: 'grey', '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}>
                                        Classrooms
                                    </Typography>
                                </Button>
                                {inClassroomsPage ?
                                    <div>
                                        <ArrowForwardIosIcon
                                            sx={{fontSize: "small", marginLeft: 1, marginRight: 1, color: 'grey'}}/>
                                        <Button sx={{
                                            '&:hover': {
                                                backgroundColor: 'initial',
                                            },
                                        }}>
                                            <Typography variant="h6" sx={{
                                                color: 'grey',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}>
                                                {classroom.name}
                                            </Typography>
                                        </Button>
                                    </div>
                                    : <></>}
                            </div>
                            : <></>}
                        <Button
                            onClick={handleDropDownClick}
                            endIcon={anchorEl ? <ArrowDropUpIcon sx={{color: 'grey'}}/> :
                                <ArrowDropDownIcon sx={{color: 'grey'}}/>}
                            sx={{
                                marginLeft: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                },
                            }}
                        >
                            <Typography variant="h7" sx={{color: 'grey'}}>
                                Exercitii
                            </Typography>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Button sx={{
                                    marginLeft: 2, '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                    },
                                }} onClick={handleExercitiiClick}>
                                    <Typography variant="h7" sx={{color: 'black'}}>
                                        Informatica
                                    </Typography>
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {inClassroomsPage || inHomePage ?
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleAddButtonClick}
                                edge="start"
                                sx={{
                                    marginRight: 5
                                }}
                            >
                                <AddIcon sx={{color: 'grey'}}/>
                            </IconButton> : <></>
                        }

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleClickAccount}
                            edge="start"
                            sx={{marginRight: 1}}
                        >
                            {/*{firstLetter ? (*/}
                            {/*    <AccountCircleIcon sx={{color: 'grey'}}>{firstLetter}</AccountCircleIcon>*/}
                            {/*) : (*/}
                            {/*    <AccountCircleIcon sx={{color: 'grey'}}/>*/}
                            {/*)}*/}
                            <Avatar>{firstLetter}</Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorElAccount}
                            open={Boolean(anchorElAccount)}
                            onClose={handleCloseAccount}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleCloseAccount}>
                                <AccountCircleIcon sx={{color: 'grey', marginRight: 1}}/>
                                Account
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon sx={{color: 'grey', marginRight: 1}}/>
                                Logout
                            </MenuItem>
                        </Menu>
                        {/*<IconButton*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="open drawer"*/}
                        {/*    onClick={() => {*/}
                        {/*    }}*/}
                        {/*    edge="start"*/}
                        {/*    sx={{*/}
                        {/*        marginRight: 5*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <AccountCircleIcon sx={{color: 'grey'}}/>*/}
                        {/*</IconButton>*/}
                        {/*<IconButton*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="open drawer"*/}
                        {/*    onClick={() => {*/}
                        {/*    }}*/}
                        {/*    edge="start"*/}
                        {/*    sx={{*/}
                        {/*        marginRight: 5*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <LogoutIcon sx={{color: 'grey'}}/>*/}
                        {/*</IconButton>*/}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItem key={"Acasa"} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={navigateHome}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Acasa"} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                    <ClassroomsList drawerOpen={open} teacherData={teacherData}/>
                </List>
            </Drawer>
            <Dialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                sx={{textAlign: "center", padding: "20px"}}
            >
                <div>
                    <p style={{fontSize: "20px"}}>Creeaza o clasa</p>
                </div>
                <div className="dialog-content">
                    <TextField
                        label="Adauga numele clasei"
                        variant="outlined"
                        value={textInput}
                        onChange={handleTextInputChange}
                        fullWidth
                    />
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        color="primary"
                        sx={{marginTop: "10px", marginBottom: "10px"}}
                    >
                        Add
                    </Button>
                </div>
            </Dialog>
        </Box>
    );
}

export default SideMenu;