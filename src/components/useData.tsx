import { useState } from "react";

export const useData = () => {
  const [activeTab, setActiveTab] = useState<Number>(0);

  return {
    activeTab,
    setActiveTab,
  };
};
