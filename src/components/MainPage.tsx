import { Box, Stack, List, ListItem, Typography, IconButton, TextField, Button} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

const MainPage = () => {

  const styles = {
    form : {
      display : "flex",
      flexDirection : "column",
      width : "450px",
      margin : "auto",
    },
  };

  return (
    <>
      <List>
        <Link to={"/student"}>
          <ListItem sx={{
            display : "flex",
            justifyContent : "space-between",
            height : "50px",
            borderBottom : 1,
            borderColor : "grey.400"
          }}>
            <Typography>Bdfyjd Bdfy Bdfyjdbx</Typography>
            <Box sx={{
              display : "flex",
              alignItems : "center",
              justifyContent : "space-between"
            }}>
              <Typography>Средний балл: 4,3</Typography>
              <IconButton color="primary">
                <EditIcon/>
              </IconButton>
            </Box>
          </ListItem>
        </Link>
      </List>
      <Stack sx={styles.form} spacing={2}>
        <TextField></TextField>
        <TextField></TextField>
        <TextField></TextField>
        <Button variant="contained" size="large">OK</Button>
      </Stack>
    </>
  );
};

export default MainPage;