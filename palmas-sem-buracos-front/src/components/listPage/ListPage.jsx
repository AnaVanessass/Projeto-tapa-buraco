import { useState, useEffect, useRef } from 'react';
import List from './components/list/PotholeList';
import FilterBar from '../filterBar/FilterBar';
import { useSearchAddress, useInfinitePotholes } from '../../hooks/usePotholes';
import { useCityBlocks} from '../../hooks/useCityBlocks';
import './ListPage.css';
import { normalizePothole } from '../../utils/normalizePothole';
import getCloudinaryUrl from '../../utils/cloudinaryImg';
import PotholeDetailsModal from './components/PotholeListModal';

function ListPage() {
  const { data: blocks = [], isPending: isBlocksPending } = useCityBlocks();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [activeStatuses, setActiveStatuses] = useState(['OPEN', 'PENDING', 'FIXED']);
  const [selectedPothole, setSelectedPothole] = useState(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePotholes();
  
  const list2 =
    data?.pages
      .flatMap(page => page.content)
      .map(normalizePothole) ?? [];

      
  const handleToggleStatus = (status)  => {
    setActiveStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const filteredPotholes = list2.filter((pothole) => {
    const matchesBlock = !selectedBlock || pothole.blockIdPlace === selectedBlock;
    const matchesStatus = activeStatuses.includes(pothole.status);

    return matchesBlock && matchesStatus;
  });

  useEffect(() => {
    if (errorAlertMessage) {
      const timer = setTimeout(() => setErrorAlertMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorAlertMessage]);

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => setShowSuccessAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert])

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
      }
    );

    const node = loadMoreRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
      <main className="map-content-box">
        
        <div className="filter-wrapper-card">
          <FilterBar 
            selectedBlock={selectedBlock}
            onBlockChange={setSelectedBlock}
            cityBlocks={blocks}
            activeStatuses={activeStatuses}
            onToggleStatus={handleToggleStatus}
          />
        </div>

        <div className="live-map-frame">
          {showSuccessAlert && (
            <div className="alert-success-toast">
              ✅ Denúncia registrada com sucesso em Palmas!
            </div>
          )}
          {errorAlertMessage && (
            <div className="alert-error-toast">
              {errorAlertMessage}
            </div>
          )}
          <div className="list-container">
            <List 
            potholes={filteredPotholes || []}
            onSelected={setSelectedPothole}
            />
          </div>
          {selectedPothole && (
            <PotholeDetailsModal
            selectedPothole={selectedPothole}
            setSelectedPothole={setSelectedPothole}
            />
          )}
          <div ref={loadMoreRef} />
        </div>
      </main>
  );
}

export default ListPage;
