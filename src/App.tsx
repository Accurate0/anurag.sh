import { Container, createStyles, Drawer, Group, Text } from "@mantine/core";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Background from "./images/background.png";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    background: {
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      position: "fixed",
      top: 0,
      left: "370px",
      minWidth: "100%",
      minHeight: "100%",
    },
    drawer: {
      backgroundColor: "#1E272B",
      width: "370px",
    },
    ".fade-enter": { opacity: 0, transform: "translate(0, 25px)", zIndex: 1 },
    ".fade-enter.fade-enter-active": {
      opacity: 1,
      transform: "translate(0, 0)",
      transition: "opacity 250ms ease-out, transform 300ms ease",
    },
    ".fade-exit": { opacity: 1, transform: "translate(0, 0)" },
    ".fade-exit.fade-exit-active": {
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
      textAlign: "right",
      "&:hover": {
        outline: "none",
      },
    },
    removeHighlight: {
      "&:focus-visible": {
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
        noOverlay
        noCloseOnClickOutside
        noCloseOnEscape
        hideCloseButton
        className={classes.drawer}
      >
        <Container className={classes.drawerText}>
          <Group
            direction="column"
            grow
            spacing="xs"
            className={classes.drawerGroup}
          >
            <Text color="white" className={classes.titleText}>
              {location.pathname === "/"
                ? "Anurag Singh"
                : getNameFromPath(location.pathname)}
            </Text>
            <br />
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames={{
                  enter: classes[".fade-enter"],
                  exit: classes[".fade-exit"],
                  exitActive: classes[".fade-exit.fade-exit-active"],
                  enterActive: classes[".fade-enter.fade-enter-active"],
                }}
                timeout={200}
              >
                <Routes location={location}>
                  <Route path="*" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/projects" element={<Projects />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </Group>
        </Container>
      </Drawer>
    </div>
  );
};

export default App;
