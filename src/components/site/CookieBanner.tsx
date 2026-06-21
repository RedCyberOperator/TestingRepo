import { useEffect } from "react";

export function CookieBanner() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (document.getElementById("Cookiebot")) return;

    const script = document.createElement("script");
    script.id = "Cookiebot";
    script.src = "https://consent.cookiebot.com/uc.js";
    script.dataset.cbid = "2a0e6f04-7414-4294-9519-a046b986eda1";
    script.type = "text/javascript";
    script.async = true;

    document.head.appendChild(script);
  }, []);

  return null;
}
