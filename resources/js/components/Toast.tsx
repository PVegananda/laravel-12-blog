import { useEffect, useState } from "react";

interface ToastProps {
  message: string | null;
  type?: "success" | "error" | null;
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`
        fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-medium
        transition-all duration-300 transform
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        ${
          type === "success"
            ? "bg-green-600"
            : type === "error"
            ? "bg-red-600"
            : "bg-gray-600"
        }
      `}
    >
      {message}
    </div>
  );
}
