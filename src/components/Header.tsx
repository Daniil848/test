import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {
  const [state , setState] = useState(false);

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton 						
            size="large"
						edge="start"
						color={"inherit"}
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => setState(true)
          }>
            <MenuIcon/>
          </IconButton>
          <Typography color="Inherit" variant="h6">Menu</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
				anchor={'left'}
				open={state}
				onClose={() => setState(false)}
				PaperProps={{
					sx: {
						bgcolor: 'grey'
					}
				}}>
          <List>
            <ListItem>
              <Link to="/student">student</Link>
            </ListItem>
          </List>
      </Drawer>
    </>
  );
};

export default Header;