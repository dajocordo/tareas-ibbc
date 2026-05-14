import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule
import { SelectButtonModule } from 'primeng/selectbutton';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { SelectModule } from 'primeng/select';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { ApiService } from './services/api.service';
import { DateService } from './services/date.service';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    SelectButtonModule,
    AccordionModule,
    TagModule,
    SelectModule,
    AvatarModule,
    TableModule,
    BadgeModule,
    IftaLabelModule
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  public api = inject(ApiService);
  public dateService = inject(DateService);
  title = 'tareas-ibbc';
  tituloActual: string = 'tareas';
  iconoActual: string = 'pi pi-list-check';
  value: string = 'tareas';
  tabValue: string = 'tareas';
  activeTab: number = 1;
  selectedTarea: number = 0;
  selectedMateria: string = 'materia#0';
  selectedFecha: number = 1;
  items = []
  fechaActual = new Date();

  /* ===== MAPAS PARA BÚSQUEDAS RÁPIDAS O(1) ===== */
  companeroMap: Map<string, any> = new Map();  /* Mapa string ID → Compañero (foto, apodo) */
  materiaMap: Map<string, any> = new Map();    /* Mapa string ID → Materia (name, severity) */

  get materias() {
    return this.api.materias()
      .slice()
      .sort((a: any, b: any) => {
        const parseId = (id: string) => Number(id.replace(/^materia#/, ''));
        return parseId(a.id) - parseId(b.id);
      });
  }

  fechas = [
    { id: 0, severity: '', name: 'Todas' },
    { id: 1, severity: '', name: 'Futuras' },
    { id: 2, severity: '', name: 'Pasadas' }
  ];

  activityOptions = [
    { texto: 'tareas', value: 1 },
    { texto: 'expo', value: 2 },
    { texto: 'predicas', value: 3 },
    { texto: 'otros', value: 4 },
  ]

  menuItems: MenuItem[] | undefined;

  get hoy() {
    return this.dateService.hoy();
  }

  get examenes() {
    return this.api.examenes();
  }

  get tareas() {
    return this.api.tareas()
      .slice()
      .sort((a, b) => this.compareByDateAsc(a, b));
  }

  get expos() {
    return this.api.expos()
      .slice()
      .sort((a, b) => {
        const fechaCmp = this.compareByDateAsc(a, b);
        if (fechaCmp === 0) {
          return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
        }
        return fechaCmp;
      });
  }

  get predicas() {
    return this.api.predicas();
  }

  tareasFiltered: any[] = [];
  exposFiltered: any[] = [];
  examenFiltered: any[] = [];
  predicasFiltered: any[] = [];

  formatearFechas(dateStr: string) {
    //return 'siu';
    return this.dateService.transformarFechaApi(dateStr);
  }

  private normalizeCompaneroId(id: number | string): string {
    return typeof id === 'number' ? `compa#${id}` : String(id);
  }

  private normalizeMateriaId(id: number | string): string {
    return typeof id === 'number' ? `materia#${id}` : String(id);
  }

  private buildLookups() {
    this.companeroMap = new Map(
      this.api.companeros().map((compa: any) => [String(compa.id), compa])
    );
    this.materiaMap = new Map(
      this.api.materias().map((materia: any) => [String(materia.id), materia])
    );
  }


  async ngOnInit() {
    await Promise.all([
      this.api.getResource('materias'),
      this.api.getResource('companeros'),
      this.api.getResource('predicas'),
      this.api.getResource('examenes'),
      this.api.getResource('expo'),
      this.api.getResource('tareas')
    ]);
    this.buildLookups();
    this.onMenuClick(1);
    this.menuItems = [
      {
        label: 'Tareas',
        icon: 'pi pi-list-check',
        value: 1,
        command: () => this.onMenuClick(1)
      },
      {
        label: 'Expos',
        icon: 'pi pi-users',
        value: 2,
        command: () => this.onMenuClick(2)
      },
      {
        label: 'Predicas',
        icon: 'pi pi-microphone',
        value: 3,
        command: () => this.onMenuClick(3)
      },
      {
        label: 'Examen',
        icon: 'pi pi-file',
        value: 4,
        command: () => this.onMenuClick(4)
      }
    ];
    this.selectedMateria = this.materias[0].id;
    this.filtrarTodo();
  }

  onMenuClick(value: number) {
    const texto: any = {
      1: 'tareas',
      2: 'expo',
      3: 'predicas',
      4: 'examenes'
    }
    const iconos: any = {
      1: 'pi pi-list-check',
      2: 'pi pi-users',
      3: 'pi pi-microphone',
      4: 'pi pi-file'
    };
    this.tituloActual = texto[value] ?? '';
    this.tabValue = this.tituloActual;
    this.activeTab = value;
    this.iconoActual = iconos[value] ?? '';
  }

  getFoto(id: number) {
    console.log(this.normalizeCompaneroId(id));
    return this.companeroMap.get(this.normalizeCompaneroId(id))?.foto ?? '';
  }

  getNombre(id: number) {
    console.log(this.normalizeCompaneroId(id));
    return this.companeroMap.get(this.normalizeCompaneroId(id))?.nombre ?? '';
  }

  getMateriaName(id: number | string) {
    const normalized = this.normalizeMateriaId(id);
    /* Intenta buscar con clave normalizada primero, luego solo con el número */
    let result = this.materiaMap.get(normalized);
    if (!result && typeof id === 'string' && id.includes('#')) {
      const numOnly = id.split('#')[1];
      result = this.materiaMap.get(numOnly);
    }
    return result?.nombre ?? '';
  }

  getMateriaColor(id: number | string) {
    const normalized = this.normalizeMateriaId(id);
    /* Intenta buscar con clave normalizada primero, luego solo con el número */
    let result = this.materiaMap.get(normalized);
    if (!result && typeof id === 'string' && id.includes('#')) {
      const numOnly = id.split('#')[1];
      result = this.materiaMap.get(numOnly);
    }
    return result?.severity ?? '';
  }

  getAccordionStyle(index: number) {
    return {
      'background-color': index % 2 === 0 ? '#f8f9fa' : '#ffffff'
    };
  }

  onSelectionChange(event: any) {
    console.log('Pestaña seleccionada:', this.tabValue);
    console.log('Pestaña seleccionada:', this.value);
    console.log('Pestaña seleccionada:', event.value);
    console.log('probando');
    this.tabValue = event.value.texto ?? '';
  }

  filtrarTodo() {
    const filtrarTareas = this.filtrarPorMateria(this.tareas);
    const filtrarExpos = this.filtrarPorMateria(this.expos);
    const filtrarExamen = this.filtrarPorMateria(this.examenes);
    const filtrarTareas2 = this.filtrarPorFecha(filtrarTareas);
    const filtrarExamen2 = this.filtrarPorFecha(filtrarExamen);
    const filtrarExpos2 = this.filtrarPorFecha(filtrarExpos);
    const filtrarPredicas = this.filtrarPorFecha(this.predicas);
    this.examenFiltered = filtrarExamen2
      .slice()
      .sort((a, b) => this.compareByDateAsc(a, b))
      .map(item => this.updateMateriaSeverity(item));
    this.tareasFiltered = filtrarTareas2
      .slice()
      .sort((a, b) => this.compareByDateAsc(a, b))
      .map(item => this.updateMateriaSeverity(item));
    this.predicasFiltered = filtrarPredicas
      .slice()
      .sort((a, b) => this.compareByDateAsc(a, b))
      .map((item: any) => ({
        ...item,
        ...this.updateMateriaSeverity(item),
        ...this.integrateFotoWithName(item)
      }));
    console.log(this.predicasFiltered)
    this.exposFiltered = filtrarExpos2.map((expo: any) =>
    ({
      ...expo,
      ...this.updateMateriaSeverity(expo),
      integrantes: expo.integrantes.map((item: any) => this.integrateFotoWithName(item)),
    })
    );
    console.log("expos");
    console.log(this.exposFiltered);
  }

  onFechaChange(event: any) {
    this.filtrarTodo();
  }

  onMateriaChange(event: any) {
    this.filtrarTodo();
  }


  updateMateriaSeverity(item: any) {
    /* Soporta ambos formatos: API (materia string) y local (materiaCod número) */
    const materiaId = item.materia || this.normalizeMateriaId(item.materiaCod);
    return {
      ...item,
      materia: this.getMateriaName(materiaId),
      severity: this.getMateriaColor(materiaId),
    };
  }


  integrateFotoWithName(item: any) {
    return {
      ...item,
      foto: this.getFoto(item.compa),
      compa: this.getNombre(item.compa)
    };
  }

  private compareByDateAsc(a: any, b: any): number {
    const parse = (item: any) => {
      const dateStr = item.dateFormatted ?? '';
      const time = Date.parse(dateStr);
      return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
    };

    return parse(a) - parse(b);
  }

  private filtrarPorFecha(lista: any[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.selectedFecha === 0
      ? lista
      : lista.filter(a => {
        const activityDate = new Date(a.dateFormatted);
        activityDate.setHours(0, 0, 0, 0);
        if (this.selectedFecha === 1) {
          return activityDate >= today; // Futuras (incluye hoy)
        } else {
          return activityDate < today; // Pasadas (antes de hoy)
        }
      });
  }

  private filtrarPorMateria(lista: any[]) {
    return this.selectedMateria === 'materia#0'
      ? lista
      : lista.filter(a => {
        /* Soporta ambos formatos: API (materia string) y local (materiaCod número) */
        if (a.materia) {
          return a.materia === this.selectedMateria;
        }
        return this.normalizeMateriaId(a.materiaCod) === this.selectedMateria;
      });
  }



}
