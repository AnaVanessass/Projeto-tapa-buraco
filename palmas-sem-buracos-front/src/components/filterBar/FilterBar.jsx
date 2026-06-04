import './FilterBar.css';

function FilterBar({ 
  selectedBlock, 
  onBlockChange, 
  cityBlocks = [], 
  activeStatuses = [], 
  onToggleStatus 
}) {
  return (
    <div className="filter-toolbar-box">
      
      <select 
        key="blocks"
        value={selectedBlock || ''} 
        onChange={(e) => onBlockChange(e.target.value || null)}
        className="select-city-block"
      >
        <option value="">Todas as quadras</option>
        {cityBlocks.map((block) => (
          <option key={block.idPlace} value={block.idPlace}>
            {block.name}
          </option>
        ))}
      </select>

      <div className="toggle-status-group">
        
        <button 
          type="button"
          onClick={() => onToggleStatus('OPEN')}
          className={`btn-status-toggle ${activeStatuses.includes('OPEN') ? 'btn-status-open-active' : ''}`}
        >
          🔴 Abertos
        </button>

        <button 
          type="button"
          onClick={() => onToggleStatus('PENDING')}
          className={`btn-status-toggle ${activeStatuses.includes('PENDING') ? 'btn-status-pending-active' : ''}`}
        >
          🟡 Em Análise
        </button>

        <button 
          type="button"
          onClick={() => onToggleStatus('FIXED')}
          className={`btn-status-toggle ${activeStatuses.includes('FIXED') ? 'btn-status-fixed-active' : ''}`}
        >
          🟢 Resolvidos
        </button>

      </div>
    </div>
  );
}

export default FilterBar;
