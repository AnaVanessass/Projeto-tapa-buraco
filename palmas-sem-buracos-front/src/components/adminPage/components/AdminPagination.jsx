export function AdminPagination({ currentPage, totalPages, onPageChange }) {
  // Se houver apenas 1 página ou nenhuma, não precisa renderizar o rodapé
  if (totalPages <= 1) return null;

  return (
    <footer className="admin-pagination-box">
      <button 
        className="btn-page-arrow" 
        onClick={() => onPageChange(Math.max(0, currentPage - 1))} 
        disabled={currentPage === 0}
      >
        &larr;
      </button>
      
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`btn-page-number ${currentPage === pageNumber ? 'btn-page-number-active' : ''}`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button 
        className="btn-page-arrow" 
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))} 
        disabled={currentPage === totalPages - 1}
      >
        &rarr;
      </button>
    </footer>
  );
}
