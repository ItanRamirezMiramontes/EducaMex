export interface User {
    uid: string;
    name: string;
    lastName1?: string;
    lastName2?: string;
    email: string;
    phone?: string;
    role: string;
    profilePicture?: string;
    status?: string;
    institutionId: string;
    institutionName?: string; // <-- NUEVA PROPIEDAD
    createdAt?: string | null;
    lastLogin?: string | null;
    address?: string;
    city?: string;
    state?: string;
    street?: string;
    zip?: string;
  }
  