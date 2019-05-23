import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, Host } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  // Recibir los archivos del FileItem
  @Input() archivos: FileItem[] = [];
  // Cuando quieres subir un archivo, se uso para los eventos dragover
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  // Si esta arrastrando algun documento, dispara un evento
  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any) {
    this.mouseSobre.emit(true);  // Si el mouse esta sobre el componente se activa
    this._prevenirDetener( event );
  }

    // Cuando el mouse se va
  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
    this.mouseSobre.emit(false);  // Si el mouse esta sobre el componente se activa
  }


  // OBTEJER ARCHIVO
  @HostListener('drop', ['$event'])
  public onDrag( event: any) {

    const transferencia = this._getTransferencia( event );
    if ( !transferencia ) {
      return;
    }
    this._extraerArchivos( transferencia.files );
    this._prevenirDetener( event );
    this.mouseSobre.emit(false);
  }

  // Para los navegadores
  private _getTransferencia( event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // Extraer los ARCHIVOS
  private _extraerArchivos( archivosLista: FileList ) {
    // tslint:disable-next-line:forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista )) {
      const archivoTemporal = archivosLista[propiedad];  // Obtener el archivo

      if (this._archivoPuedeSerCargado( archivoTemporal )) {
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }

    console.log( this.archivos);
  }

  // Validaciones
  // Convinacion de ambas
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if ( !this._archivoYaFueDropeado(archivo.name) && this._esImagen( archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  // No abrir la imagen por defecto
  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Asegurar el archivo no exista en el arreglo de archivos
  private _archivoYaFueDropeado( nombreArchivo: string ): boolean {
    for ( const archivo of this.archivos ) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo  + 'ya esta dropeado');
        return true;
      }
    }
  }

  private _esImagen( tipoArchivo: string): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

}
