export interface InstitutionProfile {
  legalName: string; // ASSOCIAÇÃO COMUNITÁRIA DE PADRE LÚCIO
  tradeName: string; // INSTITUTO RAÍZES DA COMUNIDADE
  cnpj: string; // Demonstrativo editável
  foundedYear: number;
  presidentName: string;
  vicePresidentName: string;
  headquartersAddress: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    reference: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    instagram: string;
    instagramUrl: string;
    openingHours: string;
  };
  donationInfo: {
    pixKey: string;
    pixKeyType: string;
    pixReceiver: string;
    bankName: string;
    bankAgency: string;
    bankAccount: string;
    accountType: string;
  };
  presidencyMessage: {
    quote: string;
    fullMessage: string;
    presidentTitle: string;
    date: string;
  };
}

export interface SocialIndicator {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: string;
  description: string;
  trend?: string;
  lastUpdated: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  category: 'Diretoria Executiva' | 'Conselho Fiscal' | 'Coordenação Operacional';
  termPeriod: string;
  bio: string;
  photoUrl?: string;
}

export interface InstitutionalPartner {
  id: string;
  name: string;
  category: 'Poder Público' | 'Sociedade Civil' | 'Iniciativa Privada' | 'Academia';
  description: string;
  logoUrl?: string;
  website?: string;
}
