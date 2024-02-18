import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, State } from '../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Header = () => {
  const state: State = useAppSelector((state) => state.slice);
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
        <List>
          {state.students.map((student) => (
            <ListItem key={student.id}>
              <Link to={`/student/${student.id}`}>{student.name}</Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
