/** Références sectorielles anonymisées — source : references-Tableau 1.csv (VALIDATION = OK) */

export type SectorReference = {
  text: string;
};

export const SECTOR_REFERENCES: Record<string, SectorReference[]> = {
  "numerique": [
    { text: "Entreprise spécialisée dans la domotique : définition de la stratégie marketing, structuration commerciale, stratégie de communication, mise en place d’outils de gestion opérationnelle" },
    { text: "Entreprise spécialisée dans l’achat groupé sur internet : élaboration du business plan export, recherche de financements, valorisation financière" },
    { text: "Application de gestion de services à la personne : modélisation économique, stratégie de développement" },
    { text: "Application de gestion d'invendus alimentaires : stratégie commerciale" },
  ],
  "tourisme": [
    { text: "Fédération professionnelle : structuration de filière" },
    { text: "Entreprise specialisé dans le tourisme industriel : étude de marché, modèle économique, stratégie de financement, chéque innovation" },
    { text: "Projet de reprise d'un complexe hôtelier en Guyane : due dilligences préalables (diagnostic financier et réglementaire)" },
    { text: "Agence de voyage réceptive : audit organisationnel, marketing / communication, réglementaire, financier; recommandations stratégiques" },
  ],
  "agro": [
    { text: "Entreprise de production et transformation agricole spécialisée en cultures rares : étude de faisabilité cultures alternées, business plan, diversification des activités agricoles, identité de marque" },
    { text: "Coopérative agricole (filière porcine) : étude de faisabilité technico-économique, stratégie opérationnelle, recherche de financements, stratégie de diversification, stratégie de communication" },
    { text: "Production de plantes aromatiques et médicinales : stratégie marketing et structuration commerciale, plan de communication" },
    { text: "Entreprise semi-industrielle de transformation du manioc : modèle économique, stratégie de développement, projet de R&D, recherche de financement, financement LEADER, ARI" },
    { text: "Entreprise semi-industrielle innovante de transformation de produits laitiers : analyse de marché, étude économique, stratégie de financement" },
    { text: "Entreprise industrielle innovante de fabrication d'alimentation infantile : modélisation économique, stratégie marketing et commerciale" },
    { text: "Entreprise semi-industrielle de transformation de noix de cajou : stratégie de développement à l'international, détermination des coûts de revient" },
    { text: "Ferme aquaponique : analyse de marché, modélisation économique, financement LEADER" },
  ],
  "energie": [
    { text: "Start-up de production d’électricité par procédé innovant (brevet) : revue de business plan, stratégie financière, du diligences préalables à la recherche d'investisseurs" },
    { text: "Centre d'excellence sur la géothermie : analyse prospective, construction du modèle économique, étude de faisabilité, étude de préfiguration, montage du projet et financement INTERREG" },
    { text: "Start-up de production de biogaz et de GNV : étude de la filière, analyse de la chaîne de valeur, médiation projet partenariat public - privé" },
    { text: "Start-up de fabrication de borne de recharge solaire connectée : stratégie marketing, analyse coûts de revient, modélisation économique , recherche de financements, financement ARI" },
  ],
  "services-personne": [
    { text: "Application de gestion de services à la personne : modélisation économique, stratégie de développement" },
  ],
  "medico-social": [
    { text: "Projet hospitalier innovant : gestion du projet, de ses partenaires, recherche de financement, stratégie de valorisation, externalisation au sein d’un véhicule juridique adapté" },
    { text: "Plateforme médicale innovante : montage du dossier et financement FEDER" },
    { text: "Etablissement médico-social : structuration du projet associatif, stratégie de développement" },
    { text: "Gestion de dispositifs d'accompagnement d'entreprises collectifs et individuels" },
    { text: "Projet de coworking d'auxiliaires médicaux : étude de faisabilité, modèle économique, stratégie de financement, financement LEADER" },
    { text: "Réalisation d'annuaire de structures d'accompagnement et de financement" },
    { text: "Etudes emploi / formations Guadeloupe et Martinique" },
    { text: "Etudes de marchés, d'opportunités et de faisabilité de pépinière d'entreprise et d'espaces de coworking" },
  ],
  "commerce": [
    { text: "Entreprise de distribution d'équipements photovoltaïques : Audit organisationnel, recommandations, stratégie de développement" },
    { text: "Entreprise de distribution de matériaux et d'articles de bricolage : etude de faisabilité de projet d'extension et de diversification" },
    { text: "Entreprise de commercialisation de distributeurs alimentaires : étude économique, étude de faisabilité, stratégie de financement" },
    { text: "Entreprise de distribution de papeterie, produits éducatifs, culturels et de loisirs : analyse stratégique, analyse marketing, audit organisationnel, analyse de coûts de revient, optimisation process" },
  ],
  "services-entreprises": [
    { text: "Projet innovant de station de lavage : modèle économique, étude de faisabilité, financement LEADER" },
    { text: "Entreprise de gestion d'espace de coworking : modèle économique, stratégie marketing et commerciale" },
    { text: "Entreprise de sécurité privée : assistance à réponse à plusieurs appels d'offres, structuration d'un mémoire technique, formation" },
    { text: "Entreprise d'entretien et de réparation de poids lourds : analyse de marché, optimisation de modèle économique, stratégie financière" },
  ],
  "environnement": [
    { text: "Entreprise de valorisation de déchets d’élagage en charbon : étude de faisabilité technique, définition d’un modèle économique, analyse de marché, construction d’un business plan" },
    { text: "Entreprise innovante de valorisation de déchets végétaux et d'excréments d'animaux : analyse de marché, étude économique, stratégie de financement" },
    { text: "Entreprise innovante de valorisation de dechets de bananiers : étude de marché, modèle économique, stratégie de financement, chèque innovation, financement ARI" },
    { text: "Entreprise de valorisation de dechets de noix de coco : analyse de marché, modélisation économique, calcul de coûts de revient, stratégie de financement" },
    { text: "Entreprise de traitement de déchets : étude de faisabilité et de valorisation du broyat de verre" },
    { text: "Association de protection de l'environnement : audit organisationnel, recommandations, montage financement CCT" },
    { text: "Projet de valorisation de dressing haut de gamme : modélisation économique, stratégie marketing et commerciale" },
    { text: "Entreprise de traitement de déchets dangereux : étude d'opportunité export Trinidad & Tobago" },
  ],
  "sante": [
    { text: "Projet hospitalier innovant : gestion du projet, de ses partenaires, recherche de financement, stratégie de valorisation, externalisation au sein d’un véhicule juridique adapté" },
    { text: "Plateforme médicale innovante : montage du dossier et financement FEDER" },
    { text: "Projet de coworking d'auxiliaires médicaux : étude de faisabilité, modèle économique, stratégie de financement, financement LEADER" },
  ],
  "edition": [
    { text: "Entreprise d'édition de bande dessinée pour enfants : modèle économique, stratégie de développement" },
    { text: "Projet de bibliobus : analyse de marché, construction d'un modèle économique" },
    { text: "Entreprise d'excursions en bateau : recherche de sources de financements, portage juridique, analyse de coûts de revient, préfinancement subvention" },
    { text: "Projet de base nautique / café solidaire : stratégie de financement, construction d'un budget prévisionnel, recommandations organisationnelles, financement LEADER" },
  ],
  "artisanat": [
    { text: "Entreprise artisanale de fabrication de produits haut de gamme : analyse de marché, analyse de process, détermination des coûts de revient, stratégie de développement international" },
    { text: "Entreprise artisanale de production de boudin et assimilés : Analyse du marché, analyse de process, modélisation économique" },
    { text: "Entreprise artisanale de création de bijoux, calebasses, tableaux et coffrets garnis : analyse de marché, modelisation économique, financement LEADER" },
    { text: "Entreprise artisanale de fabrication de produits cosmétiques : portage juridique, analyse de process, modélisation économique, financement LEADER" },
  ],
  "petites-industries": [
    { text: "Start-up de construction et d’exploitation d’un cargo voile : Construction d’un business model, analyse de coût de revient et de rentabilité, campagne de prospection commerciale à l’export, recherche de financements" },
    { text: "Entreprise de construction de mobilier parasismique : structuration technique, structuration commerciale, pré-industrialisation, étude de protection intellectuelle, recherche de financements" },
    { text: "Entreprise de détection de réseaux enterrés : Etude de marché, audit organisationnel, conception d’un outil opérationnel de pilotage de l’activité, Accompagnement à la certification de l’entreprise" },
    { text: "Entreprise spécialisée dans l’étanchéité, la réhabilitation et la protection d’ouvrages en génie civil : étude de faisabilité, élaboration de business plan, recherche de financements" },
    { text: "Projet innovant de solution d'autopartage : analyse de marché, construction du business plan" },
    { text: "Plateau technique dans le domaine de l'énergie et de la construction des bâtiments : étude de faisabilité, modèle économique, préfiguration" },
    { text: "Projet de renovation d'un bâtiment en centre-ville : etude fonctionnelle, étude économique, assistance au pilotage du projet, stratégie de financement" },
    { text: "Ligue professionnelle de voile : Etude stratégique de la filière Voile" },
    { text: "Distillerie (rhum) : étude des coûts de revient, audit industriel, recommandations" },
    { text: "Fabrication industrielle d'escaliers sur mesure et de menuiseries en bois : audit industriel, recommandations" },
    { text: "Enteprise industrielle de fabrication de jus de canne : stratégie export, étude de coûts de revient, audit industriel, recommandations" },
    { text: "Projet de transporteur routier : construction du modèle économique, réalisation du business plan" },
  ],
};
