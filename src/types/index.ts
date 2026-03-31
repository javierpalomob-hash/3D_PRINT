// ============================================
// PRINT3D BADALONA — Tipos TypeScript
// ============================================

// --- Materiales ---
export type MaterialId = 'pla' | 'petg' | 'tpu' | 'asa' | 'otro'

export interface Material {
  id: MaterialId
  nombre: string
  descripcion: string
  usos: string[]
  resistenciaTermica: string
  resistenciaMecanica: string
  precio: 'económico' | 'medio' | 'medio-alto' | 'alto'
  disponible: boolean
}

// --- Formulario de Presupuesto ---
export type ModalidadEntrega = 'recogida' | 'envio'

export interface PresupuestoForm {
  nombre: string
  email: string
  telefono?: string
  descripcion: string
  material: MaterialId
  cantidad: number
  modalidad: ModalidadEntrega
  fechaDeseada?: string
  archivo?: File
}

// --- Testimonios ---
export interface Testimonio {
  id: number
  nombre: string
  ciudad: string
  texto: string
  valoracion: 1 | 2 | 3 | 4 | 5
  fecha: string
}

// --- FAQ ---
export interface PreguntaFrecuente {
  id: number
  pregunta: string
  respuesta: string
}

// --- Galería ---
export type CategoriaGaleria =
  | 'todos'
  | 'decoracion'
  | 'industrial'
  | 'prototipos'
  | 'coleccionables'
  | 'hogar'
  | 'otros'

export interface PiezaGaleria {
  id: string
  titulo: string
  descripcion?: string
  categoria: CategoriaGaleria
  material: MaterialId
  imagen: string
  destacado?: boolean
}

// --- Servicio ---
export interface Servicio {
  id: string
  titulo: string
  descripcion: string
  icono: string
  features: string[]
}

// --- API Responses ---
export interface ApiResponse<T = void> {
  success: boolean
  message: string
  data?: T
  error?: string
}
