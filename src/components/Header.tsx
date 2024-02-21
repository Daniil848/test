import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import '../App.css';

const Header = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  if (!state.students) return null;
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color={'inherit'}
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpenSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="Inherit" variant="h6">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
      >
        <Link to={``} className="home">
          Home
        </Link>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ fontWeight: 500, fontSize: '19px' }}
          >
            Students
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {state.students.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText>
                    <Link
                      to={`/student/${student.id}`}
                      className="sidebar-link"
                    >
                      {student.name}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </>
  );
};

export default Header;
