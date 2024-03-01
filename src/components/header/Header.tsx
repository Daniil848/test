import React from 'react';
import { useHeader } from './useHeader';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import styles from './Header.module.scss';

const Header = () => {
  const {
    state,
    openSidebar,
    setOpenSidebar,
    openAccordion,
    setOpenAccordion,
  } = useHeader();

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
          <p className={styles.menuText}>Menu</p>
        </div>
      </header>
      {openSidebar && (
        <aside className={styles.sideBar}>
          <div className={styles.sideBarClose}>
            <p className={styles.sideBarCloseText}>Menu</p>
            <CloseRoundedIcon onClick={() => setOpenSidebar(false)} />
          </div>
          <div className={styles.sideBarItem}>
            <HomeRoundedIcon />
            <Link to={``} className={styles.sideBarItemText}>
              Home
            </Link>
          </div>

          <div className={styles.sideBarAccordion}>
            <div
              className={styles.sideBarAccordionSummary}
              onClick={() => setOpenAccordion(!openAccordion)}
            >
              <div className={styles.sideBarAccordionTitle}>
                <PeopleRoundedIcon />
                <p className={styles.sideBarAccordionText}>Students</p>
              </div>
              <ExpandMoreIcon />
            </div>
            <ul className={openAccordion ? styles.sideBarAccordionDetails : ''}>
              {openAccordion &&
                state.students.map((student) => (
                  <li key={student.id} className={styles.sideBarAccordionLink}>
                    <Link to={`/student/${student.id}`}>{student.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.sideBarItem}>
            <FlashOnRoundedIcon />
            <Link to={`/characters`} className={styles.sideBarItemText}>
              Rick & Morty
            </Link>
          </div>
        </aside>
      )}
    </>
  );
};

export default Header;
