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
    // necessary for content to be below app bar
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

const SideMenu = ({teacherData}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [textInput, setTextInput] = useState("");
    const navigate = useNavigate();

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
        const response = await fetch(
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
        const jsonResponse = await response.json();
        setTextInput("");
        handleCloseDialog();
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

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{backgroundColor: "#000080"}}>
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
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Hello {teacherData.firstName}
                        </Typography>
                        <Button sx={{
                            marginLeft: 5, '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            },
                        }} onClick={handleExercitiiClick}>
                            <Typography variant="h7" sx={{color: 'white'}}>
                                Exercitii
                            </Typography>
                        </Button>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleAddButtonClick}
                            edge="start"
                            sx={{
                                marginRight: 5
                            }}
                        >
                            <AddIcon/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                            }}
                            edge="start"
                            sx={{
                                marginRight: 5
                            }}
                        >
                            <AccountCircleIcon/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                            }}
                            edge="start"
                            sx={{
                                marginRight: 5
                            }}
                        >
                            <LogoutIcon/>
                        </IconButton>
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
                    {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    {/*    <ListItem key={text} disablePadding sx={{ display: 'block' }}>*/}
                    {/*        <ListItemButton*/}
                    {/*            sx={{*/}
                    {/*                minHeight: 48,*/}
                    {/*                justifyContent: open ? 'initial' : 'center',*/}
                    {/*                px: 2.5,*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <ListItemIcon*/}
                    {/*                sx={{*/}
                    {/*                    minWidth: 0,*/}
                    {/*                    mr: open ? 3 : 'auto',*/}
                    {/*                    justifyContent: 'center',*/}
                    {/*                }}*/}
                    {/*            >*/}
                    {/*                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                    {/*            </ListItemIcon>*/}
                    {/*            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />*/}
                    {/*        </ListItemButton>*/}
                    {/*    </ListItem>*/}
                    {/*))}*/}
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
                    <ClassroomsList drawerOpen={open}/>
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