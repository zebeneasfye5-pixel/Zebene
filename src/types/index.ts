export type LanguageCode =
  | 'am' // Amharic (አማርኛ)
  | 'om' // Afaan Oromoo
  | 'ti' // Tigrinya (ትግርኛ)
  | 'en' // English
  | 'fr' // French
  | 'zh' // Chinese
  | 'ar' // Arabic
  | 'de'; // German

export type HouseCategory = 'global' | 'regional' | 'wereda_kebele';

export interface UserProfile {
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  nationality: string;
  flag: string;
  countryCode: string;
  address: {
    city: string;
    region: string;
    wereda: string;
    kebele: string;
  };
  officialId: string;
  idType: 'Fayda National ID' | 'Passport' | 'Kebele Resident ID' | 'Gov Official ID';
  idDocumentUrl?: string; // Uploaded ID doc image or verification token
  photoUrl: string;
  profession: string; // Mandatory current Profession/Occupation
  houseSpecificRole: string; // Specific Role/Status within designated house
  // Mandatory for House 3 (የባለስልጣን ቤት)
  officialRank?: string; // e.g. Minister, State Minister, Commissioner, Ambassador, Director General
  officialTitle?: string; // e.g. H.E. Minister of Innovation, Plenipotentiary Envoy
  commandGrade?: string; // e.g. Grade 1 Executive Command, Grade 2 Senior Ministerial
  // Mandatory for House 7 (የደህንነት አስጠባቂ ቤት)
  securityCredentialId?: string; // Law Enforcement / Security Badge ID
  securityCredentialUrl?: string; // Uploaded Credential Document
  isRegistered: boolean;
}

export interface VirtualSeat {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  nationality: string;
  countryCode: string;
  flag: string;
  idContext: string;
  avatarUrl: string;
  role: 'Founder' | 'Host' | 'Speaker' | 'Delegate' | 'Judge' | 'Citizen' | 'Audience' | 'Trainer' | 'Trainee';
  profession?: string;
  isMicActive: boolean;
  isVideoActive: boolean;
  isSpeaking?: boolean;
  handRaised?: boolean;
  isLocalUser?: boolean;
}

export interface House {
  id: number;
  houseNumber: number; // 1 to 15
  category: HouseCategory;
  amharicTitle: string; // Primary Title: 1.25rem (20px), font-weight: 600, color: #FFFFFF
  englishSubtitle: string; // Secondary Subtitle: 0.875rem (14px), font-weight: 400, color: #9CA3AF
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  accentColor: string;
  tags: string[];
  maxChairs?: number;
  isLive: boolean;
  activeLanguage: LanguageCode;
  sandboxHash: string; // internal sandbox token
  specialModuleType:
    | 'onboarding'
    | 'genealogy'
    | 'sovereign_governance'
    | 'couples_sanctuary'
    | 'wedding'
    | 'faith'
    | 'security'
    | 'talent_show'
    | 'commerce'
    | 'ai_academy'
    | 'institutional_training'
    | 'counseling'
    | 'brokerage'
    | 'judiciary'
    | 'utility_equb';
}

export interface RevenueSplitResult {
  grossAmount: number;
  currency: 'ETB' | 'USD';
  userEarnings: number; // 80% to User Wallet
  bankSavings: number; // 10% to Bank Savings Yield
  devCommission: number; // 10% Developer Commission to Zebene Asfaye (Sovereign Settlement Vault)
  paymentGateway: 'Chapa' | 'CBE' | 'Stripe' | 'PayPal';
  transactionId: string;
  timestamp: string;
  houseId: number;
  donorName: string;
  purpose: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
  isTranslated?: boolean;
  sourceLang?: LanguageCode;
}

// Wedding Hall Specific Contract with Complete Legal Architecture
export interface WeddingContract {
  groomName: string;
  brideName: string;
  weddingDate: string;
  civilRegistryNumber: string;
  groomsmen: string[]; // የወንድ ሚዜዎች
  bridesmaids: string[]; // የሴት ሚዜዎች
  groomParents: string; // የተጋቢው ተጠሪ አባት/አሳዳጊ
  brideParents: string; // የተጋቢዋ ተጠሪ አባት/አሳዳጊ
  witnesses: [string, string, string]; // exactly 3 Witnesses (ምስክሮች)
  witnessIds: [string, string, string];
  elderPresiding: string;
  legalArticles: string[]; // Ethiopian Revised Family Code Articles 1-40 & International Civil Codes
  locationCoordinates: string; // e.g. Lat: 9.0320° N, Long: 38.7480° E, Virtual Node ETH-ADD-2026
  biometricReady: boolean;
  isSigned: boolean;
  brideSignature?: string;
  groomSignature?: string;
  witnessSignatures: [string, string, string];
  issuedAt: string;
}

// Judiciary Court Decree
export interface JudicialDecree {
  decreeNumber: string;
  caseTitle: string;
  claimantName: string;
  respondentName: string;
  verdictSummary: string;
  presidingJudge: string;
  isEnforced: boolean;
  issuedDate: string;
}
