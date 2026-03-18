import { useState, useEffect, useRef } from "react";
import { featuresList } from "../../featuresList.jsx";
import { useNavigate } from "react-router-dom";

export const openToolbox = () => window.dispatchEvent(new Event("open-toolbox"));

export default function useToolSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filtered = featuresList.filter((tool) =>
    tool.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === "k" || e.code === "KeyK")) {
        e.preventDefault();
        e.stopPropagation();
        handleOpen();
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handler, { capture: true });
    window.addEventListener("open-toolbox", handleOpen);

    return () => {
      window.removeEventListener("keydown", handler, { capture: true });
      window.removeEventListener("open-toolbox", handleOpen);
    };
  }, []);

  const handleSelect = (href) => {
    navigate(href);
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length),
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length > 0) {
          handleSelect(filtered[selectedIndex].href);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, handleSelect]);

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    inputRef,
    filtered,
    handleSelect,
  };
}
