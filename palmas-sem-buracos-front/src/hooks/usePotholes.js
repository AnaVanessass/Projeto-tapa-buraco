import { useState, useEffect, useCallback } from 'react';
import { loadPotholesFromStorage, savePotholesToStorage } from '../utils/storage.utils';

export const usePotholes = () => {
  const [potholes, setPotholes] = useState([]);
  const [filteredPotholes, setFilteredPotholes] = useState([]);
  const [filterBlock, setFilterBlock] = useState('');

  // Load potholes on mount
  useEffect(() => {
    setPotholes(loadPotholesFromStorage());
  }, []);

  // Save potholes when they change
  useEffect(() => {
    savePotholesToStorage(potholes);
  }, [potholes]);

  // Filter potholes by city block
  useEffect(() => {
    if (filterBlock) {
      const filtered = potholes.filter(
        pothole => pothole.cityBlock && 
        pothole.cityBlock.toLowerCase().includes(filterBlock.toLowerCase())
      );
      setFilteredPotholes(filtered);
    } else {
      setFilteredPotholes(potholes);
    }
  }, [filterBlock, potholes]);

  const addPothole = useCallback((potholeData) => {
    const newPothole = {
      id: Date.now().toString(),
      ...potholeData,
      date: new Date().toISOString(),
      images: []
    };
    setPotholes(prev => [...prev, newPothole]);
  }, []);

  const deletePothole = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this pothole?')) {
      setPotholes(prev => prev.filter(p => p.id !== id));
    }
  }, []);

  const updateFilter = useCallback((block) => {
    setFilterBlock(block);
  }, []);

  const clearFilter = useCallback(() => {
    setFilterBlock('');
  }, []);

  // Get unique city blocks
  const cityBlocks = [...new Set(potholes.map(p => p.cityBlock).filter(Boolean))];

  return {
    potholes: filteredPotholes,
    allPotholes: potholes,
    filterBlock,
    cityBlocks,
    addPothole,
    deletePothole,
    updateFilter,
    clearFilter
  };
};