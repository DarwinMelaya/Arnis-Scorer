export const SPORT_CARDS = [
  {
    id: "arnis",
    title: "Arnis Scoring System",
    description:
      "Professional real-time scoring management for Arnis competitions",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 4l-6 6m0 0l-6-6m6 6v12"
      />
    ),
    gradient: "from-red-600 to-red-800",
    hoverGradient: "hover:from-red-700 hover:to-red-900",
    shadow: "shadow-red-500/20 hover:shadow-red-500/40",
  },
  {
    id: "billiard",
    title: "Billiard Scoring System",
    description:
      "Professional real-time scoring management for Billiard matches",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      </>
    ),
    gradient: "from-green-600 to-green-800",
    hoverGradient: "hover:from-green-700 hover:to-green-900",
    shadow: "shadow-green-500/20 hover:shadow-green-500/40",
  },
];
