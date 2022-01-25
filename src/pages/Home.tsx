import { createStyles, Group, Text } from "@mantine/core";
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

const Home = () => {
  const { classes } = useStyles();
  const links = [
    <Text color="white" component={Link} to="blog" className={classes.links}>
      blog
    </Text>,
    <Text
      color="white"
      component={Link}
      to="projects"
      className={classes.links}
    >
      projects
    </Text>,
    <Text
      color="white"
      component="a"
      href={"mailto:contact@anurag.sh"}
      className={classes.links}
    >
      email
    </Text>,
    <Text
      color="white"
      component="a"
      href={"https://github.com/Accurate0"}
      className={classes.links}
    >
      github
    </Text>,
    <Text
      color="white"
      component="a"
      href={"https://linkedin.com/in/anurag-singh8/"}
      className={classes.links}
    >
      linkedin
    </Text>,
  ];

  return (
    <Group direction="column" grow spacing="xs">
      {links.map((link) => link)}
    </Group>
  );
};

export default Home;
