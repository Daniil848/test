import { Box, List, ListItem, Typography, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const MainPage = () => {
  return (
    <>
      <List>
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
      </List>
    </>
  );
};

export default MainPage;