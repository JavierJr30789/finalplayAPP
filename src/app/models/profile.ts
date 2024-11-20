export interface Profile {
  uid: any;
  displayName: string;
  email: string;
  photoURL?: string;
  description?: string;
  birthDate?: Date;
  role?: string;
  country?: string;  // Ahora es un campo separado
  city?: string;     // Ahora es un campo separado
}
