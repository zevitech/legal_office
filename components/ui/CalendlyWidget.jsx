import { useEffect } from "react";

function CalendlyWidget() {
  useEffect(() => {
    // Load the Calendly script after the component mounts
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-[400px] h-[550px] max-md:w-full"
      data-url="https://calendly.com/legaltrademarkoffice"
    ></div>
  );
}

export default CalendlyWidget;
