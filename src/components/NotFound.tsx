import { createStyles, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    links: {
      transition: "all .3s ease-in-out",
      "&:focus-visible, &:focus": {
        outline: "none",
        boxShadow: "none",
      },
      "&:hover": {
        color: "rgb(90, 90, 90)",
      },
    },
  };
});

const NotFound = () => {
  const { classes } = useStyles();
  return (
    <>
      <Text color="white">404</Text>
      <br />
      <Text color="white" component={Link} to="/" className={classes.links}>
        Click here to go home
      </Text>
    </>
  );
};

export default NotFound;
