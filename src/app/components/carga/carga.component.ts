import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor( public _cargaImagenes: CargaImagenesService) { } // Inyectar el servicio

  ngOnInit() {
  }

  cargarImagenes() {  // Llamado del servicio ( toma todos los archivos y lo manda al servicio)
    this._cargaImagenes.cargarImagenesFireBase( this.archivos);
  }

  limpiarArchivos() {
  }
}
