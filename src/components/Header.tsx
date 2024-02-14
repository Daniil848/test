import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton color="inherit">
          <MenuIcon/>
        </IconButton>
        <Typography color="Inherit" variant="h6">Menu</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;