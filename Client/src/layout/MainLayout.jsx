import Aside from "./Aside.jsx";
import MainContent from "./MainContent.jsx";
import useResizable from "../hooks/useResizable.js";
import { useEffect } from "react";
import { SIDEBAR_WIDTH_KEY } from "../constants.js";

const getInitialWidth = () => {
  const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
  return saved ? Number(saved) : window.innerWidth * 0.2;
};

const MainLayout = () => {
  const { width, setWidth, startResizing } = useResizable({
    min: 300,
    max: window.innerWidth * 0.5,
    initial: getInitialWidth(),
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, width);
  }, [width]);

  return (
    <div className="relative flex h-screen overflow-hidden bg-background">
      <button
        className="absolute top-3 left-6 z-10 outline-none bg-primary text-primary-foreground font-mono font-bold text-xl px-8 py-3 capitalize rounded-r-2xl active:scale-95 -translate-x-30 hover:-translate-x-7 transition-all duration-200 shadow-lg glow-text"
        onClick={() => setWidth(300)}
      >
        reset
      </button>
      <Aside width={width} />

      <div
        onMouseDown={startResizing}
        className="h-full w-1.5 cursor-col-resize hover:bg-primary transition-colors duration-200"
      />

      <MainContent />
    </div>
  );
};

export default MainLayout;
