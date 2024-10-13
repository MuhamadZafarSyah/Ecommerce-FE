import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [focusSearch, setFocusSearch] = useState(true);

  if (focusSearch === false) {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  return (
    <SearchContext.Provider value={{ focusSearch, setFocusSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
