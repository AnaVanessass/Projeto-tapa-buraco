const exportCSV = (potholesList) => {
  if (!potholesList || potholesList.length === 0) {
    alert("Nenhum dado disponível para exportar.");
    return;
  }

  // 1. Defina o cabeçalho das colunas do CSV
  const headers = ["ID", "Endereço", "Quadra", "Status", "Data de Criação"];

  // 2. Mapeie as linhas transformando os dados do objeto em texto formatado
  const rows = potholesList.map(chamado => [
    chamado.id,
    // O uso de replace limpa possíveis pontos e vírgulas do endereço inserido pelo usuário
    `"${chamado.address.replace(/"/g, '""')}"`, 
    `"${chamado.blockName.replace(/"/g, '""')}"`,
    chamado.status,
    new Date(chamado.createdAt).toLocaleDateString('pt-BR')
  ]);

  // 3. Junte tudo usando ponto e vírgula (;) e quebras de linha (\n)
  // Adicionamos '\uFEFF' no início (BOM - Byte Order Mark) para forçar o Excel a entender a acentuação (UTF-8)
  const csvContent = "\uFEFF" + [headers, ...rows]
    .map(e => e.join(";"))
    .join("\n");

  // 4. Cria o arquivo virtual em memória (Blob)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  // 5. Cria um link invisível na árvore do DOM para disparar o download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `relatorio-chamados-${new Date().toISOString().split('T')[0]}.csv`);
  
  document.body.appendChild(link);
  link.click(); // Dispara o clique nativo do navegador
  
  // Limpeza de memória do DOM
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default exportCSV;