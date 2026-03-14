import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Aside = ({ width }) => {
  const { user } = useSelector((state) => state.auth);
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
  ];

  const baseCss =
    "min-h-10 w-52 py-2 flex items-center justify-center active:scale-105 scale-110 active:transition-all duration-50 font-semibold rounded-full border text-white hover:bg-zinc-600";

  return (
    <div className="h-screen flex">
      <aside
        className="relative bg-zinc-900 text-white flex flex-col items-center  w-full rounded-br-3xl rounded-tr-3xl overflow-hidden"
        style={{ width: `${width}px` }}
      >
        <div className="p-6 flex flex-col items-center gap-y-4 border-b border-zinc-800 w-full mb-4">
          <img
            src={user?.profileImg || "https://ik.imagekit.io/cd0pgs18s/default.jpg"}
            alt="User profile"
            className="w-40 h-40 object-cover rounded-full border-2 border-zinc-700 shadow-xl"
          />
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-xl font-bold text-white capitalize">
              {user?.username || "Guest"}
            </span>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${baseCss} ${isActive ? "bg-zinc-600 border-none" : "bg-transparent border-zinc-700"}`
              }
            >
              <i className="ri-user-settings-line mr-1 text-sm"></i>
              View Profile
            </NavLink>
          </div>
        </div>

        <div className="p-4 text-sm text-zinc-300">
          <ul className="flex flex-col items-center  w-full gap-y-4 mt-8 select-none">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.href}
                className={({ isActive }) =>
                  `${baseCss} ${isActive ? "bg-zinc-600 border-none" : "bg-transparent"}`
                }
              >
                <span className="mr-1">{link.logo}</span>
                {link.Name}
              </NavLink>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
