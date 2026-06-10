/** Références sectorielles — source : export references.pdf */

export type SectorReference = {
  /** Intitulé client / projet (gras dans le PDF) */
  highlight?: string;
  /** Détail de la mission */
  text: string;
};

export const SECTOR_REFERENCES: Record<string, SectorReference[]> = {
  agriculture: [
    { highlight: "Entreprise de production et transformation agricole spécialisée en cultures rares", text: "étude de faisabilité cultures alternées, business plan, diversification des activités agricoles, identité de marque" },
    { highlight: "Coopérative agricole (filière porcine)", text: "étude de faisabilité technico-économique, stratégie opérationnelle, recherche de financements, stratégie de diversification, stratégie de communication" },
    { highlight: "Production de plantes aromatiques et médicinales", text: "stratégie marketing et structuration commerciale, plan de communication" },
    { highlight: "Ferme aquaponique", text: "analyse de marché, modélisation économique, financement LEADER" },
  ],
  numerique: [
    { highlight: "Entreprise spécialisée dans la domotique", text: "définition de la stratégie marketing, structuration commerciale, stratégie de communication, mise en place d’outils de gestion opérationnelle" },
    { highlight: "Entreprise spécialisée dans l’achat groupé sur internet", text: "élaboration du business plan export, recherche de financements, valorisation financière" },
    { highlight: "Application de gestion de services à la personne", text: "modélisation économique, stratégie de développement" },
    { highlight: "Application de gestion d'invendus alimentaires", text: "stratégie commerciale" },
  ],
  "sante-medico-social": [
    { highlight: "Projet hospitalier innovant", text: "gestion du projet, de ses partenaires, recherche de financement, stratégie de valorisation, externalisation au sein d’un véhicule juridique adapté" },
    { highlight: "Plateforme médicale innovante", text: "montage du dossier et financement FEDER" },
    { highlight: "Etablissement médico-social", text: "structuration du projet associatif, stratégie de développement" },
    { highlight: "Projet de coworking d'auxiliaires médicaux", text: "étude de faisabilité, modèle économique, stratégie de financement, financement LEADER" },
  ],
  transport: [
    { highlight: "Start-up de construction et d’exploitation d’un cargo voile", text: "Construction d’un business model, analyse de coût de revient et de rentabilité, campagne de prospection commerciale à l’export, recherche de financements" },
    { highlight: "Projet innovant de solution d'autopartage", text: "analyse de marché, construction du business plan" },
    { highlight: "Ligue professionnelle de voile", text: "Etude stratégique de la filière Voile" },
    { highlight: "Projet de transporteur routier", text: "construction du modèle économique, réalisation du business plan" },
  ],
  energie: [
    { highlight: "Start-up de production d’électricité par procédé innovant (brevet)", text: "revue de business plan, stratégie financière, du diligences préalables à la recherche d'investisseurs" },
    { highlight: "Centre d'excellence sur la géothermie", text: "analyse prospective, construction du modèle économique, étude de faisabilité, étude de préfiguration, montage du projet et financement INTERREG" },
    { highlight: "Start-up de production de biogaz et de GNV", text: "étude de la filière, analyse de la chaîne de valeur, médiation projet partenariat public - privé" },
    { highlight: "Start-up de fabrication de borne de recharge solaire connectée", text: "stratégie marketing, analyse coûts de revient, modélisation économique , recherche de financements, financement ARI" },
  ],
  environnement: [
    { highlight: "Entreprise de valorisation de déchets d’élagage en charbon", text: "étude de faisabilité technique, définition d’un modèle économique, analyse de marché, construction d’un business plan" },
    { highlight: "Entreprise de traitement de déchets", text: "étude de faisabilité et de valorisation du broyat de verre" },
    { highlight: "Association de protection de l'environnement", text: "audit organisationnel, recommandations, montage financement CCT" },
    { highlight: "Entreprise de traitement de déchets dangereux", text: "étude d'opportunité export Trinidad & Tobago" },
  ],
  industrie: [
    { highlight: "Entreprise de construction de mobilier parasismique", text: "structuration technique, structuration commerciale, pré-industrialisation, étude de protection intellectuelle, recherche de financements" },
    { highlight: "Distillerie (rhum)", text: "étude des coûts de revient, audit industriel, recommandations" },
    { highlight: "Fabrication industrielle d'escaliers sur mesure et de menuiseries en bois", text: "audit industriel, recommandations" },
    { highlight: "Enteprise industrielle de fabrication de jus de canne", text: "stratégie export, étude de coûts de revient, audit industriel, recommandations" },
  ],
  btp: [
    { highlight: "Entreprise de détection de réseaux enterrés", text: "Etude de marché, audit organisationnel, conception d’un outil opérationnel de pilotage de l’activité, Accompagnement à la certification de l’entreprise" },
    { highlight: "Entreprise spécialisée dans l’étanchéité, la réhabilitation et la protection d’ouvrages en génie civil", text: "étude de faisabilité, élaboration de business plan, recherche de financements" },
    { highlight: "Plateau technique dans le domaine de l'énergie et de la construction des bâtiments", text: "étude de faisabilité, modèle économique, préfiguration" },
    { highlight: "Projet de renovation d'un bâtiment en centre-ville", text: "etude fonctionnelle, étude économique, assistance au pilotage du projet, stratégie de financement" },
  ],
  tourisme: [
    { highlight: "Fédération professionnelle", text: "structuration de filière" },
    { highlight: "Entreprise specialisé dans le tourisme industriel", text: "étude de marché, modèle économique, stratégie de financement, chéque innovation" },
    { highlight: "Projet de reprise d'un complexe hôtelier en Guyane", text: "due dilligences préalables (diagnostic financier et réglementaire)" },
    { highlight: "Agence de voyage réceptive", text: "audit organisationnel, marketing / communication, réglementaire, financier; recommandations stratégiques" },
  ],
  public: [
    { text: "Gestion de dispositifs d'accompagnement d'entreprises collectifs et individuels" },
    { text: "Réalisation d'annuaire de structures d'accompagnement et de financement" },
    { text: "Etudes emploi / formations Guadeloupe et Martinique" },
    { text: "Etudes de marchés, d'opportunités et de faisabilité de pépinière d'entreprise et d'espaces de coworking" },
  ],
  agrotransformation: [
    { highlight: "Entreprise semi-industrielle de transformation du manioc", text: "modèle économique, stratégie de développement, projet de R&D, recherche de financement, financement LEADER, ARI" },
    { highlight: "Entreprise semi-industrielle innovante de transformation de produits laitiers", text: "analyse de marché, étude économique, stratégie de financement" },
    { highlight: "Entreprise industrielle innovante de fabrication d'alimentation infantile", text: "modélisation économique, stratégie marketing et commerciale" },
    { highlight: "Entreprise semi-industrielle de transformation de noix de cajou", text: "stratégie de développement à l'international, détermination des coûts de revient" },
  ],
  "economie-circulaire": [
    { highlight: "Entreprise innovante de valorisation de déchets végétaux et d'excréments d'animaux", text: "analyse de marché, étude économique, stratégie de financement" },
    { highlight: "Entreprise innovante de valorisation de dechets de bananiers", text: "étude de marché, modèle économique, stratégie de financement, chèque innovation, financement ARI" },
    { highlight: "Entreprise de valorisation de dechets de noix de coco", text: "analyse de marché, modélisation économique, calcul de coûts de revient, stratégie de financement" },
    { highlight: "Projet de valorisation de dressing haut de gamme", text: "modélisation économique, stratégie marketing et commerciale" },
  ],
  "culture-loisirs": [
    { highlight: "Entreprise d'édition de bande dessinée pour enfants", text: "modèle économique, stratégie de développement" },
    { highlight: "Projet de bibliobus", text: "analyse de marché, construction d'un modèle économique" },
    { highlight: "Entreprise d'excursions en bateau", text: "recherche de sources de financements, portage juridique, analyse de coûts de revient, préfinancement subvention" },
    { highlight: "Projet de base nautique / café solidaire", text: "stratégie de financement, construction d'un budget prévisionnel, recommandations organisationnelles, financement LEADER" },
  ],
  "services-entreprises": [
    { highlight: "Projet innovant de station de lavage", text: "modèle économique, étude de faisabilité, financement LEADER" },
    { highlight: "Entreprise de gestion d'espace de coworking", text: "modèle économique, stratégie marketing et commerciale" },
    { highlight: "Entreprise de sécurité privée", text: "assistance à réponse à plusieurs appels d'offres, structuration d'un mémoire technique, formation" },
    { highlight: "Entreprise d'entretien et de réparation de poids lourds", text: "analyse de marché, optimisation de modèle économique, stratégie financière" },
  ],
  "commerce-distribution": [
    { highlight: "Entreprise de distribution d'équipements photovoltaïques", text: "Audit organisationnel, recommandations, stratégie de développement" },
    { highlight: "Entreprise de distribution de matériaux et d'articles de bricolage", text: "etude de faisabilité de projet d'extension et de diversification" },
    { highlight: "Entreprise de commercialisation de distributeurs alimentaires", text: "étude économique, étude de faisabilité, stratégie de financement" },
    { highlight: "Entreprise de distribution de papeterie, produits éducatifs, culturels et de loisirs", text: "analyse stratégique, analyse marketing, audit organisationnel, analyse de coûts de revient, optimisation process" },
  ],
  artisanat: [
    { highlight: "Entreprise artisanale de fabrication de produits haut de gamme", text: "analyse de marché, analyse de process, détermination des coûts de revient, stratégie de développement international" },
    { highlight: "Entreprise artisanale de production de boudin et assimilés", text: "Analyse du marché, analyse de process, modélisation économique" },
    { highlight: "Entreprise artisanale de création de bijoux, calebasses, tableaux et coffrets garnis", text: "analyse de marché, modelisation économique, financement LEADER" },
    { highlight: "Entreprise artisanale de fabrication de produits cosmétiques", text: "portage juridique, analyse de process, modélisation économique, financement LEADER" },
  ],
};
