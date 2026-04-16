import { createPortal } from "react-dom";
import useToolSearch from "../../hooks/useToolSearch.js";
import { SearchIcon, CloseIcon } from "./ToolSearchIcons.jsx";

const GlobalToolSearchModal = () => {
  const {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    inputRef,
    filtered,
    handleSelect,
  } = useToolSearch();

  if (!isOpen) return null;

  return createPortal(
    <div
      className="absolute inset-0 z-100 flex items-start justify-center pt-[15vh] bg-background/80 backdrop-blur-sm pointer-events-auto"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-3xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden shadow-black/10 transition-all pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <SearchIcon className="text-muted-foreground shrink-0 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What tool do you need today?"
            className="flex-1 bg-transparent text-lg text-foreground font-medium outline-none placeholder:text-muted-foreground placeholder:font-normal py-1"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center p-1.5 rounded-md hover:bg-accent relative z-10 pointer-events-auto"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <ul className="max-h-[60vh] sm:max-h-112 overflow-y-auto py-2 px-2 scrollbar-thin relative z-10 pointer-events-auto">
          {filtered.length === 0 ? (
            <li className="px-4 py-12 text-center text-sm text-muted-foreground pointer-events-none">
              No tools found for{" "}
              <span className="text-foreground font-medium">"{query}"</span>
            </li>
          ) : (
            filtered.map((tool, index) => (
              <li key={tool.href}>
                <button
                  onClick={() => handleSelect(tool.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-4 px-3 py-3 text-sm transition-none text-left rounded-xl pointer-events-auto cursor-pointer ${
                    selectedIndex === index
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground text-foreground"
                  }`}
                >
                  <span className="text-xl flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border shadow-sm text-primary pointer-events-none">
                    {tool.logo}
                  </span>
                  <span className="font-semibold pointer-events-none">
                    {tool.name}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer Hints */}
        <div className="px-5 py-3 border-t border-border bg-muted/40 text-xs text-muted-foreground flex gap-5 items-center justify-between pointer-events-none">
          <div className="flex gap-5">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[10px] text-foreground font-medium shadow-sm">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[10px] text-foreground font-medium shadow-sm">
                ↓
              </kbd>{" "}
              navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[10px] text-foreground font-medium shadow-sm">
                ↵
              </kbd>{" "}
              open
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[10px] text-foreground font-medium shadow-sm">
                esc
              </kbd>{" "}
              close
            </span>
          </div>
          <span className="font-semibold tracking-tight text-[10px] uppercase opacity-50">
            Devium
          </span>
        </div>
      </div>
    </div>,
    document.getElementById("dashboard-portal") || document.body,
  );
};

export default GlobalToolSearchModal;
