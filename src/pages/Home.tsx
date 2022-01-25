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
  const links: { [key: string]: { href: string; external?: boolean } } = {
    blog: { href: "blog" },
    projects: { href: "projects" },
    email: { href: "mailto:contact@anurag.sh", external: true },
    github: { href: "https://github.com/Accurate0", external: true },
    linkedin: {
      href: "https://linkedin.com/in/anurag-singh8/",
      external: true,
    },
  };

  return (
    <Group direction="column" grow spacing="xs">
      {Object.keys(links).map((link) => (
        <>
          {links[link].external ? (
            <Text
              color="white"
              component="a"
              href={links[link].href}
              key={link}
              className={classes.links}
            >
              {link}
            </Text>
          ) : (
            <Text
              color="white"
              component={Link}
              to={links[link].href}
              key={link}
              className={classes.links}
            >
              {link}
            </Text>
          )}
        </>
      ))}
    </Group>
  );
};

export default Home;
