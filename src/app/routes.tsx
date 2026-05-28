import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./components/Dashboard";
import { Alerts } from "./components/Alerts";
import { Timeline } from "./components/Timeline";
import { Settings } from "./components/Settings";
import { SSLSettings } from "./components/SSLSettings";
import { Reports } from "./components/Reports";
import { DomainReport } from "./components/DomainReport";
import { DomainsList } from "./components/DomainsList";
import { DomainDetail } from "./components/DomainDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "domains", Component: DomainsList },
      { path: "domains/:domainId", Component: DomainDetail },
      { path: "alerts", Component: Alerts },
      { path: "timeline", Component: Timeline },
      { path: "settings", Component: Settings },
      { path: "settings/ssl", Component: SSLSettings },
      { path: "reports", Component: Reports },
      { path: "reports/:domainId", Component: DomainReport },
    ],
  },
]);
