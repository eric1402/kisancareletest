export type Feature = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

export const flagshipFeatures: Feature[] = [
  {
    id: "weather",
    emoji: "🌦️",
    title: "Weather",
    description:
      "Real-time weather information and farming-relevant conditions, so you know the right day to sow, spray or harvest.",
  },
  {
    id: "crops",
    emoji: "🌱",
    title: "My Crops",
    description:
      "Track every crop, its current stage and the farming activities that matter this week — all in one simple view.",
  },
  {
    id: "soil",
    emoji: "🧪",
    title: "Soil Health",
    description:
      "Understand soil parameters such as nitrogen, phosphorus, potassium, pH and organic carbon in plain language.",
  },
  {
    id: "mandi",
    emoji: "💰",
    title: "Mandi Prices",
    description:
      "See relevant market prices near you and decide with confidence when and where to sell your produce.",
  },
];

export const supportingFeatures: Feature[] = [
  {
    id: "ai",
    emoji: "🤖",
    title: "AI Kisan Assistant",
    description: "Ask farming questions naturally and get easy-to-understand answers.",
  },
  {
    id: "disease",
    emoji: "📸",
    title: "Crop Disease Detector",
    description: "Upload a crop image and identify possible diseases or problems.",
  },
  {
    id: "calendar",
    emoji: "📅",
    title: "Crop Calendar",
    description: "Track important activities and crop stages through the season.",
  },
  {
    id: "schemes",
    emoji: "🏛️",
    title: "Government Schemes",
    description: "Discover agriculture schemes you may be eligible for.",
  },
  {
    id: "store",
    emoji: "🏪",
    title: "Kisan Store",
    description: "Find nearby government or private agricultural stores.",
  },
  {
    id: "community",
    emoji: "👥",
    title: "Farmer Community",
    description: "Connect with other farmers and share what works.",
  },
  {
    id: "guide",
    emoji: "📚",
    title: "Farming Guide",
    description: "Simple farming information and practical guidance.",
  },
];

export const trustChips = [
  { emoji: "🌦️", label: "Weather" },
  { emoji: "🌱", label: "Crops" },
  { emoji: "🧪", label: "Soil" },
  { emoji: "💰", label: "Mandi" },
  { emoji: "🏛️", label: "Schemes" },
  { emoji: "📚", label: "Guidance" },
];

export const steps = [
  {
    step: "01",
    emoji: "🧑‍🌾",
    title: "Create your farm profile",
    description: "Add your village, land size and the crops you grow. It takes two minutes.",
  },
  {
    step: "02",
    emoji: "📡",
    title: "Get personalised insights",
    description: "Weather, soil, crop stage and mandi prices come together for your farm.",
  },
  {
    step: "03",
    emoji: "💡",
    title: "Ask anything, anytime",
    description: "The AI Kisan Assistant answers in simple language, in your words.",
  },
  {
    step: "04",
    emoji: "✅",
    title: "Take action with confidence",
    description: "Clear next steps for irrigation, spraying, harvesting and selling.",
  },
];

export const benefits = [
  {
    emoji: "🕒",
    title: "Less searching, more farming",
    description: "One place instead of ten apps, phone calls and WhatsApp forwards.",
  },
  {
    emoji: "🗣️",
    title: "Simple language",
    description: "No jargon. Advice written the way a farmer actually talks.",
  },
  {
    emoji: "📶",
    title: "Built for real villages",
    description: "Light pages, large text and big buttons that work on any phone.",
  },
  {
    emoji: "🤝",
    title: "Trustworthy guidance",
    description: "Advice grounded in your own farm data, not generic internet tips.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Farmers", href: "#farmers" },
  { label: "About", href: "#about" },
];

export const aiMock = {
  question: "Mere wheat ke leaves yellow ho rahe hain, kya problem ho sakti hai?",
  contextChips: [
    { label: "Soil N: Low (241 kg/ha)", tone: "warn" as const },
    { label: "Crop: Wheat · Tillering", tone: "neutral" as const },
    { label: "Rain: 18mm last 3 days", tone: "neutral" as const },
    { label: "Soil pH: 7.8", tone: "neutral" as const },
  ],
  causes: [
    "Nitrogen ki kami — aapki soil report mein nitrogen low hai.",
    "Zyada paani se jad tak hawa nahi pahunch rahi (waterlogging).",
    "Tillering stage par top dressing abhi tak nahi hui.",
  ],
  recommendation: {
    title: "Recommended action",
    body: "Khet sookhne ke baad 40 kg/acre urea top dressing karein. Paani ki nikasi theek karein aur 7 din baad patton ka rang dobara dekhein.",
    tag: "Do this within 5 days",
  },
};

export const diseaseMock = {
  fileName: "wheat-leaf-north-plot.jpg",
  disease: "Wheat Leaf Rust (Puccinia triticina)",
  confidence: 92,
  severity: "Early stage · treatable",
  action:
    "Affected patch par Propiconazole 25% EC (1 ml per litre paani) ka spray karein. 12 din baad dobara check karein aur khet mein hawa ka flow banaye rakhein.",
};
