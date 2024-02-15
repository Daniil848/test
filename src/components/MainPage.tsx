import React from 'react';
import { Stack, TextField, Button } from '@mui/material';

const MainPage = () => {
  const styles = {
    form: {
      position: 'absolute',
      top: '35%',
      display: 'flex',
      flexDirection: 'column',
      width: '450px',
      margin: 'auto',
      verticalAlign: 'middle',
    },
  };

  return (
    <>
      {/* <List>
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
      </List> */}
      <Stack sx={styles.form} spacing={2}>
        <TextField label="Ф.И.О."></TextField>
        <TextField label="Оценка"></TextField>
        <TextField label="Посещение"></TextField>
        <Button variant="contained" size="large">
          OK
        </Button>
      </Stack>
    </>
  );
};

export default MainPage;
