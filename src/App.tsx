import { Container, createStyles, Drawer, Stack, Text } from "@mantine/core";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import NotFound from "./components/NotFound";
import Background from "./images/background.jpg";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    background: {
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      position: "fixed",
      top: 0,
      left: "320px",
      minWidth: "100%",
      minHeight: "100%",
    },
    drawer: {
      background:
        "linear-gradient(90deg, #1E272B, 90%, rgba(238, 117, 70, 0.8) 90%);",
      width: "370px",
      "&:focus:not(:focus-visible)": {
        boxShadow:
          "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
      },
      "&:focus-visible": {
        boxShadow:
          "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
      },
    },
    "transition-enter": {
      opacity: 0,
      transform: "translate(0, 25px)",
      zIndex: 1,
    },
    "transition-enter-active": {
      opacity: 1,
      transform: "translate(0, 0)",
      transition: "opacity 250ms ease-out, transform 300ms ease",
    },
    "transition-exit": { opacity: 1, transform: "translate(0, 0)" },
    "transition-exit-active": {
      opacity: 0,
      transform: "translate(0, 30px)",
      transition: "opacity 250ms ease-out, transform 300ms ease",
    },
    drawerText: {
      color: "white",
      paddingRight: "30px",
      userSelect: "none",
    },
    titleText: {
      fontSize: "34px",
    },
    drawerGroup: {
      paddingTop: "166.5px",
      paddingRight: "35px",
      textAlign: "right",
      "&:hover": {
        outline: "none",
      },
    },
  };
});

const App = () => {
  const { classes } = useStyles();
  const location = useLocation();

  const getNameFromPath = (path: string) => path.replace("/", "");

  return (
    <div className={classes.background}>
      <Drawer
        opened={true}
        onClose={() => {}}
        className={classes.drawer}
        withCloseButton={false}
      >
        <Container className={classes.drawerText}>
          <Stack spacing="xs" className={classes.drawerGroup}>
            <Text color="white" className={classes.titleText}>
              {location.pathname === "/"
                ? "Anurag Singh"
                : getNameFromPath(location.pathname)}
            </Text>
            {location.pathname === "/" && (
              <Text size="xl" color="white">
                Software Engineer
              </Text>
            )}
            <br />
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames={{
                  enter: classes["transition-enter"],
                  exit: classes["transition-exit"],
                  exitActive: classes["transition-exit-active"],
                  enterActive: classes["transition-enter-active"],
                }}
                timeout={200}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </Stack>
        </Container>
      </Drawer>
    </div>
  );
};

export default App;
