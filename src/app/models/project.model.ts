export type ProjectCategory = 
  | 'Educação'
  | 'Agroecologia & Meio Ambiente'
  | 'Cultura & Memória'
  | 'Inclusão Social & Esporte'
  | 'Desenvolvimento Comunitário';

export type ProjectStatus = 'Em Execução' | 'Concluído' | 'Planejado';

export interface ProjectResultMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  targetPublic: string;
  beneficiariesCount: number;
  period: string; // Ex: '2025 - 2026'
  startDate: string;
  endDate?: string;
  partners: string[];
  results: string[];
  metrics: ProjectResultMetric[];
  imageUrl: string;
  galleryUrls?: string[];
  budget?: number;
  featured: boolean;
}
