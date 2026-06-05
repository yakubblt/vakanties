
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('nl-NL', {
    day: '2-digit',      
    month: '2-digit',    
    year: 'numeric',     
  });
}
