import React, { createContext, useState, type ReactNode } from 'react';

interface WorkspaceContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const WorkspaceContext = createContext<WorkspaceContextType>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <WorkspaceContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </WorkspaceContext.Provider>
  );
};