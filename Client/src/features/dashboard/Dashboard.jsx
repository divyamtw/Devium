import ToolSearch from "./components/ToolSearch/ToolSearchButton";

const Dashboard = () => {
  return (
    <div className="bg-background p-6 h-full rounded-l-3xl flex flex-col border-l border-t border-b border-border shadow-2xl overflow-hidden relative">
      <div
        id="dashboard-portal"
        className="absolute inset-0 z-100 pointer-events-none"
      ></div>
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Toolbar Area */}
      <div className="w-full flex items-center justify-center md:justify-between relative z-10 mb-8">
        <div className="hidden md:block">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>
        <ToolSearch />
        <div className="hidden md:block w-24"></div>
      </div>

      {/* Rest of Dashboard Content */}
      <div className="flex-1 rounded-2xl border border-dashed border-border/50 relative z-10 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Dashboard content goes here...
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
