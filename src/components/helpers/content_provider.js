import React, { createContext, useEffect, useState } from 'react';

export const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    fetchContentData();
  }, []);

  const fetchContentData = async () => {
    try {
      const response = await fetch('https://honesteditz-back.herokuapp.com/get/content')
      const data = await response.json();
      setContentData(data);
    } catch (error) {
      console.error('Error fetching content data:', error);
    }
  };

  return (
    <ContentContext.Provider value={contentData}>
      {children}
    </ContentContext.Provider>
  )
}