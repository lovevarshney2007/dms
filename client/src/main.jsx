import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LogoLoader from "./components/common/LogoLoader";

const SPLASH_SEEN_KEY = "dms_splash_seen";

// eslint-disable-next-line react-refresh/only-export-components
function Boot() {
  const [showLoader, setShowLoader] = useState(
    () => typeof localStorage !== "undefined" && !localStorage.getItem(SPLASH_SEEN_KEY)
  );

  useEffect(() => {
    if (!showLoader) return;

    const timer = setTimeout(() => {
      localStorage.setItem(SPLASH_SEEN_KEY, "1");
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showLoader]);

  return (
    <>
      {showLoader ? <LogoLoader /> : null}
      <App />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Boot />
  </StrictMode>
);
