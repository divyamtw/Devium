import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/services/auth.api";

const Aside = ({ width }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const navLinks = [
    {
      Name: "Dashboard",
      href: "/",
      logo: <i className="ri-dashboard-fill"></i>,
    },
    {
      Name: "Music",
      href: "/music",
      logo: <i className="ri-music-2-line"></i>,
    },
    {
      Name: "GitHub",
      href: "/github",
      logo: <i className="ri-github-line"></i>,
    },
    {
      Name: "Calendar",
      href: "/calendar",
      logo: <i className="ri-calendar-line"></i>,
    },
    {
      Name: "Task",
      href: "/task",
      logo: <i className="ri-task-line"></i>,
    },
    {
      Name: "Weather",
      href: "/weather",
      logo: <i className="ri-cloud-fill"></i>,
    },
    {
      Name: "Password Gen",
      href: "/password-generator",
      logo: <i className="ri-key-2-line"></i>,
    },
    {
      Name: "Kanban",
      href: "/kanban",
      logo: <i class="ri-kanban-view-2"></i>,
    },
  ];

  const baseCss =
    "min-h-10 w-52 py-2 flex items-center justify-center active:scale-105 scale-110 active:transition-all duration-50 font-semibold rounded-full border transition-colors";

  return (
    <div className="h-screen flex">
      <aside
        className="relative bg-background text-foreground flex flex-col items-center  w-full rounded-br-3xl rounded-tr-3xl overflow-hidden border-r border-border"
        style={{ width: `${width}px` }}
      >
        {/* Brand Header */}
        <div className="w-full px-4 pt-5 pb-4 border-b border-border flex flex-col items-center gap-y-0.5">
          <span className="text-2xl font-extrabold tracking-tight text-foreground select-none">
            Devium
          </span>
          <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground select-none">
            Build, Connect, Create
          </span>
        </div>

        <div className="p-6 flex flex-col items-center gap-y-4 border-b border-border w-full mb-4">
          <img
            src={
              user?.profileImg || "https://ik.imagekit.io/cd0pgs18s/default.jpg"
            }
            alt="User profile"
            className="w-40 h-40 object-cover rounded-full border-2 border-border shadow-2xl"
          />
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-xl font-bold text-foreground capitalize">
              {user?.username || "Guest"}
            </span>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${baseCss} ${isActive ? "bg-primary text-primary-foreground border-none" : "bg-transparent text-muted-foreground hover:text-foreground border-border/50"}`
              }
            >
              <i className="ri-user-settings-line mr-1 text-sm"></i>
              View Profile
            </NavLink>
          </div>
        </div>

        <div className="flex-1 p-4 text-sm">
          <ul className="flex flex-col items-center  w-full gap-y-4 mt-3 select-none">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.href}
                className={({ isActive }) =>
                  `${baseCss} ${isActive ? "bg-primary text-primary-foreground border-none" : "bg-transparent text-muted-foreground hover:text-foreground border-border/50"}`
                }
              >
                <span className="mr-1">{link.logo}</span>
                {link.Name}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="shrink-0 py-5 w-full bg-destructive/10 hover:bg-destructive/20 border-t border-border transition-all text-destructive font-bold">
          <button
            onClick={handleLogout}
            className="w-full h-full flex items-center justify-center gap-2"
          >
            <i className="ri-logout-box-r-line"></i>
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
