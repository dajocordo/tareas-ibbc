import { Injectable, inject, LOCALE_ID, signal } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private readonly locale = inject(LOCALE_ID);

  // El Signal se inicializa correctamente porque 'locale' ya fue inyectado
  readonly hoy = signal(formatDate(new Date(), 'yyyy-MM-dd', this.locale));

  // Ya no necesitas constructor para inyectar 'locale'
  constructor() {
    // Si necesitas hacer algo más al iniciar el servicio, lo pones aquí.
    // Si no, puedes borrar el constructor.
  }
  /**
   * Convierte "2026-11-25" -> "mié, 25 nov"
   * Ideal para mostrar fechas en interfaces de tareas o actividades académicas.
   * 
   */

  transformarFechaApi(fechaIso: string): string {
    if (!fechaIso) return '';

    // El 'T00:00:00' es vital para que no te reste un día por la zona horaria de SV (UTC-6)
    const fechaObjeto = new Date(fechaIso + 'T00:00:00');

    // 'EEE, dd MMM' nos da el formato: "mié., 25 nov."
    const resultado = formatDate(fechaObjeto, 'EEE, dd MMM', this.locale);

    // Limpieza: pasamos a minúsculas y quitamos los puntos de las abreviaturas (ej. mié. -> mié)
    return resultado.toLowerCase().replace(/\./g, '');
  }


}