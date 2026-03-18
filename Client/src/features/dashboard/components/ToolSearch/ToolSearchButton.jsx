import { SearchIcon } from "./ToolSearchIcons.jsx";
import { openToolbox } from "../../hooks/useToolSearch.js";

const ToolSearchButton = () => {
  return (
    <button
      onClick={openToolbox}
      className="flex items-center gap-3 px-4 py-3.5 w-80 sm:w-96 md:w-xl lg:w-160 rounded-2xl border border-border bg-background shadow-sm text-base text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
    >
      <SearchIcon className="w-5 h-5 opacity-70" />
      <span className="font-medium">Search tools...</span>
      <kbd className="ml-auto pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[11px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
};

export default ToolSearchButton;
