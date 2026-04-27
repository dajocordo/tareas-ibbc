import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { SelectModule } from 'primeng/select';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MenubarModule,
    FormsModule,
    SelectButtonModule,
    AccordionModule,
    TagModule,
    SelectModule,
    AvatarModule,
    TableModule,
    BadgeModule
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'tareas-ibbc';
  value: string = 'tareas';
  tabValue: string = 'tareas';
  activeTab: string = 'tareas';
  selectedValue: number = 0;
  selectedMateria: number = 0;
  items = []

  materias = [
    { id: 0, severity: '', name: 'Todas' },
    { id: 1, severity: 'success', name: 'Panorama NT' },
    { id: 2, severity: 'danger', name: 'Liderazgo' },
    { id: 3, severity: 'info', name: 'Homiletica I' },
    { id: 4, severity: 'secondary', name: 'Teologia I' },
  ];

  activityOptions = [
    { texto: 'tareas', value: 1 },
    { texto: 'expo', value: 2 },
    { texto: 'predicas', value: 3 },
    { texto: 'otros', value: 4 },
  ]

  examenes: any[] = [
    {
      id: 1,
      titulo: 'Examen # 1',
      materiaCod: 1,
      date: 'lun, 04 may',
      tipo: 1
    },
    {
      id: 2,
      titulo: 'Examen # 1',
      materiaCod: 2,
      date: 'mar, 05 may',
      tipo: 1
    },
    {
      id: 3,
      titulo: 'Examen # 2',
      materiaCod: 1,
      date: 'lun, 01 jun',
      tipo: 1
    },
    {
      id: 4,
      titulo: 'Examen # 2',
      materiaCod: 2,
      date: 'mar, 02 jun',
      tipo: 1
    },
  ]

  activities: any[] = [
    {
      id: 1,
      titulo: 'Tarea # 1',
      preview: 'Cuestionario Hom.',
      materiaCod: 3,
      detalles: 'Cuestionario Homiletica & Oratoria: Descargue el recurso de lectura y elabore su primera tarea',
      date: 'jue, 16 abr',
      tipo: 1
    },
    {
      id: 2,
      titulo: 'Tarea # 1',
      preview: 'Intertestamentario',
      materiaCod: 1,
      detalles: 'Investigar los sucesos más importantes del periodo intertestamentario (400 años de silencio)',
      date: 'lun, 20 abr',
      tipo: 1
    },
    {
      id: 3,
      titulo: 'Tarea # 1',
      preview: 'El Plan Ministerial',
      materiaCod: 2,
      detalles: 'Elaborar su plan ministerial que incluya: misión y visión personal, sueños, metas y compromisos ministeriales.',
      date: 'mar, 21 abr',
      tipo: 1
    },
    {
      id: 35,
      titulo: 'Guia # 1',
      preview: 'Teologia Sistematica',
      materiaCod: 4,
      detalles: 'Comprender qué es la teología sistemática, por qué es importante para la vida cristiana y cuál es su relación con la doctrina bíblica. \n\ \n\ • Introducción del libro de Stanley Horton \n\ • Apuntes de clase \n\ \n\  Responda de forma breve pero clara: \n\ \n\ ¿Qué es la teología sistemática? \n\ ¿Por qué la doctrina sana es importante para la Iglesia? \n\ ¿Qué peligros enfrenta una iglesia que descuida la doctrina? \n\ ¿Cuál debe ser la relación entre doctrina y vida espiritual?',
      date: 'mie, 22 abr',
      tipo: 1
    },
    {
      id: 4,
      titulo: 'Tarea # 1',
      preview: 'Cuadro comparativo',
      materiaCod: 4,
      detalles: 'El estudiante elaborará un cuadro comparativo entre la doctrina de las Asambleas de Dios y la doctrina de otras dos corrientes o denominaciones presentes en el contexto actual.\n\ Puede elegir, por ejemplo:\n\ -Iglesia Católica Romana\n\ - Testigos de Jehová\n\ - Mormones\n\ - Iglesia de la Unicidad\n\ - Adventistas\n\ - otra corriente doctrinal relevante\n\ \n\ Considerando temas como:\n\ - La Biblia\n\ - Dios\n\ - Jesucristo\n\ - La Trinidad\n\ - La salvación\n\ - El Espíritu Santo\n\ - La Iglesia\n\ - Observaciones doctrinales finales\n\ \n\ Extensión:\n\ Puede presentarse en formato de cuadro o tabla, 2 a 3 paginas.\n\ Debe apoyarse en el libro de Horton, base bíblicas, apuntes de clase y fuentes confiables.',
      date: 'mie, 22 abr',
      tipo: 1
    },
    {
      id: 5,
      titulo: 'Tarea # 2',
      preview: 'Mapa de Palestina',
      materiaCod: 1,
      detalles: 'Dibujar a mano un mapa, ubicar Palestina y reconocer el movimiento de Jesús en su ministerio (las diferentes ciudades en las cuales transitó Jesús)',
      date: 'lun, 27 abr',
      tipo: 1
    },
    {
      id: 6,
      titulo: 'Tarea # 2',
      preview: 'Los Dones y el fruto',
      materiaCod: 2,
      detalles: 'Basados en 1a. Carta de Corintios Cap. 12 diseñar una infografía acerca de los dones y el fruto del Espíritu, identificando la trascendencia en su vida espiritual ¿Son necesarios? ¿Por qué? Relate una manifestación personal de estos en su vida.',
      date: 'mar, 28 abr',
      tipo: 1
    },
    {
      id: 7,
      titulo: 'Tarea # 2',
      preview: 'Poca informacion',
      materiaCod: 3,
      detalles: 'Descargue recurso y elabore trabajo segun indicaciones',
      date: 'mar, 28 abr',
      tipo: 1
    },
    {
      id: 8,
      titulo: 'Tarea # 3',
      preview: 'Poca informacion',
      materiaCod: 3,
      detalles: 'Descargue recurso y elabore trabajo segun indicaciones',
      date: 'mar, 05  may',
      tipo: 1
    },
    {
      id: 9,
      titulo: 'Tarea # 2',
      preview: 'Refutación de herejía',
      materiaCod: 4,
      detalles: 'Que el estudiante identifique un error doctrinal contemporáneo o histórico y lo refute bíblica y teológicamente, desarrollando discernimiento doctrinal y capacidad apologética básica. \n\ \n\ Seleccione de las siguientes opciones:\n\- Modalismo\n\- Arrianismo\n\- Teísmo abierto\n\- Universalismo\n\- Negación de la inspiración bíblica\n\ \n\Desarrolle un trabajo breve respondiendo:\n\ \n\- ¿En qué consiste esa enseñanza?\n\- ¿Por qué es doctrinalmente incorrecta?\n\- ¿Qué textos bíblicos la refutan?\n\- ¿Cómo respondería usted a alguien que sostiene esa idea?\n\ \n\ \n\ Extensión 2 a 3 paginas, formato de  Word o PDF, debe citar el libro de Horton y apuntes de clase.',
      date: 'mie, 06 may',
      tipo: 1
    },
    {
      id: 10,
      titulo: 'Tarea # 3',
      preview: 'Portafolio Doctrinal',
      materiaCod: 4,
      detalles: 'Elabore un portafolio doctrinal personal que reúna los principales conceptos estudiados en la materia. \n\Debe incluir:\n\\n\ · Definiciones doctrinales clave\n\ · Textos bíblicos base\n\ · Esquemas doctrinales breves\n\ · Errores doctrinales comunes\n\ · Aplicaciones ministeriales\n\ \n\Puede presentarse en cuaderno, Word o PDF.\n\ \n\Debe estar ordenado, claro y útil como herramienta de consulta para el ministerio.',
      date: 'mie, 20 may',
      tipo: 1
    },
    {
      id: 11,
      titulo: 'Tarea # 3',
      preview: 'Nuevo testamento',
      materiaCod: 1,
      detalles: 'Presentar una introducción a cada libro del Nuevo Testamento que incluya información básica sobre cada libro, su autor, propósito, sus destinatarios, fecha, tema, y un bosquejo corto y sencillo.',
      date: 'lun, 11 may',
      tipo: 1
    },
    {
      id: 12,
      titulo: 'Tarea # 4',
      preview: 'Bosquejo biblico',
      materiaCod: 1,
      detalles: 'Realizar un bosquejo biblico del libro asignado, se compartirá en clase como un reflexión biblico.',
      date: 'lun, 01 jun',
      tipo: 1
    },
    {
      id: 13,
      titulo: 'Tarea # 5',
      preview: 'Recurso didactico',
      materiaCod: 1,
      detalles: 'Desarrollar un recurso didáctico pedagógico para la enseñanza de los libros del nuevo testamento con el fin de facilitar la comprensión, razonamiento y la creatividad. adaptable a los diferentes grupos etarios que se encuentran en las congregaciones.',
      date: 'lun, 01 jun',
      tipo: 1
    },
    {
      id: 14,
      titulo: 'Tarea # 3',
      preview: 'Sondeos FORMA',
      materiaCod: 2,
      detalles: 'Complementar los sondeos que se presentan en clase y los aférrate del Libro F.O.R.M.A. del capítulo 1 al 6.',
      date: 'mar, 02 jun',
      tipo: 1
    },
  ];

  expos: any[] = [
    {
      id: 1,
      grupo: 1,
      tema: 'Marcos',
      integrantes: [
        { id: 2 },
        { id: 6 },
        { id: 10 }
      ],
      materiaCod: 1,
      date: 'lun, 20 abr',
      tipo: 1
    },
    {
      id: 2,
      grupo: 2,
      tema: 'Juan',
      integrantes: [
        { id: 3 },
        { id: 7 },
        { id: 8 }
      ],
      materiaCod: 1,
      date: 'lun, 20 abr',
      tipo: 1
    },
    {
      id: 3,
      grupo: 1,
      tema: 'Leyes de la 1 a la 7',
      integrantes: [
        { id: 5 },
        { id: 4 }
      ],
      materiaCod: 2,
      date: 'mar, 21 abr',
      tipo: 1
    },
    {
      id: 4,
      grupo: 1,
      tema: 'Caracteristicas del pastor / predicador',
      integrantes: [
        { id: 3 },
        { id: 12 }
      ],
      materiaCod: 3,
      date: 'mar, 21 abr',
      tipo: 1
    },
    {
      id: 5,
      grupo: 2,
      tema: 'Leyes de la 8 a la 15',
      integrantes: [
        { id: 2 },
        { id: 1 }
      ],
      materiaCod: 2,
      date: 'mar, 28 abr',
      tipo: 1
    },
    {
      id: 6,
      grupo: 2,
      tema: 'El pastor prepara el mensaje al preparar primero su propio corazon',
      integrantes: [
        { id: 8 },
        { id: 10 }
      ],
      materiaCod: 3,
      date: 'mar, 28 abr',
      tipo: 1
    },
    {
      id: 7,
      grupo: 5,
      tema: 'Nueve claves para preparar mensajes biblicos, primera parte (E,F,G,H,I)',
      integrantes: [
        { id: 1 },
        { id: 4 }
      ],
      materiaCod: 3,
      date: 'mar, 05 may',
      tipo: 1
    },
    {
      id: 8,
      grupo: 3,
      tema: 'Leyes de la 16 a la 23',
      integrantes: [
        { id: 7 },
        { id: 6 }
      ],
      materiaCod: 2,
      date: 'mar, 12 may',
      tipo: 1
    },
    {
      id: 9,
      grupo: 4,
      tema: 'Nueve claves para preparar mensajes biblicos, primera parte (A,B,C,D)',
      integrantes: [
        { id: 2 },
        { id: 11 }
      ],
      materiaCod: 3,
      date: 'mar, 12 may',
      tipo: 1
    },
    {
      id: 10,
      grupo: 4,
      tema: 'El Corazon y el caracter del lider',
      integrantes: [
        { id: 3 },
        { id: 10 }
      ],
      materiaCod: 2,
      date: 'mar, 19 may',
      tipo: 1
    },
    {
      id: 11,
      grupo: 3,
      tema: 'Pauta para los devocionales',
      integrantes: [
        { id: 5 },
        { id: 9 }
      ],
      materiaCod: 3,
      date: 'mar, 19 may',
      tipo: 1
    },
    {
      id: 12,
      grupo: 5,
      tema: 'Desata tu FORMA para la vida',
      integrantes: [
        { id: 9 },
        { id: 8 }
      ],
      materiaCod: 2,
      date: 'mar, 26 may',
      tipo: 1
    },
    {
      id: 13,
      grupo: 6,
      tema: 'Mandamientos 1 al 5 de expresion oral',
      integrantes: [
        { id: 7 },
        { id: 6 },
        { id: 14 }
      ],
      materiaCod: 3,
      date: 'mar, 26 may',
      tipo: 1
    },
    {
      id: 14,
      grupo: 4,
      integrantes: [
        { id: 1 },
        { id: 4 }
      ],
      materiaCod: 1,
      tema: 'Hebreos',
      severity: 'info',
      date: 'lun, 04 may',
      tipo: 1
    },
    {
      id: 15,
      grupo: 3,
      integrantes: [
        { id: 5 },
        { id: 9 }
      ],
      materiaCod: 1,
      tema: 'Efesios',
      date: 'lun, 25 may',
      tipo: 1
    },
    {
      id: 16,
      grupo: 1,
      integrantes: [
        { id: 3 },
        { id: 5 },
        { id: 1 }
      ],
      materiaCod: 4,
      tema: 'Exposición de los atributos de Dios y sus nombres (Explicación del atributo o nombre, textos bíblicos, ejemplo bíblico).',
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 17,
      grupo: 2,
      integrantes: [
        { id: 4 },
        { id: 2 },
        { id: 6 }
      ],
      materiaCod: 4,
      tema: 'Exposición de los atributos de Dios y sus nombres (Explicación del atributo o nombre, textos bíblicos, ejemplo bíblico).',
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 18,
      grupo: 3,
      integrantes: [
        { id: 9 },
        { id: 8 }
      ],
      materiaCod: 4,
      tema: 'Exposición de los atributos de Dios y sus nombres (Explicación del atributo o nombre, textos bíblicos, ejemplo bíblico).',
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 19,
      grupo: 4,
      integrantes: [
        { id: 7 },
        { id: 10 }
      ],
      materiaCod: 4,
      tema: 'Exposición de los atributos de Dios y sus nombres (Explicación del atributo o nombre, textos bíblicos, ejemplo bíblico).',
      date: 'sin fecha',
      tipo: 1
    }
  ];

  predicas: any[] = [
    {
      id: 1,
      libro: 'Mateo',
      encargadoCod: 1,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 2,
      libro: 'Apocalipsis',
      encargadoCod: 4,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 3,
      libro: 'Filemon',
      encargadoCod: 10,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 4,
      libro: 'Galatas',
      encargadoCod: 6,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 5,
      libro: '2 Corintios',
      encargadoCod: 5,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 6,
      libro: 'Judas',
      encargadoCod: 2,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 7,
      libro: '1 Timoteo',
      encargadoCod: 7,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 8,
      libro: 'Romanos',
      encargadoCod: 3,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 9,
      libro: '1 Pedro',
      encargadoCod: 9,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    },
    {
      id: 10,
      libro: 'Santiago',
      encargadoCod: 8,
      materiaCod: 1,
      date: 'sin fecha',
      tipo: 1
    }
  ];

  companeros: any = [
    {
      id: 1,
      apodo: 'Caste',
      nombre: 'Josue Castellon',
      foto: 'fotos/caste.png'
    },
    {
      id: 2,
      apodo: 'Rebe',
      nombre: 'Rebeca Cornejo',
      foto: 'fotos/rebe.png'
    },
    {
      id: 3,
      apodo: 'Colin',
      nombre: 'Colin Carvell',
      foto: 'fotos/colin.png'
    },
    {
      id: 4,
      apodo: 'Salvador',
      nombre: 'Salvador Romero',
      foto: 'fotos/salva.png'
    },
    {
      id: 5,
      apodo: 'Mario',
      nombre: 'Mario Jeremias',
      foto: 'fotos/mario.png'
    },
    {
      id: 6,
      apodo: 'Jasen',
      nombre: 'Jasen de Jesus',
      foto: 'fotos/jasen.png'
    },
    {
      id: 7,
      apodo: 'Ericka',
      nombre: 'Ericka de Mena',
      foto: 'fotos/ericka.png'
    },
    {
      id: 8,
      apodo: 'Lukas',
      nombre: 'Lukas Gonzalez',
      foto: 'fotos/lukas.png'
    },
    {
      id: 9,
      apodo: 'Ricky',
      nombre: 'Ricky Bonilla',
      foto: 'fotos/ricky.png'
    },
    {
      id: 10,
      apodo: 'DJ',
      nombre: 'David Josue',
      foto: 'fotos/dj.png'
    },
    {
      id: 11,
      apodo: 'Javy',
      nombre: 'Javy Saenz',
      foto: 'fotos/male.png'
    },
    {
      id: 12,
      apodo: 'Senia',
      nombre: 'Senia Flores',
      foto: 'fotos/female.png'
    },
    {
      id: 14,
      apodo: 'Jonathan',
      nombre: 'Jonathan',
      foto: 'fotos/male.png'
    }
  ]

  activitiesFiltered: any[] = [];
  exposFiltered: any[] = [];
  examenFiltered: any[] = [];

  //activities: any[] = [];

  //gOnInit() {
  // this.activities = [
  //   { id: 0, titulo: 'Título 1', materia:'Panorama NT', detalles: 'Detalles 1' , tipo: 1 },
  //   { id: 1, titulo: 'Título 2', materia:'Panorama NT', detalles: 'Detalles 2' , tipo: 1 },
  //   { id: 2, titulo: 'Título 3',  materia:'Panorama NT', detalles: 'Detalles 3', tipo: 1  }
  // ];
  //}


  ngOnInit() {
    this.activitiesFiltered = [...this.activities];
    this.exposFiltered = [...this.expos];
    this.examenFiltered = [...this.examenes];
    this.selectedMateria = this.materias[0].id;
    this.predicas = this.predicas.map(item => ({
      ...item,
      ...this.updateMateriaSeverity(item),
      ...this.addFotoApodoUser(item)
    }));
    this.exposFiltered = this.expos.map((expo: any) =>
    ({
      ...expo,
      ...this.updateMateriaSeverity(expo),
      integrantes: expo.integrantes.map((item: any) => ({
        ...item,
        ...this.addFotoApodoUser(item)
      }))
    })
    );
    this.activitiesFiltered = this.activities.map(item => this.updateMateriaSeverity(item));
    this.examenFiltered = this.examenes.map(item => this.updateMateriaSeverity(item));
  }

  getFoto(id: number) {
    return this.companeros.find((compa: any) => compa.id === id)?.foto ?? '';
  }

  getApodo(id: number) {
    return this.companeros.find((compa: any) => compa.id === id)?.apodo ?? '';
  }

  getMateriaName(id: number) {
    return this.materias.find((materia: any) => materia.id === id)?.name ?? '';
  }

  getMateriaColor(id: number) {
    return this.materias.find((materia: any) => materia.id === id)?.severity ?? '';
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
    this.tabValue = event.value.texto ?? '';
  }

  onMateriaChange(event: any) {
    const filtered = this.selectedMateria === 0
      ? this.activities
      : this.activities.filter(a => a.materiaCod === this.selectedMateria);
    const filtered1 = this.selectedMateria === 0
      ? this.expos
      : this.expos.filter(a => a.materiaCod === this.selectedMateria);
    const filtered2 = this.selectedMateria === 0
      ? this.examenes
      : this.examenes.filter(a => a.materiaCod === this.selectedMateria);
    this.activitiesFiltered = filtered.map(item => this.updateMateriaSeverity(item));
    this.examenFiltered = filtered2.map(item => this.updateMateriaSeverity(item));

    this.exposFiltered = filtered1.map((expo: any) =>
    ({
      ...expo,
      ...this.updateMateriaSeverity(expo),
      integrantes: expo.integrantes.map((item: any) => this.addFotoApodoUser(item)),
    })
    );

  }


  updateMateriaSeverity(item: any) {
    return {
      ...item,
      materia: this.getMateriaName(item.materiaCod),
      severity: this.getMateriaColor(item.materiaCod),
    };
  }

  addFotoApodoUser(item: any) {
    return {
      ...item,
      foto: this.getFoto(item.id),
      compa: this.getApodo(item.id)
    };
  }


}
