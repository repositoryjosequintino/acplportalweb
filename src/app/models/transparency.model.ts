export type InstrumentStatus = 
  | 'Vigente'
  | 'Em Prestação de Contas'
  | 'Concluído e Aprovado'
  | 'Em Análise';

export type InstrumentType = 
  | 'Termo de Fomento'
  | 'Termo de Colaboração'
  | 'Acordo de Cooperação'
  | 'Emenda Parlamentar'
  | 'Convênio Municipal/Estadual';

export interface PublicInstrument {
  id: string;
  number: string; // Ex: 'TF 004/2025'
  grantingBody: string; // Órgão concedente (Ex: Secretaria de Desenvolvimento Social)
  type: InstrumentType;
  object: string; // Objeto da parceria
  totalValue: number; // Valor global repassado
  executedValue: number; // Valor executado até o momento
  counterpartValue?: number; // Contrapartida (se houver)
  startDate: string;
  endDate: string;
  status: InstrumentStatus;
  processNumber: string; // Processo SEI / Administrativo
  responsibleManager: string;
  relatedDocuments: {
    title: string;
    type: string;
    url: string;
    date: string;
    size: string;
  }[];
  workPlanSummary: string;
  demonstrativeNotice?: string;
}

export type FinancialRecordType = 'Receita' | 'Despesa';

export interface FinancialRecord {
  id: string;
  date: string;
  type: FinancialRecordType;
  category: 
    | 'Recurso Próprio'
    | 'Repasse Público'
    | 'Doação Privada'
    | 'Material de Consumo'
    | 'Serviços de Terceiros - PF'
    | 'Serviços de Terceiros - PJ'
    | 'Equipamentos e Materiais Permanentes'
    | 'Custos Operacionais';
  description: string;
  instrumentId?: string;
  instrumentNumber?: string;
  vendorOrFunder: string; // Nome do fornecedor ou concedente
  vendorCnpjOrCpf?: string;
  amount: number;
  paymentMethod: 'PIX' | 'Transferência Bancária (TED/DOC)' | 'Ordem Bancária' | 'Boleto';
  invoiceOrReceiptNumber?: string;
  status: 'Liquidado' | 'Conciliado' | 'Em Análise';
  documentUrl?: string;
}

export type DocumentCategory = 
  | 'Institucional'
  | 'Governança & Atas'
  | 'Certidões & Regularidade'
  | 'Convênios & Parcerias'
  | 'Planos de Trabalho'
  | 'Demonstrações Contábeis & Balanços'
  | 'Relatórios de Gestão & Execução'
  | 'Prestações de Contas'
  | 'Pareceres & Auditorias';

export interface TransparencyDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  year: number;
  uploadDate: string;
  expirationDate?: string; // Para certidões e mandatos
  fileSize: string;
  fileType: 'PDF' | 'XLSX' | 'DOCX';
  fileUrl: string;
  description?: string;
  status: 'Vigente' | 'A Vencer' | 'Vencido' | 'Histórico';
  hashSha256?: string; // Código de integridade
}

export interface TransparencyFilterState {
  searchTerm: string;
  category: string;
  year: string;
  status: string;
}
