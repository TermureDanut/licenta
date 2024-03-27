import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SchoolIcon from '@mui/icons-material/School';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

// data from api call
const data = [
    {icon: <AudiotrackIcon/>, label: 'AudiotrackIcon'},
    {icon: <AudiotrackIcon/>, label: 'AudiotrackIcon'},
    {icon: <AudiotrackIcon/>, label: 'AudiotrackIcon'},
    {icon: <AudiotrackIcon/>, label: 'AudiotrackIcon'},
];

const ClassroomsList = ({drawerOpen}) => {
    const [open, setOpen] = React.useState(true);
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
                        // set drawerOpen
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

                        <KeyboardArrowDown
                            sx={{
                                mr: -1,
                                opacity: drawerOpen ? 1 : 0,
                                transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                transition: '0.1s',
                            }}
                        />
                    </ListItemButton>
                    {open && drawerOpen &&
                        data.map((item) => (
                            <ListItemButton
                                key={item.label}
                                sx={{py: 0, minHeight: 32}}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
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