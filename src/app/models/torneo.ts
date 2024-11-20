export interface Torneo {
  id?: string; // ID autogenerado al guardar en Firebase
  nombre: string; // Nombre del torneo
  descripcion: string; // Descripción del torneo
  fotoTorneoUrl: string; // URL de la foto del torneo
  cantidadEP: number; // Cantidad de equipos (4, 8, 16, etc.)
  equipos: Equipo[]; // Lista de equipos con sus nombres y fotos
  fixture?: Partido[]; // Un arreglo bidimensional para almacenar las rondas y partidos
}

export interface Equipo {
  nombre: string; // Nombre del equipo
  fotoEquipoUrl: string; // URL de la foto del equipo
}

export interface Cruce {
  equipo1: Equipo;
  equipo2: Equipo;
}

export interface Partido {
  equipo1: string;
  equipo2: string;
  resultado?: string;  // Puede ser opcional hasta que el partido se juegue
  equipo1FotoUrl: string;  // Agregar este campo
  equipo2FotoUrl: string;  // Agregar este campo
}