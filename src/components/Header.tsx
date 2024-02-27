import React from 'react';
import {
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
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styles from './Header.module.scss';

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
      <header className={styles.bar}>
        <div className={styles.toolBar}>
          <button
            className={styles.menuButton}
            onClick={() => setOpenSidebar(true)}
          >
            <MenuIcon />
          </button>
          <p>Menu</p>
        </div>
      </header>
      <aside className={styles.sideBar}>
        <div className={styles.sideBarItem}>
          <HomeRoundedIcon></HomeRoundedIcon>
          <Link to={``} className={styles.sideBarItemText}>
            Home
          </Link>
        </div>
        {/* <Accordion>
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
        </Accordion> */}
      </aside>
    </>
  );
};

export default Header;
