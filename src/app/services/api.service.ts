import { Injectable, inject, signal } from '@angular/core'; // <-- Añade 'inject' aquí
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://bmyxynn762.execute-api.us-east-1.amazonaws.com/';

  materias = signal<any[]>([]);
  examenes = signal<any[]>([]);
  companeros = signal<any[]>([]);
  predicas = signal<any[]>([]);
  expos = signal<any[]>([]);
  tareas = signal<any[]>([]);
  loading = signal<boolean>(false);
  
  constructor() { }

  async getResource(endpoint: 'materias' | 'companeros' | 'predicas' | 'examenes' | 'expo' | 'tareas'): Promise<void> {
    this.loading.set(true);
    try {
      // 1. Tipamos la respuesta como 'any' para acceder a .data sin errores de TS
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/${endpoint}`)
      );

      // 2. Extraemos el array que viene dentro de la propiedad 'data'
      const listaExtraida = response.data || [];

      //console.log(`Datos obtenidos de ${endpoint}:`, listaExtraida);

      // 3. Guardamos solo el array en la Signal
      if (endpoint === 'materias') {
        this.materias.set(listaExtraida);
      } else if (endpoint === 'companeros') {
        this.companeros.set(listaExtraida);
      } else if (endpoint === 'predicas') {
        this.predicas.set(listaExtraida);
      } else if (endpoint === 'tareas') {
        this.tareas.set(listaExtraida);
      } else if (endpoint === 'expo') {
        this.expos.set(listaExtraida);
      } else if (endpoint === 'examenes') {
        this.examenes.set(listaExtraida);
      }

    } catch (error) {
      console.error(`Error al obtener ${endpoint}:`, error);
    } finally {
      this.loading.set(false);
    }
  }



}