import { createStyles, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    removeHighlight: {
      "&:focus-visible, &:focus": {
        outline: "none",
        boxShadow: "none",
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
              className={classes.removeHighlight}
            >
              {link}
            </Text>
          ) : (
            <Text
              color="white"
              component={Link}
              to={links[link].href}
              key={link}
              className={classes.removeHighlight}
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
