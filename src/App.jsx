import { useEffect, useState } from "react";
import { assets } from "./data/assets.js";
import { Footer, Header } from "./layouts/index.js";
import { ContactPage } from "./pages/ContactPage.jsx";
import { LivePage } from "./pages/LivePage.jsx";
import { MusicPage } from "./pages/MusicPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { ReservePage } from "./pages/ReservePage.jsx";
import { SnsPage } from "./pages/SnsPage.jsx";
import { TopPage } from "./pages/TopPage.jsx";
import { getCurrentPath } from "./utils/routing.js";

const navigationItems = [
  { label: "Top", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Music", href: "/music" },
  { label: "Live", href: "/live" },
  { label: "SNS", href: "/sns" },
  { label: "Contact", href: "/contact" },
];

const routes = {
  "/": TopPage,
  "/profile": ProfilePage,
  "/music": MusicPage,
  "/live": LivePage,
  "/reserve": ReservePage,
  "/sns": SnsPage,
  "/contact": ContactPage,
};

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPath);
  const Page = routes[pathname] || TopPage;

  useEffect(() => {
    const syncPath = () => setPathname(getCurrentPath());

    window.addEventListener("popstate", syncPath);
    window.addEventListener("hashchange", syncPath);
    return () => {
      window.removeEventListener("popstate", syncPath);
      window.removeEventListener("hashchange", syncPath);
    };
  }, []);

  return (
    <>
      <Header logoSrc={assets.logo} items={navigationItems} activePath={pathname} />
      <Page />
      <Footer logoSrc={assets.logo} items={navigationItems} activePath={pathname} />
    </>
  );
}
