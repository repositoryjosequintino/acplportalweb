export type NewsCategory = 'Notícia' | 'Comunicado Oficial' | 'Evento' | 'Campanha' | 'Edital';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  publishedAt: string;
  author: string;
  imageUrl: string;
  galleryUrls?: string[];
  tags: string[];
  featured: boolean;
}

export type VolunteerArea = 
  | 'Educação & Reforço Escolar'
  | 'Agroecologia & Horta Comunitária'
  | 'Oficinas Culturais & Música'
  | 'Assistência & Cidadania'
  | 'Esporte & Lazer'
  | 'Comunicação & Mídias Sociais'
  | 'Apoio Administrativo & Captação';

export type VolunteerStatus = 'Novo' | 'Em Análise' | 'Aprovado' | 'Contatado' | 'Inativo';

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate?: string;
  profession?: string;
  city: string;
  areasOfInterest: VolunteerArea[];
  availability: 'Finais de Semana' | 'Dias Úteis (Manhã)' | 'Dias Úteis (Tarde)' | 'Flexível';
  weeklyHours: number;
  experienceNotes: string;
  status: VolunteerStatus;
  submittedAt: string;
  notes?: string;
}

export type UserRole = 'Super Admin' | 'Gestor de Transparência' | 'Editor de Conteúdo';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: 'Criação' | 'Edição' | 'Exclusão' | 'Alteração de Status' | 'Publicação' | 'Exportação';
  entity: 'Projeto' | 'Notícia' | 'Instrumento' | 'Financeiro' | 'Documento' | 'Voluntário' | 'Configurações';
  entityId: string;
  entityTitle: string;
  details: string;
}

export interface SystemAlert {
  id: string;
  type: 'certidao_vencimento' | 'prestacao_pendente' | 'vigencia_instrumento' | 'novo_voluntario';
  severity: 'alta' | 'media' | 'informativa';
  title: string;
  message: string;
  dueDate?: string;
  link?: string;
  actionLabel?: string;
  read: boolean;
}
