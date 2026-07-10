'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const QuoteContext = createContext({
  isQuoteOpen: false,
  openQuote: () => {},
  closeQuote: () => {},
  prefilledProject: '',
});

export const QuoteProvider = ({ children }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [prefilledProject, setPrefilledProject] = useState('');

  const openQuote = useCallback((project = '') => {
    setPrefilledProject(project);
    setIsQuoteOpen(true);
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeQuote = useCallback(() => {
    setIsQuoteOpen(false);
    setTimeout(() => {
      setPrefilledProject('');
    }, 300); // Clear after animation
    // Restore scrolling
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <QuoteContext.Provider value={{ isQuoteOpen, openQuote, closeQuote, prefilledProject }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteContext = () => useContext(QuoteContext);
