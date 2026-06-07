export function AdminPagination({ currentPage, totalPages, onPageChange }) {
  // Se houver apenas 1 página ou nenhuma, não precisa renderizar o rodapé
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const maxVisible = 3;
    let start = Math.max(0, currentPage - 1);
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    // Ajusta o início se estivermos nas últimas páginas
    if (end - start + 1 < maxVisible) {
      start = Math.max(0, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <footer className="admin-pagination-box">
      <button 
        className="btn-page-arrow" 
        onClick={() => onPageChange(Math.max(0, currentPage - 1))} 
        disabled={currentPage === 0}
        aria-label="Página anterior"
      >
        &larr;
      </button>
      
      {/* DESKTOP/TABLET: Lista inteligente e resumida de números */}
      <div className="pagination-numbers-desktop">
        {/* Mostra indicador de reticências se a primeira página sumir */}
        {visiblePages[0] > 0 && (
          <button onClick={() => onPageChange(0)} className="btn-page-number">1..</button>
        )}

        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`btn-page-number ${currentPage === pageNumber ? 'btn-page-number-active' : ''}`}
          >
            {pageNumber + 1}
          </button>
        ))}

        {/* Mostra indicador de reticências se a última página sumir */}
        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
          <button onClick={() => onPageChange(totalPages - 1)} className="btn-page-number">..{totalPages}</button>
        )}
      </div>

      {/* MOBILE ONLY: Texto compacto no meio das setas para telas muito estreitas */}
      <span className="pagination-text-mobile">
        {currentPage + 1} de {totalPages}
      </span>

      <button 
        className="btn-page-arrow" 
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))} 
        disabled={currentPage === totalPages - 1 || totalPages === 0}
        aria-label="Próxima página"
      >
        &rarr;
      </button>
    </footer>
  );
}
