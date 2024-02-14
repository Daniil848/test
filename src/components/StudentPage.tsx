import { List, ListItem, Stack, Typography } from "@mui/material";

const StudentPage = () => {

  const styles = {
    studentName : {
      fontSize : "36px",
      color : "primary"
    },
    list : {
      
    },
    listItem : {
      display : "flex",
      justifyContent : "space-between",
    },
    courses : {
      fontSize : "24px",
      borderBottom : 2,
      borderColor : "primary",
      width : "fit-content",
      margin : "auto",
    },
    courseTitle : {
      fontSize : "20px"
    },
    grade : {
      fontSize : "20px",
      borderBottom : 1,
      borderColor : "primary"
    },
  };

  return (
    <>
      <Typography sx={styles.studentName}>Ладыгин Даниил Львович</Typography>
      <List sx={styles.list}>
        <Typography sx={styles.courses}>Предметы</Typography>
        <ListItem sx={styles.listItem}>
          <Typography sx={styles.courseTitle}>Математика</Typography>
          <Stack direction='row' spacing={2}>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
          </Stack>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <Typography sx={styles.courseTitle}>Информатика</Typography>
          <Stack direction='row' spacing={2}>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
          </Stack>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <Typography sx={styles.courseTitle}>Биология</Typography>
          <Stack direction='row' spacing={2}>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
          </Stack>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <Typography sx={styles.courseTitle}>Физика</Typography>
          <Stack direction='row' spacing={2}>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
          </Stack>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <Typography sx={styles.courseTitle}>Химия</Typography>
          <Stack direction='row' spacing={2}>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
            <Typography sx={styles.grade}>5</Typography>
          </Stack>
        </ListItem>
      </List>
    </>
  );
};

export default StudentPage;