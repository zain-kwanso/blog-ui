import { useState, useEffect } from "react";

const useError = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 2500);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return [error, setError];
};

export { useError };
