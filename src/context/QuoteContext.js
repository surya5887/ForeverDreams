'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const QuoteContext = createContext({
  isQuoteOpen: false,
  openQuote: () => {},
  closeQuote: () => {},
  prefilledProject: '',
});

export const QuoteProvider = ({ children }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [prefilledProject, setPrefilledProject] = useState('');

  useEffect(() => {
    const handlePopState = (event) => {
      if (isQuoteOpen) {
        setIsQuoteOpen(false);
        setTimeout(() => setPrefilledProject(''), 300);
        document.body.style.overflow = 'unset';
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isQuoteOpen]);

  const openQuote = useCallback((project = '') => {
    setPrefilledProject(project);
    setIsQuoteOpen(true);
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
    // Add state to history so mobile back button closes popup
    window.history.pushState({ quotePopupOpen: true }, '');
  }, []);

  const closeQuote = useCallback(() => {
    setIsQuoteOpen(false);
    setTimeout(() => {
      setPrefilledProject('');
    }, 300); // Clear after animation
    // Restore scrolling
    document.body.style.overflow = 'unset';
    // Pop the state if it was closed via UI instead of back button
    if (window.history.state && window.history.state.quotePopupOpen) {
      window.history.back();
    }
  }, []);

  return (
    <QuoteContext.Provider value={{ isQuoteOpen, openQuote, closeQuote, prefilledProject }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteContext = () => useContext(QuoteContext);
