import { Injectable, signal, computed } from '@angular/core';
import { InstitutionProfile, SocialIndicator, BoardMember, InstitutionalPartner } from '../models/institution.model';
import { Project } from '../models/project.model';
import { PublicInstrument, FinancialRecord, TransparencyDocument } from '../models/transparency.model';
import { NewsItem, VolunteerApplication, AuditLog, SystemAlert, UserRole, UserSession } from '../models/additional.model';

const DEMO_NOTICE = 'Dado demonstrativo para fins de homologação e transparência institucional. Editável via Painel Administrativo.';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Institutional Profile
  readonly institution = signal<InstitutionProfile>({
    legalName: 'ASSOCIAÇÃO COMUNITÁRIA DE PADRE LÚCIO',
    tradeName: 'INSTITUTO RAÍZES DA COMUNIDADE',
    cnpj: '00.000.000/0001-00 (Demonstrativo)',
    foundedYear: 2018,
    presidentName: 'Liderança Comunitária de Padre Lúcio',
    vicePresidentName: 'Coordenação Social Integrada',
    headquartersAddress: {
      street: 'Área Comunitária Central, s/n',
      neighborhood: 'Povoado de Padre Lúcio',
      city: 'Águas Lindas / Padre Lúcio',
      state: 'GO',
      zipCode: '72910-000',
      reference: 'Próximo à Praça Comunitária e Escola Municipal'
    },
    contact: {
      phone: '(61) 98765-4321',
      whatsapp: '5561987654321',
      email: 'contato@institutoraizes.org.br',
      instagram: '@instituto229',
      instagramUrl: 'https://www.instagram.com/instituto229/',
      openingHours: 'Segunda a Sexta: 08h às 18h | Sábados: 08h às 12h'
    },
    donationInfo: {
      pixKey: 'pix@institutoraizes.org.br',
      pixKeyType: 'Chave E-mail (Demonstrativa)',
      pixReceiver: 'Associação Comunitária de Padre Lúcio',
      bankName: 'Banco do Brasil (001)',
      bankAgency: '1234-5',
      bankAccount: '10987-6',
      accountType: 'Conta Corrente Pessoa Jurídica'
    },
    presidencyMessage: {
      quote: 'A verdadeira transformação nasce quando uma comunidade se une para cultivar suas próprias raízes, acolher suas famílias e construir oportunidades com transparência e dignidade.',
      fullMessage: 'O Instituto Raízes da Comunidade (Associação Comunitária de Padre Lúcio) nasceu do compromisso inegociável de servir às famílias da nossa região. Trabalhamos dia após dia na promoção da educação, da soberania alimentar através da agroecologia, da cultura popular e da inclusão social. Mais do que executar projetos, prestamos contas de cada recurso recebido com rigor ético e integridade, honrando a confiança da nossa gente e dos órgãos parceiros.',
      presidentTitle: 'Presidência Institucional',
      date: 'Novembro de 2026'
    }
  });

  // Social Indicators
  readonly indicators = signal<SocialIndicator[]>([
    {
      id: 'ind-1',
      label: 'Famílias Apoiadas',
      value: 480,
      unit: '+',
      icon: 'groups',
      description: 'Famílias cadastradas e acompanhadas em programas comunitários.',
      trend: '+15% no último ano',
      lastUpdated: '01/11/2026'
    },
    {
      id: 'ind-2',
      label: 'Crianças e Jovens Atendidos',
      value: 290,
      unit: '+',
      icon: 'school',
      description: 'Participantes em oficinas de reforço escolar, música e artes.',
      trend: 'Capacidade ampliada',
      lastUpdated: '28/10/2026'
    },
    {
      id: 'ind-3',
      label: 'Hortas & Mudas Plantadas',
      value: 1250,
      unit: 'un.',
      icon: 'eco',
      description: 'Mudas agroecológicas cultivadas no viveiro comunitário.',
      trend: 'Produção contínua',
      lastUpdated: '05/11/2026'
    },
    {
      id: 'ind-4',
      label: 'Oficinas & Encontros Realizados',
      value: 164,
      unit: 'atividades',
      icon: 'event_available',
      description: 'Ações de capacitação, rodas de conversa e oficinas culturais.',
      trend: 'Agenda regular',
      lastUpdated: '02/11/2026'
    }
  ]);

  // Board Members
  readonly boardMembers = signal<BoardMember[]>([
    {
      id: 'bm-1',
      name: 'Representação da Presidência',
      role: 'Presidente Institucional',
      category: 'Diretoria Executiva',
      termPeriod: '2024 - 2027',
      bio: 'Liderança comunitária atuante no desenvolvimento social e fortalecimento comunitário de Padre Lúcio.'
    },
    {
      id: 'bm-2',
      name: 'Coordenação Administrativo-Financeira',
      role: 'Diretoria Financeira & MROSC',
      category: 'Diretoria Executiva',
      termPeriod: '2024 - 2027',
      bio: 'Responsável pela prestação de contas, controle contábil e conformidade com a Lei 13.019/2014.'
    },
    {
      id: 'bm-3',
      name: 'Coordenação de Projetos & Ações Sociais',
      role: 'Secretaria Geral de Projetos',
      category: 'Diretoria Executiva',
      termPeriod: '2024 - 2027',
      bio: 'Gestão das oficinas comunitárias, horta coletiva e articulação com voluntários e famílias.'
    },
    {
      id: 'bm-4',
      name: 'Membro Titular do Conselho Fiscal',
      role: 'Presidente do Conselho Fiscal',
      category: 'Conselho Fiscal',
      termPeriod: '2024 - 2027',
      bio: 'Acompanhamento e emissão de pareceres sobre balancetes, extratos e relatórios de execução.'
    },
    {
      id: 'bm-5',
      name: 'Conselheiro Fiscal Efetivo',
      role: 'Conselheiro Fiscal',
      category: 'Conselho Fiscal',
      termPeriod: '2024 - 2027',
      bio: 'Fiscalização contábil independente eleita em assembleia geral comunitária.'
    },
    {
      id: 'bm-6',
      name: 'Conselheiro Fiscal Efetivo II',
      role: 'Conselheiro Fiscal',
      category: 'Conselho Fiscal',
      termPeriod: '2024 - 2027',
      bio: 'Auditoria participativa das atividades comunitárias e cumprimento das diretrizes estatutárias.'
    }
  ]);

  // Institutional Partners
  readonly partners = signal<InstitutionalPartner[]>([
    {
      id: 'p-1',
      name: 'Rede Local de Solidariedade Comunitária',
      category: 'Sociedade Civil',
      description: 'Articulação comunitária para apoio a famílias vulneráveis e segurança alimentar.'
    },
    {
      id: 'p-2',
      name: 'Programa Municipal de Fortalecimento do Terceiro Setor',
      category: 'Poder Público',
      description: 'Parceria institucional em conformidade com o Marco Regulatório (Lei 13.019/2014).'
    },
    {
      id: 'p-3',
      name: 'Iniciativa Produtores Rurais & Agroecologia Sustentável',
      category: 'Iniciativa Privada',
      description: 'Apoio técnico para compostagem, mudas nativas e fomento à produção local.'
    },
    {
      id: 'p-4',
      name: 'Núcleo de Extensão Universitária Comunitária',
      category: 'Academia',
      description: 'Oficinas pedagógicas, reforço escolar e orientação jurídica comunitária.'
    }
  ]);

  // Projects
  readonly projects = signal<Project[]>([
    {
      id: 'proj-1',
      slug: 'sementes-do-saber',
      title: 'Projeto Sementes do Saber: Reforço Escolar e Leitura',
      category: 'Educação',
      status: 'Em Execução',
      shortDescription: 'Oficinas continuadas de alfabetização, reforço em matemática e incentivo à leitura para crianças e adolescentes em Padre Lúcio.',
      fullDescription: 'O Projeto Sementes do Saber atende estudantes matriculados na rede pública de ensino do entorno de Padre Lúcio no contraturno escolar. O programa desenvolve círculos de leitura, oficinas lúdicas de ciências e apoio pedagógico individualizado, garantindo acompanhamento escolar, lanche nutritivo diário e redução da evasão escolar.',
      objectives: [
        'Apoiar 120 crianças e adolescentes no contraturno escolar com reforço pedagógico.',
        'Desenvolver acervo circulante com mais de 350 títulos infantojuvenis.',
        'Promover 4 oficinas trimestrais de orientação familiar e apoio socioemocional.'
      ],
      targetPublic: 'Crianças e adolescentes de 6 a 15 anos de famílias de baixa renda.',
      beneficiariesCount: 120,
      period: '2025 - 2026',
      startDate: '10/02/2025',
      endDate: '20/12/2026',
      partners: ['Escola Municipal Local', 'Voluntários da Pedagogia', 'Rede Social Comunitária'],
      results: [
        '88% dos alunos apresentaram melhora comprovada no boletim escolar.',
        'Mais de 900 empréstimos de livros realizados na biblioteca comunitária.',
        '100% de frequência nas oficinas semanais com alimentação balanceada garantida.'
      ],
      metrics: [
        { label: 'Estudantes Atendidos', value: '120 alunos' },
        { label: 'Horas de Reforço', value: '380 horas' },
        { label: 'Livros no Acervo', value: '410 exemplares' }
      ],
      imageUrl: '/assets/images/project_education_kids_1794165964654.jpg',
      featured: true,
      budget: 45000
    },
    {
      id: 'proj-2',
      slug: 'raizes-agroecologicas',
      title: 'Horta Comunitária & Raízes Agroecológicas',
      category: 'Agroecologia & Meio Ambiente',
      status: 'Em Execução',
      shortDescription: 'Cultivo agroecológico sem agrotóxicos, viveiro de mudas nativas do Cerrado e capacitação em compostagem orgânica.',
      fullDescription: 'Iniciativa voltada à soberania alimentar e geração de renda familiar. Em uma área coletiva cedida, as famílias participam do plantio de hortaliças, raízes, legumes e ervas medicinais, abastecendo cozinhas comunitárias locais e comercializando o excedente na feira solidária semanal de Padre Lúcio.',
      objectives: [
        'Produzir alimentos saudáveis e sem veneno para 75 famílias participantes.',
        'Preservar nascentes locais através do plantio de mudas de árvores do Cerrado.',
        'Capacitar moradores em técnicas de adubação orgânica, biofertilizantes e irrigação eficiente.'
      ],
      targetPublic: 'Famílias agricultoras, mães chefes de família e jovens da zona rural.',
      beneficiariesCount: 180,
      period: '2024 - 2026',
      startDate: '05/03/2024',
      endDate: '31/12/2026',
      partners: ['Produtores Rurais Parceiros', 'Comissão Ambiental Comunitária'],
      results: [
        'Mais de 3,2 toneladas de alimentos orgânicos colhidos e distribuídos.',
        '1.250 mudas nativas cultivadas no viveiro da associação.',
        '24 oficinas práticas de agroecologia e bioconstrução ministradas.'
      ],
      metrics: [
        { label: 'Alimentos Colhidos', value: '3,2 ton' },
        { label: 'Mudas no Viveiro', value: '1.250 mudas' },
        { label: 'Famílias Produtoras', value: '75 núcleos' }
      ],
      imageUrl: '/assets/images/project_agroecology_garden_1794165966364.jpg',
      featured: true,
      budget: 62000
    },
    {
      id: 'proj-3',
      slug: 'sons-e-tradicoes-de-padre-lucio',
      title: 'Projeto Sons & Tradições: Cultura e Memória Viva',
      category: 'Cultura & Memória',
      status: 'Em Execução',
      shortDescription: 'Oficinas de violão popular, percussão, resgate da memória oral dos pioneiros de Padre Lúcio e eventos comunitários.',
      fullDescription: 'A cultura como ferramenta de pertencimento, autoestima e inclusão para a juventude. O projeto oferece formação musical básica e registro das narrativas dos moradores mais antigos de Padre Lúcio, culminando em mostras culturais abertas a toda a comunidade e gravação de episódios de rádio comunitária.',
      objectives: [
        'Oferecer aulas semanais de violão e ritmo para 45 jovens da região.',
        'Registrar 12 relatos históricos em áudio e vídeo de anciãos pioneiros de Padre Lúcio.',
        'Realizar o Encontro Cultural Comunitário anual aberto ao público.'
      ],
      targetPublic: 'Adolescentes, jovens e anciãos guardiões da memória comunitária.',
      beneficiariesCount: 95,
      period: '2025 - 2026',
      startDate: '15/04/2025',
      endDate: '15/11/2026',
      partners: ['Ponto de Cultura Regional', 'Músicos Voluntários'],
      results: [
        '45 jovens matriculados com instrumentos disponibilizados pelo instituto.',
        '6 episódios do documentário oral "Vozes de Padre Lúcio" produzidos.',
        '1 festival de música comunitária realizado com presença de 300 moradores.'
      ],
      metrics: [
        { label: 'Alunos de Música', value: '45 jovens' },
        { label: 'Memórias Gravadas', value: '12 relatos' },
        { label: 'Apresentações', value: '8 eventos' }
      ],
      imageUrl: '/assets/images/project_culture_music_1794165966001.jpg',
      featured: true,
      budget: 28000
    },
    {
      id: 'proj-4',
      slug: 'acolher-cidadania',
      title: 'Núcleo Acolher: Cidadania, Documentação & Apoio Social',
      category: 'Inclusão Social & Esporte',
      status: 'Em Execução',
      shortDescription: 'Mutirões comunitários para emissão de certidões, orientação sobre benefícios sociais (CadÚnico) e acolhimento socioassistencial.',
      fullDescription: 'Garantia de acesso aos direitos fundamentais para moradores de Padre Lúcio e áreas rurais adjacentes. O Núcleo Acolher oferece suporte para regularização de documentos, encaminhamentos à rede de assistência social e apoio emergencial.',
      objectives: [
        'Atender 200 moradores com orientações sobre direitos e programas sociais.',
        'Promover 2 mutirões anuais com emissão gratuita de documentação civil.',
        'Distribuir kits de higiene e apoio emergencial a famílias em extrema vulnerabilidade.'
      ],
      targetPublic: 'Famílias em situação de vulnerabilidade, idosos e pessoas com deficiência.',
      beneficiariesCount: 210,
      period: '2024 - 2026',
      startDate: '01/08/2024',
      endDate: '31/12/2026',
      partners: ['Centro de Referência de Assistência Social', 'Faculdade de Direito Parceira'],
      results: [
        '340 atendimentos individuais realizados com suporte técnico.',
        '85 carteiras de identidade e certidões regularizadas.',
        'Apoio emergencial contínuo com transparência total de doações.'
      ],
      metrics: [
        { label: 'Atendimentos', value: '340 pessoas' },
        { label: 'Documentos Emitidos', value: '85 certidões' },
        { label: 'Mutirões', value: '4 edições' }
      ],
      imageUrl: '/assets/images/hero_community_roots_1794165964918.jpg',
      featured: false,
      budget: 35000
    }
  ]);

  // Public Instruments (Convênios e Parcerias MROSC Lei 13.019/2014)
  readonly instruments = signal<PublicInstrument[]>([
    {
      id: 'inst-1',
      number: 'TF nº 003/2025 - MROSC',
      grantingBody: 'Secretaria Municipal de Desenvolvimento Social e Cidadania',
      type: 'Termo de Fomento',
      object: 'Execução do Projeto Sementes do Saber: Apoio pedagógico, reforço escolar e segurança alimentar para crianças e adolescentes em Padre Lúcio.',
      totalValue: 75000.00,
      executedValue: 52400.00,
      counterpartValue: 5000.00,
      startDate: '10/02/2025',
      endDate: '20/12/2026',
      status: 'Vigente',
      processNumber: 'SEI 00120.003456/2025-11 (Demonstrativo)',
      responsibleManager: 'Gestor da Parceria / Conselho Municipal',
      workPlanSummary: 'Plano de Trabalho aprovado compreendendo 3 metas: 1) Capacitação pedagógica; 2) Fornecimento de lanches saudáveis; 3) Aquisição de material didático.',
      demonstrativeNotice: DEMO_NOTICE,
      relatedDocuments: [
        { title: 'Termo de Fomento 003/2025 na Íntegra', type: 'PDF', url: '#', date: '10/02/2025', size: '1.8 MB' },
        { title: 'Plano de Trabalho Detalhado e Aprovado', type: 'PDF', url: '#', date: '05/02/2025', size: '2.4 MB' },
        { title: 'Relatório Parcial de Cumprimento do Objeto (1º Semestre)', type: 'PDF', url: '#', date: '15/07/2025', size: '3.1 MB' }
      ]
    },
    {
      id: 'inst-2',
      number: 'TC nº 007/2024 - MROSC',
      grantingBody: 'Secretaria de Meio Ambiente e Agricultura Sustentável',
      type: 'Termo de Colaboração',
      object: 'Implantação do Viveiro Comunitário de Mudas Nativas e Horta Agroecológica de Padre Lúcio, promovendo segurança alimentar e preservação hídrica.',
      totalValue: 60000.00,
      executedValue: 60000.00,
      counterpartValue: 0,
      startDate: '01/04/2024',
      endDate: '31/03/2025',
      status: 'Concluído e Aprovado',
      processNumber: 'SEI 00115.008920/2024-42 (Demonstrativo)',
      responsibleManager: 'Comissão Especial de Monitoramento e Avaliação',
      workPlanSummary: 'Objeto executado integralmente com plantio de 1.250 mudas e estrutura de irrigação por gotejamento instalada na horta comunitária.',
      demonstrativeNotice: DEMO_NOTICE,
      relatedDocuments: [
        { title: 'Termo de Colaboração 007/2024 Assinado', type: 'PDF', url: '#', date: '01/04/2024', size: '1.5 MB' },
        { title: 'Relatório Final de Execução do Objeto', type: 'PDF', url: '#', date: '20/04/2025', size: '4.2 MB' },
        { title: 'Parecer Técnico de Aprovação da Prestação de Contas', type: 'PDF', url: '#', date: '15/06/2025', size: '890 KB' }
      ]
    },
    {
      id: 'inst-3',
      number: 'EP nº 2025/089 - Emenda Parlamentar',
      grantingBody: 'Fundo Municipal dos Direitos da Criança e do Adolescente (FMDCA)',
      type: 'Emenda Parlamentar',
      object: 'Aquisição de equipamentos de informática e instrumentos musicais para a sede do Instituto Raízes da Comunidade em Padre Lúcio.',
      totalValue: 38000.00,
      executedValue: 37850.00,
      startDate: '01/06/2025',
      endDate: '30/11/2026',
      status: 'Em Prestação de Contas',
      processNumber: 'ADM 2025/FMDCA-044 (Demonstrativo)',
      responsibleManager: 'Conselho Municipal dos Direitos da Criança e do Adolescente',
      workPlanSummary: 'Equipamentos adquiridos mediante cotação prévia de preços de acordo com o art. 42 da Lei 13.019/2014. Fase final de envio dos comprovantes.',
      demonstrativeNotice: DEMO_NOTICE,
      relatedDocuments: [
        { title: 'Nota de Empenho e Termo de Concessão', type: 'PDF', url: '#', date: '01/06/2025', size: '1.2 MB' },
        { title: 'Dossiê de Cotações Prévias de Preços (3 Fornecedores)', type: 'PDF', url: '#', date: '15/08/2025', size: '2.8 MB' },
        { title: 'Minuta da Prestação de Contas Final', type: 'PDF', url: '#', date: '01/11/2026', size: '1.9 MB' }
      ]
    }
  ]);

  // Financial Records (Demonstrativos de Receitas e Despesas com filtros de fornecedor, categoria, ano)
  readonly financialRecords = signal<FinancialRecord[]>([
    {
      id: 'fin-01',
      date: '02/11/2026',
      type: 'Receita',
      category: 'Doação Privada',
      description: 'Doações voluntárias via PIX recebidas no mês de Outubro/Novembro',
      vendorOrFunder: 'Comunidade & Doadores Pessoa Física',
      amount: 4250.00,
      paymentMethod: 'PIX',
      status: 'Conciliado'
    },
    {
      id: 'fin-02',
      date: '25/10/2026',
      type: 'Despesa',
      category: 'Material de Consumo',
      description: 'Aquisição de alimentos frescos e lanches para oficinas infantis',
      instrumentId: 'inst-1',
      instrumentNumber: 'TF nº 003/2025',
      vendorOrFunder: 'Hortifrúti e Mercearia Padre Lúcio Ltda (Demonstrativo)',
      vendorCnpjOrCpf: '12.345.678/0001-99',
      amount: 2150.00,
      paymentMethod: 'Transferência Bancária (TED/DOC)',
      invoiceOrReceiptNumber: 'NF-e 001.458',
      status: 'Liquidado'
    },
    {
      id: 'fin-03',
      date: '18/10/2026',
      type: 'Despesa',
      category: 'Serviços de Terceiros - PF',
      description: 'Pagamento de honorários de oficineira de música e violão (Outubro)',
      instrumentId: 'inst-1',
      instrumentNumber: 'TF nº 003/2025',
      vendorOrFunder: 'Educadora Musical Popular / RPA',
      vendorCnpjOrCpf: '000.***.***-00',
      amount: 1800.00,
      paymentMethod: 'Transferência Bancária (TED/DOC)',
      invoiceOrReceiptNumber: 'RPA 2026/10',
      status: 'Liquidado'
    },
    {
      id: 'fin-04',
      date: '10/10/2026',
      type: 'Receita',
      category: 'Repasse Público',
      description: '2ª Parcela do Termo de Fomento nº 003/2025 - Secretaria de Desenvolvimento Social',
      instrumentId: 'inst-1',
      instrumentNumber: 'TF nº 003/2025',
      vendorOrFunder: 'Prefeitura Municipal / Secretaria de Desenvolvimento Social',
      vendorCnpjOrCpf: '00.111.222/0001-33',
      amount: 25000.00,
      paymentMethod: 'Ordem Bancária',
      status: 'Conciliado'
    },
    {
      id: 'fin-05',
      date: '28/09/2026',
      type: 'Despesa',
      category: 'Equipamentos e Materiais Permanentes',
      description: 'Aquisição de 4 computadores recondicionados para laboratório pedagógico',
      instrumentId: 'inst-3',
      instrumentNumber: 'EP nº 2025/089',
      vendorOrFunder: 'Tecnologia & Inclusão Comercial Eireli (Demonstrativo)',
      vendorCnpjOrCpf: '45.678.901/0001-22',
      amount: 7200.00,
      paymentMethod: 'Transferência Bancária (TED/DOC)',
      invoiceOrReceiptNumber: 'NF-e 003.892',
      status: 'Liquidado'
    },
    {
      id: 'fin-06',
      date: '15/09/2026',
      type: 'Despesa',
      category: 'Material de Consumo',
      description: 'Substrato orgânico, sementes e ferramentas manuais para a Horta',
      instrumentId: 'inst-2',
      instrumentNumber: 'TC nº 007/2024',
      vendorOrFunder: 'Agropecuária & Sementes Cerrado Ltda (Demonstrativo)',
      vendorCnpjOrCpf: '98.765.432/0001-11',
      amount: 3410.00,
      paymentMethod: 'PIX',
      invoiceOrReceiptNumber: 'NF-e 008.109',
      status: 'Liquidado'
    },
    {
      id: 'fin-07',
      date: '01/09/2026',
      type: 'Despesa',
      category: 'Custos Operacionais',
      description: 'Taxa de conectividade e internet para a sede comunitária',
      vendorOrFunder: 'Provedor Telecom Padre Lúcio (Demonstrativo)',
      amount: 179.90,
      paymentMethod: 'Boleto',
      status: 'Liquidado'
    }
  ]);

  // Transparency Documents Library
  readonly documents = signal<TransparencyDocument[]>([
    {
      id: 'doc-1',
      title: 'Estatuto Social Consolidado da Associação Comunitária',
      category: 'Institucional',
      year: 2024,
      uploadDate: '15/01/2024',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Estatuto social registrado em cartório contendo as finalidades não lucrativas, governança e regras estatutárias.',
      status: 'Vigente',
      hashSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    },
    {
      id: 'doc-2',
      title: 'Ata de Eleição e Posse da Diretoria e Conselho Fiscal (2024-2027)',
      category: 'Governança & Atas',
      year: 2024,
      uploadDate: '20/01/2024',
      expirationDate: '20/01/2027',
      fileSize: '1.4 MB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Ata da Assembleia Geral Ordinária de eleição dos dirigentes com registro civil.',
      status: 'Vigente',
      hashSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
    },
    {
      id: 'doc-3',
      title: 'Cartão CNPJ e Comprovante de Inscrição e Situação Cadastral',
      category: 'Certidões & Regularidade',
      year: 2026,
      uploadDate: '01/10/2026',
      expirationDate: '01/10/2027',
      fileSize: '450 KB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Comprovante emitido pela Receita Federal atestando situação ATIVA.',
      status: 'Vigente',
      hashSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
    },
    {
      id: 'doc-4',
      title: 'Certidão Negativa de Débitos Relativos a Créditos Tributários Federais (CND)',
      category: 'Certidões & Regularidade',
      year: 2026,
      uploadDate: '15/09/2026',
      expirationDate: '15/03/2027',
      fileSize: '320 KB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Certidão Conjunta Negativa da Receita Federal e PGFN.',
      status: 'Vigente',
      hashSha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
    },
    {
      id: 'doc-5',
      title: 'Certidão de Regularidade do FGTS (CRF Caixa)',
      category: 'Certidões & Regularidade',
      year: 2026,
      uploadDate: '01/11/2026',
      expirationDate: '30/11/2026',
      fileSize: '280 KB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Certificado de Regularidade do FGTS válido por 30 dias.',
      status: 'A Vencer',
      hashSha256: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
    },
    {
      id: 'doc-6',
      title: 'Balanço Patrimonial e Demonstrações Contábeis - Exercício 2025',
      category: 'Demonstrações Contábeis & Balanços',
      year: 2025,
      uploadDate: '30/04/2026',
      fileSize: '3.8 MB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Balanço patrimonial, DRE, demonstração de mutações do patrimônio e notas explicativas assinadas por contador habilitado.',
      status: 'Vigente',
      hashSha256: '1a79a4d60de6718e8e5b326e338ae533fa7a4e69b3074d20ae4cfd956f17e3be'
    },
    {
      id: 'doc-7',
      title: 'Parecer Conclusivo do Conselho Fiscal sobre Contas de 2025',
      category: 'Pareceres & Auditorias',
      year: 2025,
      uploadDate: '10/04/2026',
      fileSize: '780 KB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Aprovação unânime das contas pelo Conselho Fiscal com recomendação de aprovação pela Assembleia Geral.',
      status: 'Vigente',
      hashSha256: 'bb68233f00155b1f9b31d8c11e74be88a10986ee0fb5c4cb813589b9ad55c0a3'
    },
    {
      id: 'doc-8',
      title: 'Relatório Anual de Atividades e Impacto Social 2025',
      category: 'Relatórios de Gestão & Execução',
      year: 2025,
      uploadDate: '15/05/2026',
      fileSize: '5.2 MB',
      fileType: 'PDF',
      fileUrl: '#',
      description: 'Dossiê completo de atividades realizadas, público alcançado, indicadores e fotografias das ações em Padre Lúcio.',
      status: 'Vigente',
      hashSha256: 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1'
    }
  ]);

  // News and Releases
  readonly news = signal<NewsItem[]>([
    {
      id: 'news-1',
      slug: 'inauguracao-viveiro-comunitario',
      title: 'Instituto Raízes da Comunidade inaugura novo viveiro de mudas nativas em Padre Lúcio',
      summary: 'Estrutura comunitária vai produzir mais de 2.000 mudas por ano para reflorestamento de nascentes e fomento a quintais agroecológicos.',
      content: 'Com a presença de famílias pioneiras e voluntários de toda a região, a Associação Comunitária de Padre Lúcio - Instituto Raízes da Comunidade celebrou a entrega oficial do viveiro comunitário. A iniciativa faz parte do eixo de Agroecologia e Sustentabilidade, permitindo que moradores cultivem mudas de ipê, baru, pequi e hortaliças orgânicas.',
      category: 'Notícia',
      publishedAt: '03/11/2026',
      author: 'Comunicação Institucional',
      imageUrl: '/assets/images/project_agroecology_garden_1794165966364.jpg',
      tags: ['Agroecologia', 'Padre Lúcio', 'Meio Ambiente', 'Comunidade'],
      featured: true
    },
    {
      id: 'news-2',
      slug: 'abertura-inscricoes-voluntariado-2026',
      title: 'Programa Raízes em Ação abre chamada para novos voluntários comunitários',
      summary: 'Inscrições abertas para apoio em reforço escolar, oficinas culturais de violão, comunicação popular e horta coletiva.',
      content: 'Estão abertas as inscrições para o banco de voluntariado do Instituto Raízes da Comunidade. Se você tem disponibilidade de algumas horas por semana ou nos finais de semana, venha somar energias com o nosso time em prol do desenvolvimento comunitário de Padre Lúcio.',
      category: 'Campanha',
      publishedAt: '28/10/2026',
      author: 'Coordenação de Voluntariado',
      imageUrl: '/assets/images/hero_community_roots_1794165964918.jpg',
      tags: ['Voluntariado', 'Ação Social', 'Participação'],
      featured: true
    },
    {
      id: 'news-3',
      slug: 'prestacao-contas-semestral-publicada',
      title: 'Portal da Transparência é atualizado com demonstrativos do 3º trimestre de 2026',
      summary: 'Cumprindo as diretrizes da Lei 13.019/2014 (MROSC), disponibilizamos as notas fiscais, extratos e relatórios de execução.',
      content: 'A transparência ativa é um dos pilares inegociáveis do Instituto Raízes da Comunidade. Qualquer cidadão, parceiro ou órgão fiscalizador pode consultar na aba de Transparência todos os comprovantes de receitas, pagamentos a fornecedores e a situação de vigência dos nossos instrumentos públicos.',
      category: 'Comunicado Oficial',
      publishedAt: '20/10/2026',
      author: 'Diretoria Administrativa',
      imageUrl: '/assets/images/project_education_kids_1794165964654.jpg',
      tags: ['Transparência', 'MROSC', 'Lei 13019', 'Contas Públicas'],
      featured: false
    },
    {
      id: 'news-4',
      slug: 'mostra-cultural-padre-lucio-musica',
      title: 'Jovens do Projeto Sons & Tradições realizam primeira apresentação musical pública',
      summary: 'Apresentação emocionante celebrou as raízes culturais do povoado com clássicos do cancioneiro popular.',
      content: 'Após seis meses de dedicação nas oficinas semanais de violão e ritmo, os educandos do Instituto Raízes da Comunidade encantaram pais e vizinhos em um concerto ao ar livre na praça central de Padre Lúcio.',
      category: 'Evento',
      publishedAt: '12/10/2026',
      author: 'Coordenação Cultural',
      imageUrl: '/assets/images/project_culture_music_1794165966001.jpg',
      tags: ['Cultura', 'Música', 'Juventude', 'Memória'],
      featured: false
    }
  ]);

  // Volunteer Applications
  readonly volunteers = signal<VolunteerApplication[]>([
    {
      id: 'vol-1',
      fullName: 'Mariana Souza Lima',
      email: 'mariana.souza@email.com (Demonstrativo)',
      phone: '(61) 99123-4567',
      city: 'Águas Lindas de Goiás / Padre Lúcio',
      areasOfInterest: ['Educação & Reforço Escolar', 'Comunicação & Mídias Sociais'],
      availability: 'Finais de Semana',
      weeklyHours: 4,
      experienceNotes: 'Estudante de Pedagogia no 6º semestre, com interesse em apoiar a biblioteca e reforço de leitura.',
      status: 'Aprovado',
      submittedAt: '01/11/2026',
      notes: 'Entrevista realizada, alocada no Projeto Sementes do Saber.'
    },
    {
      id: 'vol-2',
      fullName: 'Carlos Eduardo Oliveira',
      email: 'carlos.eduardo@email.com (Demonstrativo)',
      phone: '(61) 98234-5678',
      city: 'Padre Lúcio - GO',
      areasOfInterest: ['Agroecologia & Horta Comunitária'],
      availability: 'Dias Úteis (Manhã)',
      weeklyHours: 6,
      experienceNotes: 'Técnico agrícola com experiência em compostagem e irrigação por gotejamento.',
      status: 'Contatado',
      submittedAt: '29/10/2026',
      notes: 'Agendada visita prática à horta comunitária no próximo sábado.'
    },
    {
      id: 'vol-3',
      fullName: 'Beatriz Fagundes Mendes',
      email: 'beatriz.fagundes@email.com (Demonstrativo)',
      phone: '(61) 99345-6789',
      city: 'Brasília / Entorno',
      areasOfInterest: ['Oficinas Culturais & Música', 'Apoio Administrativo & Captação'],
      availability: 'Flexível',
      weeklyHours: 3,
      experienceNotes: 'Música e produtora cultural, pode contribuir com oficinas de percussão e escrita de projetos.',
      status: 'Novo',
      submittedAt: '04/11/2026'
    }
  ]);

  // Audit Logs
  readonly auditLogs = signal<AuditLog[]>([
    {
      id: 'log-1',
      timestamp: '08/11/2026 11:20:00',
      user: 'Super Admin - Coordenação',
      role: 'Super Admin',
      action: 'Publicação',
      entity: 'Notícia',
      entityId: 'news-1',
      entityTitle: 'Inauguração do Viveiro de Mudas Nativas',
      details: 'Publicação de notícia institucional e sincronização com a galeria de imagens.'
    },
    {
      id: 'log-2',
      timestamp: '05/11/2026 14:15:30',
      user: 'Gestor de Transparência',
      role: 'Gestor de Transparência',
      action: 'Criação',
      entity: 'Financeiro',
      entityId: 'fin-01',
      entityTitle: 'Doações via PIX Outubro/Novembro',
      details: 'Lançamento de receita conciliada com extrato da conta bancária institucional.'
    },
    {
      id: 'log-3',
      timestamp: '01/11/2026 09:30:12',
      user: 'Super Admin - Coordenação',
      role: 'Super Admin',
      action: 'Alteração de Status',
      entity: 'Voluntário',
      entityId: 'vol-1',
      entityTitle: 'Mariana Souza Lima',
      details: 'Inscrição de voluntariado alterada para "Aprovado" após entrevista de acolhimento.'
    },
    {
      id: 'log-4',
      timestamp: '25/10/2026 16:45:00',
      user: 'Gestor de Transparência',
      role: 'Gestor de Transparência',
      action: 'Criação',
      entity: 'Documento',
      entityId: 'doc-5',
      entityTitle: 'CRF Caixa - FGTS',
      details: 'Inclusão de certidão de regularidade com alerta de vencimento em 30 dias.'
    }
  ]);

  // Current logged in user (Admin area)
  readonly currentUser = signal<UserSession>({
    id: 'usr-1',
    name: 'Coordenação Geral / Admin',
    email: 'admin@institutoraizes.org.br',
    role: 'Super Admin'
  });

  // Computed Alerts (Documentos a vencer, prestações de contas, prazos)
  readonly alerts = computed<SystemAlert[]>(() => {
    const list: SystemAlert[] = [];

    // Check expiring documents
    this.documents().forEach(doc => {
      if (doc.status === 'A Vencer') {
        list.push({
          id: `alert-doc-${doc.id}`,
          type: 'certidao_vencimento',
          severity: 'alta',
          title: `Certidão a Vencer: ${doc.title}`,
          message: `A certidão está com vencimento previsto para ${doc.expirationDate || 'breve'}. Renove junto ao órgão expedidor para manter a regularidade MROSC.`,
          dueDate: doc.expirationDate,
          link: '/transparencia',
          actionLabel: 'Ver no Portal',
          read: false
        });
      }
    });

    // Check instruments with pending accountability
    this.instruments().forEach(inst => {
      if (inst.status === 'Em Prestação de Contas') {
        list.push({
          id: `alert-inst-${inst.id}`,
          type: 'prestacao_pendente',
          severity: 'alta',
          title: `Prestação de Contas Pendente: ${inst.number}`,
          message: `O instrumento ${inst.number} (${inst.grantingBody}) encontra-se em fase final de consolidação de relatório e envio de notas fiscais.`,
          dueDate: inst.endDate,
          link: '/admin',
          actionLabel: 'Gerenciar no Admin',
          read: false
        });
      }
    });

    // Check new volunteer applications
    const newVolunteersCount = this.volunteers().filter(v => v.status === 'Novo').length;
    if (newVolunteersCount > 0) {
      list.push({
        id: 'alert-vol-new',
        type: 'novo_voluntario',
        severity: 'media',
        title: `${newVolunteersCount} Novo(s) Voluntário(s) Aguardando Análise`,
        message: 'Há novas inscrições de voluntários recebidas no portal que aguardam primeiro contato da equipe.',
        link: '/admin',
        actionLabel: 'Ver Inscrições',
        read: false
      });
    }

    return list;
  });

  // Computed financial KPIs
  readonly financialKpis = computed(() => {
    const records = this.financialRecords();
    const totalIncome = records
      .filter(r => r.type === 'Receita')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = records
      .filter(r => r.type === 'Despesa')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpense;

    const publicTransferred = this.instruments()
      .reduce((acc, curr) => acc + curr.totalValue, 0);
    const publicExecuted = this.instruments()
      .reduce((acc, curr) => acc + curr.executedValue, 0);

    return {
      totalIncome,
      totalExpense,
      balance,
      publicTransferred,
      publicExecuted,
      executionRate: publicTransferred > 0 ? (publicExecuted / publicTransferred) * 100 : 0
    };
  });

  // --- ACTIONS & MUTATIONS ---

  addAudit(action: AuditLog['action'], entity: AuditLog['entity'], entityId: string, entityTitle: string, details: string) {
    const user = this.currentUser();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      user: user.name,
      role: user.role,
      action,
      entity,
      entityId,
      entityTitle,
      details
    };
    this.auditLogs.update(logs => [newLog, ...logs]);
  }

  // Projects CRUD
  addProject(project: Omit<Project, 'id' | 'slug'>) {
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      slug
    };
    this.projects.update(list => [newProj, ...list]);
    this.addAudit('Criação', 'Projeto', newProj.id, newProj.title, 'Novo projeto cadastrado');
    return newProj;
  }

  updateProject(id: string, updates: Partial<Project>) {
    this.projects.update(list => list.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        this.addAudit('Edição', 'Projeto', id, updated.title, 'Dados do projeto atualizados');
        return updated;
      }
      return p;
    }));
  }

  deleteProject(id: string) {
    const target = this.projects().find(p => p.id === id);
    if (target) {
      this.projects.update(list => list.filter(p => p.id !== id));
      this.addAudit('Exclusão', 'Projeto', id, target.title, 'Projeto removido do catálogo');
    }
  }

  // News CRUD
  addNews(newsItem: Omit<NewsItem, 'id' | 'slug'>) {
    const slug = newsItem.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const item: NewsItem = {
      ...newsItem,
      id: `news-${Date.now()}`,
      slug
    };
    this.news.update(list => [item, ...list]);
    this.addAudit('Publicação', 'Notícia', item.id, item.title, 'Nova publicação realizada no portal');
    return item;
  }

  updateNews(id: string, updates: Partial<NewsItem>) {
    this.news.update(list => list.map(item => {
      if (item.id === id) {
        const updated = { ...item, ...updates };
        this.addAudit('Edição', 'Notícia', id, updated.title, 'Notícia atualizada');
        return updated;
      }
      return item;
    }));
  }

  deleteNews(id: string) {
    const target = this.news().find(n => n.id === id);
    if (target) {
      this.news.update(list => list.filter(n => n.id !== id));
      this.addAudit('Exclusão', 'Notícia', id, target.title, 'Notícia excluída');
    }
  }

  // Public Instruments CRUD
  addInstrument(instrument: Omit<PublicInstrument, 'id'>) {
    const newInst: PublicInstrument = {
      ...instrument,
      id: `inst-${Date.now()}`
    };
    this.instruments.update(list => [newInst, ...list]);
    this.addAudit('Criação', 'Instrumento', newInst.id, newInst.number, 'Novo instrumento público MROSC registrado');
    return newInst;
  }

  updateInstrument(id: string, updates: Partial<PublicInstrument>) {
    this.instruments.update(list => list.map(inst => {
      if (inst.id === id) {
        const updated = { ...inst, ...updates };
        this.addAudit('Edição', 'Instrumento', id, updated.number, 'Instrumento público atualizado');
        return updated;
      }
      return inst;
    }));
  }

  deleteInstrument(id: string) {
    const target = this.instruments().find(i => i.id === id);
    if (target) {
      this.instruments.update(list => list.filter(i => i.id !== id));
      this.addAudit('Exclusão', 'Instrumento', id, target.number, 'Instrumento público removido');
    }
  }

  // Financial Records CRUD
  addFinancialRecord(record: Omit<FinancialRecord, 'id'>) {
    const newRecord: FinancialRecord = {
      ...record,
      id: `fin-${Date.now()}`
    };
    this.financialRecords.update(list => [newRecord, ...list]);
    this.addAudit('Criação', 'Financeiro', newRecord.id, `${newRecord.type}: R$ ${newRecord.amount}`, 'Lançamento financeiro registrado');
    return newRecord;
  }

  deleteFinancialRecord(id: string) {
    const target = this.financialRecords().find(r => r.id === id);
    if (target) {
      this.financialRecords.update(list => list.filter(r => r.id !== id));
      this.addAudit('Exclusão', 'Financeiro', id, target.description, 'Lançamento financeiro excluído');
    }
  }

  // Documents CRUD
  addDocument(doc: Omit<TransparencyDocument, 'id'>) {
    const newDoc: TransparencyDocument = {
      ...doc,
      id: `doc-${Date.now()}`
    };
    this.documents.update(list => [newDoc, ...list]);
    this.addAudit('Criação', 'Documento', newDoc.id, newDoc.title, 'Novo documento de transparência disponibilizado');
    return newDoc;
  }

  updateDocument(id: string, updates: Partial<TransparencyDocument>) {
    this.documents.update(list => list.map(d => {
      if (d.id === id) {
        const updated = { ...d, ...updates };
        this.addAudit('Edição', 'Documento', id, updated.title, 'Documento de transparência atualizado');
        return updated;
      }
      return d;
    }));
  }

  deleteDocument(id: string) {
    const target = this.documents().find(d => d.id === id);
    if (target) {
      this.documents.update(list => list.filter(d => d.id !== id));
      this.addAudit('Exclusão', 'Documento', id, target.title, 'Documento de transparência removido');
    }
  }

  // Volunteer Submission & Status
  submitVolunteerApplication(application: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>) {
    const newVol: VolunteerApplication = {
      ...application,
      id: `vol-${Date.now()}`,
      status: 'Novo',
      submittedAt: new Date().toLocaleDateString('pt-BR')
    };
    this.volunteers.update(list => [newVol, ...list]);
    this.addAudit('Criação', 'Voluntário', newVol.id, newVol.fullName, 'Nova candidatura de voluntariado recebida pelo formulário do portal');
    return newVol;
  }

  updateVolunteerStatus(id: string, status: VolunteerApplication['status'], notes?: string) {
    this.volunteers.update(list => list.map(v => {
      if (v.id === id) {
        const updated = { ...v, status, notes: notes !== undefined ? notes : v.notes };
        this.addAudit('Alteração de Status', 'Voluntário', id, v.fullName, `Status alterado para "${status}"`);
        return updated;
      }
      return v;
    }));
  }

  // Institutional Settings Updates
  updateInstitutionProfile(updates: Partial<InstitutionProfile>) {
    this.institution.update(curr => ({ ...curr, ...updates }));
    this.addAudit('Edição', 'Configurações', 'inst-settings', 'Perfil Institucional', 'Dados da instituição atualizados');
  }

  updateSocialIndicator(id: string, value: number, unit?: string, label?: string) {
    this.indicators.update(list => list.map(ind => {
      if (ind.id === id) {
        return {
          ...ind,
          value,
          unit: unit || ind.unit,
          label: label || ind.label,
          lastUpdated: new Date().toLocaleDateString('pt-BR')
        };
      }
      return ind;
    }));
    this.addAudit('Edição', 'Configurações', id, 'Indicador Social', `Indicador social atualizado para ${value}`);
  }

  switchUserRole(role: UserRole) {
    const names: Record<UserRole, string> = {
      'Super Admin': 'Presidência & Coordenação Geral',
      'Gestor de Transparência': 'Controladoria & MROSC',
      'Editor de Conteúdo': 'Comunicação Social & Redação'
    };
    this.currentUser.set({
      id: `usr-${role.toLowerCase().replace(/ /g, '-')}`,
      name: names[role],
      email: `${role.toLowerCase().replace(/ /g, '.')}@institutoraizes.org.br`,
      role
    });
  }
}
