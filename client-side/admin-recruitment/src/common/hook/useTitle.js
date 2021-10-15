import { useEffect } from "react";

export const useTitle = (title) => {
  title = `${title} | MST Company`;
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  });
};
