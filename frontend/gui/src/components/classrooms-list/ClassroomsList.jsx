import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SchoolIcon from '@mui/icons-material/School';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const ClassroomsList = ({drawerOpen, teacherData}) => {
    const [open, setOpen] = useState(true);
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/teachers/getAllClasses/" + teacherData.id);
                const data = await response.json();
                setClassrooms(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Paper elevation={0} sx={{maxWidth: 256, width: '100%'}}>
                <Box
                    sx={{
                        pb: open ? 2 : 0,
                    }}
                >
                    <ListItemButton
                        alignItems="flex-start"
                        onClick={() => setOpen(!open)}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <SchoolIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Classrooms"
                            primaryTypographyProps={{
                                sx: {
                                    alignSelf: 'center',
                                    ml: open ? 0 : 3,
                                }
                            }}
                            sx={{opacity: drawerOpen ? 1 : 0}}
                        />
                        {drawerOpen ? <KeyboardArrowDown
                            sx={{
                                mr: -1,
                                opacity: drawerOpen ? 1 : 0,
                                transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                transition: '0.1s',
                            }}
                        /> : <></>}

                    </ListItemButton>
                    {open && drawerOpen &&
                        classrooms.map((classroom, index) => (
                            <ListItemButton
                                key={index}
                                sx={{py: 0, minHeight: 32, marginLeft: 2}}
                            >
                                <ListItemIcon>
                                    <LabelImportantIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={classroom.name}
                                    primaryTypographyProps={{fontSize: 14, fontWeight: 'medium'}}
                                />
                            </ListItemButton>
                        ))}
                </Box>
            </Paper>
        </Box>
    );
}

export default ClassroomsList;
