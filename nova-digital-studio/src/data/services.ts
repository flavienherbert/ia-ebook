import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "creation-sites-web",
    icon: "globe",
    name: "Création de sites web",
    shortDescription:
      "Des sites rapides, élégants et pensés pour convertir vos visiteurs en clients.",
    heroDescription:
      "Nous concevons des sites vitrines, e-commerce et applications web sur mesure, alliant design haut de gamme, performance technique et logique de conversion. Chaque site est pensé comme un outil commercial, pas comme une simple carte de visite.",
    category: "Présence digitale",
    benefits: [
      {
        title: "Design sur mesure",
        description:
          "Aucun template générique : votre site reflète votre identité et se démarque de vos concurrents.",
      },
      {
        title: "Performance technique",
        description:
          "Temps de chargement optimisé, code propre et architecture moderne pour un score Lighthouse au top.",
      },
      {
        title: "Orienté conversion",
        description:
          "Chaque page est structurée pour guider le visiteur vers l'action : devis, achat, prise de contact.",
      },
      {
        title: "Évolutif",
        description:
          "Une architecture modulaire qui grandit avec votre entreprise, sans tout reconstruire.",
      },
    ],
    methodology: [
      {
        title: "Discovery orienté business",
        description:
          "Avant de coder, nous comprenons vos objectifs commerciaux, vos clients et vos concurrents.",
      },
      {
        title: "Design system cohérent",
        description:
          "Nous créons une bibliothèque de composants réutilisables pour garantir la cohérence visuelle.",
      },
      {
        title: "Mobile-first",
        description:
          "Plus de 60% du trafic est mobile : nous concevons d'abord pour le mobile, puis pour le desktop.",
      },
      {
        title: "Amélioration continue",
        description:
          "Le lancement n'est qu'une étape : nous analysons les données pour itérer et améliorer le taux de conversion.",
      },
    ],
    process: [
      { step: "01", title: "Audit & stratégie", description: "Analyse de vos besoins, de votre marché et définition des objectifs mesurables." },
      { step: "02", title: "Wireframes & UX", description: "Structuration des parcours utilisateurs et validation de l'arborescence." },
      { step: "03", title: "Design UI", description: "Création de maquettes haute-fidélité alignées à votre identité de marque." },
      { step: "04", title: "Développement", description: "Intégration technique avec un code propre, rapide et maintenable." },
      { step: "05", title: "Tests & recette", description: "Vérification cross-device, cross-navigateur et tests de performance." },
      { step: "06", title: "Mise en ligne & suivi", description: "Déploiement, formation et suivi des performances post-lancement." },
    ],
    pricing: [
      {
        name: "Essentiel",
        price: "1 490€",
        description: "Idéal pour lancer votre présence en ligne rapidement.",
        features: ["Site vitrine jusqu'à 5 pages", "Design responsive sur mesure", "Optimisation SEO de base", "Formulaire de contact", "Livraison sous 3 semaines"],
      },
      {
        name: "Croissance",
        price: "3 490€",
        description: "Pour les entreprises qui veulent un site orienté conversion.",
        features: ["Site jusqu'à 12 pages", "Design system complet", "SEO technique avancé", "Intégration CRM/newsletter", "Blog intégré", "Support 3 mois inclus"],
        highlighted: true,
      },
      {
        name: "Sur-mesure",
        price: "Sur devis",
        description: "Pour les projets complexes : e-commerce, plateforme, application web.",
        features: ["Fonctionnalités sur mesure", "E-commerce ou espace membre", "Architecture évolutive", "Accompagnement dédié", "Maintenance continue"],
      },
    ],
    faq: [
      { question: "Combien de temps faut-il pour créer un site web ?", answer: "Comptez en moyenne 3 à 6 semaines selon la complexité du projet, de la stratégie initiale à la mise en ligne." },
      { question: "Le site sera-t-il facile à modifier moi-même ?", answer: "Oui, nous intégrons un système de gestion de contenu intuitif qui vous permet de modifier textes et images sans compétence technique." },
      { question: "Proposez-vous l'hébergement et le nom de domaine ?", answer: "Nous vous accompagnons dans le choix et la configuration de l'hébergement et du nom de domaine, inclus ou en option selon la formule." },
      { question: "Le site sera-t-il optimisé pour le référencement ?", answer: "Oui, chaque site intègre les fondamentaux SEO techniques : balises, vitesse, structure sémantique et compatibilité mobile." },
    ],
    relatedProjectSlugs: ["atelier-orea", "vertego-immobilier"],
  },
  {
    slug: "branding",
    icon: "palette",
    name: "Branding & identité de marque",
    shortDescription: "Une identité forte, cohérente et mémorable qui inspire confiance.",
    heroDescription:
      "Nous construisons des identités de marque complètes : logo, palette, typographie, ton de voix et charte graphique. L'objectif est simple : que votre marque soit reconnaissable et inspire confiance dès le premier regard.",
    category: "Image de marque",
    benefits: [
      { title: "Différenciation claire", description: "Une identité unique qui vous distingue durablement de la concurrence." },
      { title: "Cohérence multi-supports", description: "Une charte graphique appliquée uniformément sur tous vos canaux de communication." },
      { title: "Confiance immédiate", description: "Une image professionnelle qui rassure vos prospects dès le premier contact." },
      { title: "Valeur perçue accrue", description: "Une identité premium qui justifie vos tarifs et renforce votre positionnement." },
    ],
    methodology: [
      { title: "Recherche stratégique", description: "Étude de votre marché, de vos concurrents et de votre audience cible." },
      { title: "Territoire de marque", description: "Définition de votre mission, votre ton de voix et vos valeurs distinctives." },
      { title: "Exploration créative", description: "Plusieurs pistes graphiques présentées et affinées avec vous." },
      { title: "Système documenté", description: "Une charte graphique claire pour une application cohérente en interne." },
    ],
    process: [
      { step: "01", title: "Brief & recherche", description: "Compréhension de votre vision, votre marché et votre audience." },
      { step: "02", title: "Positionnement", description: "Définition du territoire de marque et des messages clés." },
      { step: "03", title: "Création du logo", description: "Propositions de logo et itérations jusqu'à validation." },
      { step: "04", title: "Système visuel", description: "Palette, typographies, iconographie et règles d'usage." },
      { step: "05", title: "Charte graphique", description: "Livraison d'un guide complet applicable à tous vos supports." },
    ],
    pricing: [
      { name: "Starter", price: "890€", description: "Logo et kit de base pour démarrer sereinement.", features: ["Logo (3 propositions)", "Palette de couleurs", "2 typographies", "Fichiers sources"] },
      { name: "Identité complète", price: "2 190€", description: "Une identité de marque complète et professionnelle.", features: ["Logo + déclinaisons", "Charte graphique complète", "Templates réseaux sociaux", "Signature email", "Ton de voix éditorial"], highlighted: true },
      { name: "Rebranding", price: "Sur devis", description: "Refonte complète d'une identité existante.", features: ["Audit de marque existant", "Stratégie de transition", "Déploiement multi-supports", "Accompagnement au changement"] },
    ],
    faq: [
      { question: "Combien de temps dure un projet de branding ?", answer: "Comptez généralement 2 à 4 semaines pour une identité complète, selon le nombre d'itérations." },
      { question: "Puis-je demander des retouches sur le logo ?", answer: "Oui, chaque formule inclut un nombre de révisions défini pour affiner le résultat jusqu'à satisfaction." },
      { question: "Recevrai-je tous les fichiers sources ?", answer: "Oui, vous recevez l'ensemble des fichiers vectoriels et exports dans tous les formats nécessaires." },
    ],
    relatedProjectSlugs: ["atelier-orea", "lumina-cosmetics"],
  },
  {
    slug: "seo",
    icon: "search",
    name: "SEO & référencement naturel",
    shortDescription: "Gagnez en visibilité durable sur Google sans dépendre de la publicité.",
    heroDescription:
      "Nous optimisons votre visibilité organique grâce à une stratégie SEO complète : technique, contenu et netlinking. L'objectif est de vous positionner durablement sur les requêtes qui génèrent réellement du chiffre d'affaires.",
    category: "Acquisition",
    benefits: [
      { title: "Trafic qualifié durable", description: "Un flux de visiteurs constant, sans dépendre uniquement de la publicité payante." },
      { title: "Autorité de marque", description: "Une présence renforcée sur les résultats de recherche qui inspire crédibilité." },
      { title: "ROI à long terme", description: "Un investissement qui continue de générer des résultats des mois après sa mise en place." },
      { title: "Reporting transparent", description: "Un suivi mensuel clair des positions, du trafic et des conversions." },
    ],
    methodology: [
      { title: "Audit technique complet", description: "Analyse de l'indexation, de la vitesse et de la structure de votre site." },
      { title: "Recherche de mots-clés", description: "Identification des requêtes à fort potentiel business pour votre secteur." },
      { title: "Contenu optimisé", description: "Création et optimisation de contenus pertinents pour l'utilisateur et les moteurs." },
      { title: "Autorité & netlinking", description: "Développement d'un profil de liens sain pour renforcer votre autorité." },
    ],
    process: [
      { step: "01", title: "Audit SEO", description: "Analyse technique, sémantique et concurrentielle complète." },
      { step: "02", title: "Stratégie de mots-clés", description: "Sélection des requêtes prioritaires selon votre potentiel business." },
      { step: "03", title: "Optimisations on-site", description: "Corrections techniques, balises, structure et maillage interne." },
      { step: "04", title: "Production de contenu", description: "Rédaction de contenus optimisés pour le référencement." },
      { step: "05", title: "Netlinking", description: "Acquisition de liens qualifiés pour renforcer votre autorité." },
      { step: "06", title: "Suivi & reporting", description: "Rapports mensuels et ajustements continus de la stratégie." },
    ],
    pricing: [
      { name: "SEO Local", price: "590€/mois", description: "Pour dominer les recherches locales dans votre zone.", features: ["Optimisation Google Business Profile", "SEO local on-site", "Suivi de 10 mots-clés", "Rapport mensuel"] },
      { name: "SEO Croissance", price: "1 290€/mois", description: "Une stratégie complète pour développer votre trafic organique.", features: ["Audit technique complet", "Production de contenu mensuelle", "Netlinking qualifié", "Suivi de 30 mots-clés", "Reporting détaillé"], highlighted: true },
      { name: "SEO Entreprise", price: "Sur devis", description: "Pour les sites à fort volume ou marchés concurrentiels.", features: ["Stratégie multi-marchés", "SEO international", "Equipe dédiée", "Audit concurrentiel avancé"] },
    ],
    faq: [
      { question: "En combien de temps voit-on des résultats en SEO ?", answer: "Les premiers résultats apparaissent généralement entre 3 et 6 mois, avec une progression continue sur 12 mois." },
      { question: "Le SEO fonctionne-t-il pour tous les secteurs ?", answer: "Oui, chaque secteur a ses propres opportunités. Nous adaptons la stratégie à la concurrence et au volume de recherche de votre marché." },
      { question: "Faut-il aussi faire de la publicité en complément ?", answer: "Le SEO et le SEA sont complémentaires : la publicité apporte des résultats immédiats pendant que le SEO se construit sur la durée." },
    ],
    relatedProjectSlugs: ["vertego-immobilier", "greenfields-bio"],
  },
  {
    slug: "publicite-meta-google-ads",
    icon: "megaphone",
    name: "Publicité Meta & Google Ads",
    shortDescription: "Des campagnes publicitaires rentables, pilotées par la donnée.",
    heroDescription:
      "Nous concevons et pilotons vos campagnes Meta Ads et Google Ads pour générer des prospects et des ventes avec un retour sur investissement mesurable. Chaque euro investi est suivi, analysé et optimisé.",
    category: "Acquisition",
    benefits: [
      { title: "Résultats mesurables", description: "Un suivi précis du coût par lead et du retour sur investissement publicitaire." },
      { title: "Ciblage précis", description: "Des audiences finement segmentées pour toucher les bonnes personnes au bon moment." },
      { title: "Créations qui convertissent", description: "Des visuels et messages testés en continu pour maximiser la performance." },
      { title: "Scalabilité rapide", description: "Une fois la formule gagnante trouvée, nous augmentons les budgets en toute confiance." },
    ],
    methodology: [
      { title: "Structure de compte propre", description: "Une architecture de campagnes claire pour faciliter l'optimisation et le suivi." },
      { title: "Tests A/B continus", description: "Nous testons systématiquement créations, audiences et messages." },
      { title: "Suivi de conversion précis", description: "Mise en place d'un tracking fiable pour mesurer chaque action générée." },
      { title: "Optimisation hebdomadaire", description: "Ajustements réguliers des budgets vers les campagnes les plus performantes." },
    ],
    process: [
      { step: "01", title: "Audit & objectifs", description: "Définition des KPIs et analyse de l'historique publicitaire existant." },
      { step: "02", title: "Stratégie de campagne", description: "Choix des plateformes, audiences et formats adaptés à vos objectifs." },
      { step: "03", title: "Création des assets", description: "Production de visuels, vidéos et textes publicitaires percutants." },
      { step: "04", title: "Lancement & tracking", description: "Mise en ligne des campagnes et configuration du suivi de conversion." },
      { step: "05", title: "Optimisation continue", description: "Analyse des performances et ajustements réguliers pour maximiser le ROI." },
    ],
    pricing: [
      { name: "Lancement", price: "690€/mois", description: "Gestion de campagnes pour petit budget publicitaire.", features: ["1 plateforme (Meta ou Google)", "Budget publicitaire jusqu'à 1 500€/mois", "Reporting mensuel", "1 création publicitaire/mois"] },
      { name: "Performance", price: "1 490€/mois", description: "Gestion multi-plateformes pour une croissance soutenue.", features: ["Meta + Google Ads", "Budget publicitaire jusqu'à 5 000€/mois", "Tests A/B réguliers", "Reporting hebdomadaire", "Landing pages optimisées"], highlighted: true },
      { name: "Scale", price: "Sur devis", description: "Pour les budgets publicitaires importants et multi-marchés.", features: ["Stratégie multi-canaux avancée", "Budget illimité", "Equipe dédiée", "Optimisation quotidienne"] },
    ],
    faq: [
      { question: "Quel budget publicitaire minimum recommandez-vous ?", answer: "Nous recommandons un minimum de 800€ à 1 000€ de budget média mensuel pour obtenir des données exploitables rapidement." },
      { question: "Les honoraires incluent-ils le budget publicitaire ?", answer: "Non, nos honoraires de gestion sont distincts du budget publicitaire versé directement à Meta ou Google." },
      { question: "Combien de temps avant de voir des résultats ?", answer: "Les premières données significatives arrivent en 2 à 3 semaines, le temps d'optimiser le ciblage et les créations." },
    ],
    relatedProjectSlugs: ["lumina-cosmetics", "fitcoach-app"],
  },
  {
    slug: "marketing-digital",
    icon: "trending-up",
    name: "Marketing digital",
    shortDescription: "Une stratégie digitale globale et cohérente pour accélérer votre croissance.",
    heroDescription:
      "Nous élaborons une stratégie marketing digitale sur mesure qui combine acquisition, conversion et fidélisation. Notre approche relie tous vos canaux pour créer un système de croissance cohérent et mesurable.",
    category: "Stratégie",
    benefits: [
      { title: "Vision d'ensemble", description: "Une stratégie unifiée qui aligne site web, réseaux sociaux, SEO et publicité." },
      { title: "Priorisation claire", description: "Des actions hiérarchisées selon leur impact réel sur votre chiffre d'affaires." },
      { title: "Pilotage par la donnée", description: "Des décisions basées sur des indicateurs concrets, pas sur des intuitions." },
      { title: "Accompagnement continu", description: "Un partenaire stratégique disponible pour ajuster le cap à chaque étape." },
    ],
    methodology: [
      { title: "Analyse à 360°", description: "Étude de votre marché, vos concurrents, votre audience et vos canaux actuels." },
      { title: "Feuille de route priorisée", description: "Un plan d'action clair avec des priorités et des échéances réalistes." },
      { title: "Exécution coordonnée", description: "Une mise en œuvre cohérente entre tous les canaux marketing." },
      { title: "Mesure & itération", description: "Des points réguliers pour ajuster la stratégie selon les résultats obtenus." },
    ],
    process: [
      { step: "01", title: "Diagnostic digital", description: "État des lieux complet de votre présence et de vos performances actuelles." },
      { step: "02", title: "Stratégie sur mesure", description: "Définition des objectifs, cibles et canaux prioritaires." },
      { step: "03", title: "Plan d'action", description: "Feuille de route détaillée avec échéances et responsabilités." },
      { step: "04", title: "Mise en œuvre", description: "Déploiement coordonné des actions sur l'ensemble des canaux." },
      { step: "05", title: "Analyse & optimisation", description: "Suivi des KPIs et ajustements réguliers de la stratégie." },
    ],
    pricing: [
      { name: "Diagnostic", price: "990€", description: "Un audit complet et une feuille de route actionnable.", features: ["Audit digital à 360°", "Analyse concurrentielle", "Feuille de route priorisée", "Restitution en visioconférence"] },
      { name: "Accompagnement", price: "1 890€/mois", description: "Un pilotage stratégique continu de votre marketing digital.", features: ["Stratégie multicanale", "Pilotage mensuel", "Reporting détaillé", "Coordination des prestataires"], highlighted: true },
      { name: "Direction marketing externalisée", price: "Sur devis", description: "Une véritable direction marketing à temps partagé.", features: ["Stratégie complète", "Pilotage des équipes et prestataires", "Présence en comité de direction", "Reporting exécutif"] },
    ],
    faq: [
      { question: "Ce service remplace-t-il une équipe marketing interne ?", answer: "Il peut la compléter ou la remplacer partiellement, selon vos ressources internes et vos objectifs de croissance." },
      { question: "Travaillez-vous avec nos prestataires actuels ?", answer: "Oui, nous pouvons coordonner les prestataires existants ou recommander de nouveaux partenaires selon les besoins." },
      { question: "Quels résultats concrets puis-je attendre ?", answer: "Une feuille de route claire, des priorités définies et une amélioration mesurable de vos indicateurs de croissance." },
    ],
    relatedProjectSlugs: ["greenfields-bio", "vertego-immobilier"],
  },
  {
    slug: "automatisation",
    icon: "workflow",
    name: "Automatisation",
    shortDescription: "Gagnez des heures chaque semaine en automatisant vos tâches répétitives.",
    heroDescription:
      "Nous concevons des workflows automatisés qui connectent vos outils (CRM, emailing, facturation, réseaux sociaux) pour éliminer les tâches manuelles répétitives et réduire les erreurs humaines.",
    category: "Efficacité opérationnelle",
    benefits: [
      { title: "Gain de temps réel", description: "Des heures de travail manuel récupérées chaque semaine pour vous concentrer sur l'essentiel." },
      { title: "Réduction des erreurs", description: "Des processus fiables qui éliminent les oublis et les erreurs de saisie." },
      { title: "Réactivité accrue", description: "Des actions déclenchées instantanément dès qu'un événement se produit." },
      { title: "Outils connectés", description: "Une synchronisation fluide entre tous vos logiciels métier existants." },
    ],
    methodology: [
      { title: "Cartographie des process", description: "Identification des tâches répétitives à fort potentiel d'automatisation." },
      { title: "Priorisation par impact", description: "Sélection des automatisations offrant le meilleur retour sur temps investi." },
      { title: "Construction modulaire", description: "Des workflows construits par blocs, faciles à maintenir et à faire évoluer." },
      { title: "Documentation claire", description: "Chaque automatisation est documentée pour une autonomie totale de votre équipe." },
    ],
    process: [
      { step: "01", title: "Audit des process", description: "Identification des tâches manuelles chronophages dans votre organisation." },
      { step: "02", title: "Conception des workflows", description: "Modélisation des automatisations et des outils à connecter." },
      { step: "03", title: "Développement", description: "Construction et paramétrage des automatisations sur mesure." },
      { step: "04", title: "Tests & fiabilisation", description: "Vérification du bon fonctionnement dans tous les cas de figure." },
      { step: "05", title: "Formation & suivi", description: "Formation de votre équipe et ajustements post-déploiement." },
    ],
    pricing: [
      { name: "Quick Win", price: "790€", description: "Une automatisation ciblée pour un gain de temps immédiat.", features: ["1 workflow automatisé", "Connexion de 2 outils", "Documentation incluse", "Livraison sous 2 semaines"] },
      { name: "Suite automatisée", price: "2 490€", description: "Un ensemble de workflows connectés pour votre activité.", features: ["Jusqu'à 5 workflows", "Connexion multi-outils", "Alertes et notifications", "Formation de l'équipe"], highlighted: true },
      { name: "Système sur mesure", price: "Sur devis", description: "Une infrastructure d'automatisation complète et évolutive.", features: ["Architecture complète sur mesure", "Intégrations complexes", "Maintenance continue", "Support prioritaire"] },
    ],
    faq: [
      { question: "Quels outils pouvez-vous automatiser et connecter ?", answer: "La majorité des outils CRM, emailing, facturation, formulaires et réseaux sociaux disposant d'une API ou d'intégrations natives." },
      { question: "Faut-il des compétences techniques pour utiliser les automatisations ?", answer: "Non, nous concevons des systèmes autonomes et fournissons une documentation claire ainsi qu'une formation à votre équipe." },
      { question: "Que se passe-t-il si un outil change ou évolue ?", answer: "Nous assurons une maintenance pour adapter les workflows aux évolutions de vos outils connectés." },
    ],
    relatedProjectSlugs: ["fitcoach-app", "greenfields-bio"],
  },
  {
    slug: "intelligence-artificielle",
    icon: "brain",
    name: "Intelligence artificielle",
    shortDescription: "Intégrez l'IA à vos process pour gagner en productivité et en pertinence.",
    heroDescription:
      "Nous intégrons l'intelligence artificielle à votre activité : chatbots intelligents, génération de contenu assistée, analyse prédictive et outils internes sur mesure. Une IA utile, pas gadget.",
    category: "Innovation",
    benefits: [
      { title: "Productivité décuplée", description: "Des tâches complexes accélérées grâce à des outils IA sur mesure." },
      { title: "Service client augmenté", description: "Des assistants conversationnels disponibles 24h/24 pour vos clients." },
      { title: "Décisions éclairées", description: "Des analyses prédictives pour anticiper les tendances de votre marché." },
      { title: "Avantage concurrentiel", description: "Une longueur d'avance sur les entreprises qui n'ont pas encore intégré l'IA." },
    ],
    methodology: [
      { title: "Cas d'usage concrets", description: "Identification des applications IA à impact réel pour votre activité." },
      { title: "Prototypage rapide", description: "Un premier prototype testable en conditions réelles avant développement complet." },
      { title: "Intégration éthique", description: "Une utilisation transparente et responsable de l'intelligence artificielle." },
      { title: "Amélioration continue", description: "Des modèles affinés en continu grâce aux retours d'usage réels." },
    ],
    process: [
      { step: "01", title: "Identification des cas d'usage", description: "Analyse de vos process pour identifier le potentiel d'application de l'IA." },
      { step: "02", title: "Preuve de concept", description: "Développement d'un prototype fonctionnel pour valider l'approche." },
      { step: "03", title: "Développement", description: "Construction de la solution complète et intégration à vos outils." },
      { step: "04", title: "Tests & ajustements", description: "Validation des performances et affinage des résultats." },
      { step: "05", title: "Déploiement & formation", description: "Mise en production et formation de vos équipes à l'usage." },
    ],
    pricing: [
      { name: "Chatbot intelligent", price: "1 490€", description: "Un assistant conversationnel pour votre site ou vos réseaux.", features: ["Chatbot entraîné sur vos données", "Intégration site web", "Réponses personnalisées", "Tableau de suivi des conversations"] },
      { name: "Assistant sur mesure", price: "3 990€", description: "Un outil IA interne adapté à vos process métier.", features: ["Analyse de vos besoins spécifiques", "Développement sur mesure", "Intégration à vos outils existants", "Formation de l'équipe"], highlighted: true },
      { name: "Solution avancée", price: "Sur devis", description: "Des systèmes IA complexes pour des besoins spécifiques.", features: ["Analyse prédictive avancée", "Architecture IA complète", "Accompagnement continu", "Support dédié"] },
    ],
    faq: [
      { question: "L'IA peut-elle remplacer mon équipe actuelle ?", answer: "Notre philosophie est d'augmenter les capacités de vos équipes, pas de les remplacer : l'IA prend en charge les tâches répétitives pour libérer du temps à forte valeur ajoutée." },
      { question: "Mes données sont-elles utilisées pour entraîner des modèles tiers ?", answer: "Non, nous mettons en place des architectures respectueuses de la confidentialité de vos données, conformément au RGPD." },
      { question: "Faut-il déjà avoir des données structurées ?", answer: "Ce n'est pas obligatoire : nous pouvons vous accompagner dans la structuration de vos données en amont du projet." },
    ],
    relatedProjectSlugs: ["fitcoach-app", "atelier-orea"],
  },
  {
    slug: "creation-contenu",
    icon: "pen-line",
    name: "Création de contenu",
    shortDescription: "Des contenus qui informent, engagent et convertissent votre audience.",
    heroDescription:
      "Nous produisons des contenus écrits, visuels et vidéo qui renforcent votre autorité, nourrissent votre référencement et engagent votre audience à chaque étape de son parcours d'achat.",
    category: "Contenu & audience",
    benefits: [
      { title: "Autorité renforcée", description: "Des contenus experts qui positionnent votre marque comme référence de son secteur." },
      { title: "SEO nourri en continu", description: "Une production régulière qui alimente votre stratégie de référencement naturel." },
      { title: "Cohérence éditoriale", description: "Une ligne éditoriale claire respectée sur tous vos supports de communication." },
      { title: "Engagement mesurable", description: "Des contenus pensés pour générer interactions, partages et conversions." },
    ],
    methodology: [
      { title: "Ligne éditoriale définie", description: "Un cadre clair sur les sujets, le ton et les formats à privilégier." },
      { title: "Calendrier éditorial", description: "Une planification structurée pour une production régulière et cohérente." },
      { title: "Optimisation SEO intégrée", description: "Chaque contenu est pensé pour répondre aux intentions de recherche réelles." },
      { title: "Recyclage intelligent", description: "Un contenu décliné en plusieurs formats pour maximiser sa portée." },
    ],
    process: [
      { step: "01", title: "Stratégie éditoriale", description: "Définition de la ligne éditoriale et des thématiques prioritaires." },
      { step: "02", title: "Calendrier de contenu", description: "Planification des sujets, formats et canaux de diffusion." },
      { step: "03", title: "Production", description: "Rédaction, création visuelle ou tournage selon les formats choisis." },
      { step: "04", title: "Relecture & validation", description: "Contrôle qualité et validation avant publication." },
      { step: "05", title: "Diffusion & analyse", description: "Publication et suivi des performances de chaque contenu." },
    ],
    pricing: [
      { name: "Essentiel", price: "590€/mois", description: "Une production de contenu régulière pour démarrer.", features: ["4 articles de blog/mois", "Optimisation SEO incluse", "1 newsletter mensuelle"] },
      { name: "Complet", price: "1 190€/mois", description: "Une stratégie de contenu multi-format complète.", features: ["8 contenus/mois (blog + réseaux)", "Calendrier éditorial", "Visuels inclus", "Reporting mensuel"], highlighted: true },
      { name: "Studio dédié", price: "Sur devis", description: "Une équipe éditoriale dédiée à votre marque.", features: ["Production illimitée", "Vidéo et podcast", "Stratégie de contenu avancée", "Equipe dédiée"] },
    ],
    faq: [
      { question: "Qui rédige les contenus ?", answer: "Une équipe de rédacteurs spécialisés par secteur d'activité, en lien étroit avec votre expertise métier." },
      { question: "Puis-je valider les contenus avant publication ?", answer: "Oui, chaque contenu vous est soumis pour relecture et validation avant sa mise en ligne." },
      { question: "Le contenu m'appartient-il totalement ?", answer: "Oui, tous les contenus produits vous appartiennent intégralement, sans restriction d'usage." },
    ],
    relatedProjectSlugs: ["greenfields-bio", "lumina-cosmetics"],
  },
  {
    slug: "community-management",
    icon: "users",
    name: "Community management",
    shortDescription: "Une présence sociale vivante qui fidélise votre audience au quotidien.",
    heroDescription:
      "Nous gérons vos réseaux sociaux au quotidien : création de contenu, animation de communauté, modération et reporting. Une présence sociale professionnelle qui construit une vraie relation avec votre audience.",
    category: "Contenu & audience",
    benefits: [
      { title: "Présence quotidienne", description: "Une animation régulière qui maintient votre marque visible et vivante." },
      { title: "Communauté engagée", description: "Une relation de proximité construite avec vos abonnés au fil du temps." },
      { title: "Image professionnelle", description: "Une modération soignée qui protège la réputation de votre marque." },
      { title: "Veille concurrentielle", description: "Une lecture continue des tendances et des mouvements de votre secteur." },
    ],
    methodology: [
      { title: "Charte éditoriale sociale", description: "Un ton de voix défini et adapté à chaque plateforme utilisée." },
      { title: "Calendrier de publication", description: "Une programmation régulière alignée aux temps forts de votre activité." },
      { title: "Animation active", description: "Réponses aux commentaires et messages dans des délais courts et professionnels." },
      { title: "Analyse de performance", description: "Un suivi des indicateurs clés pour ajuster la stratégie de contenu." },
    ],
    process: [
      { step: "01", title: "Audit social", description: "Analyse de votre présence actuelle et de celle de vos concurrents." },
      { step: "02", title: "Stratégie de contenu", description: "Définition des piliers de contenu et du calendrier éditorial." },
      { step: "03", title: "Production & publication", description: "Création des visuels, légendes et publication selon le calendrier." },
      { step: "04", title: "Animation & modération", description: "Gestion des interactions avec votre communauté au quotidien." },
      { step: "05", title: "Reporting mensuel", description: "Analyse des performances et recommandations d'ajustement." },
    ],
    pricing: [
      { name: "Présence", price: "490€/mois", description: "Une gestion simple pour rester actif et visible.", features: ["2 réseaux sociaux", "12 publications/mois", "Modération en journée", "Reporting mensuel"] },
      { name: "Engagement", price: "990€/mois", description: "Une animation complète pour développer votre communauté.", features: ["3 réseaux sociaux", "20 publications/mois", "Stories et formats courts", "Veille concurrentielle", "Reporting détaillé"], highlighted: true },
      { name: "Immersion totale", price: "Sur devis", description: "Une présence sociale premium multi-plateformes.", features: ["Réseaux illimités", "Production vidéo incluse", "Community manager dédié", "Modération étendue"] },
    ],
    faq: [
      { question: "Sur quels réseaux sociaux intervenez-vous ?", answer: "Instagram, Facebook, LinkedIn, TikTok et Pinterest, selon les canaux les plus pertinents pour votre audience." },
      { question: "Qui répond aux messages de mes clients ?", answer: "Notre équipe assure une modération professionnelle avec des éléments de réponse validés en amont avec vous." },
      { question: "Puis-je valider les publications avant leur mise en ligne ?", answer: "Oui, un calendrier de contenu vous est soumis chaque mois pour validation avant publication." },
    ],
    relatedProjectSlugs: ["lumina-cosmetics", "fitcoach-app"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
