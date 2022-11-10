import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlbumService } from "../album.service";
import { ActivatedRoute, Router } from '@angular/router';

import { Album } from '../album';
import { CollectorAlbum } from "../album-collector/collector-album";
import { Collector } from '../collector';

@Component({
  selector: 'app-album-detalle',
  templateUrl: './album-detalle.component.html',
  styleUrls: ['./album-detalle.component.scss']
})
export class AlbumDetalleComponent implements OnInit {

  @Input() idAlbumDetalle: number;
  @Output() cancelar = new EventEmitter();

  albumDetalle: Album;
  verTrack: Boolean;
  verCollector: Boolean;
  collectors: Collector[];
  coleccionistas: CollectorAlbum[];
  sinPerformers: Boolean;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  getAlbumDetalle(): void {
    console.log("*************** Llega aca")
    this.albumService.getAlbumDetalle(this.idAlbumDetalle).subscribe(album => {
      console.log("*************** Llega aca 2")
      this.albumDetalle = album;
      if (this.albumDetalle.performers.length == 0) {
        this.sinPerformers = true
      }
      else{
        this.sinPerformers = false
      }
      console.log(JSON.stringify(this.albumDetalle))
    });
    this.albumService.getCollectors().subscribe(collectors => {
      console.log("*************** Llega aca 3")
      this.collectors = collectors;
      for(let c of this.collectors) {
        this.albumService.getCollectorAlbum(c.id).subscribe(albums => {
          console.log("*************** Llega aca 4")
          for(let a of albums) {
            console.log("*************** Llega aca 5")
            if(a.album.id == this.albumDetalle.id) {
              this.coleccionistas.push(a);
            }
          }
          console.log("*************** Llega aca 6")
        });
      }
    });
  }

  regresarLista(): void {
    this.cancelar.emit();
  }

  mostrarTrack(): void {
    this.verTrack = true;
  }

  cerrarTracks(): void {
    this.verTrack = false;
  }

  mostrarCollectors(): void {
    this.verCollector = true;
  }

  cerrarCollectors(): void {
    this.verCollector = false;
  }

  ngOnInit() {
    this.coleccionistas = [];
    this.getAlbumDetalle();
    this.verTrack = false;
    this.verCollector = false;

  }
}
