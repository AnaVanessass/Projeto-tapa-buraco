import './FilterBar.css';

const FilterBar = ({ filterBlock, onFilterChange, onClearFilter, cityBlocks }) => {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-bar">
      <label htmlFor="block-filter">Filtrar Por Quadra:</label>
      <select
        id="block-filter"
        value={filterBlock}
        onChange={handleFilterChange}
        aria-label="Select city block to filter"
      >
        <option value="">Todas as Quadras</option>
        {cityBlocks.map(block => (
          <option key={block} value={block}>{block}</option>
        ))}
      </select>
      
      {filterBlock && (
        <button onClick={onClearFilter} aria-label="Clear filter">
          Limpar Filtro
        </button>
      )}
    </div>
  );
};

export default FilterBar;