export interface Profile {
    displayName: string;
    email: string;
    photoURL?: string;
    description?: string;
    birthDate?: Date;
    role?: string;
    location?: {
      country: string;
      city: string;
    };
  }
  