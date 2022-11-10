/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDetalleComponent } from './album-detalle.component';
import { DebugElement } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Album } from "../album";
import faker from "faker";
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AlbumService } from '../album.service';
import { CollectorAlbum } from '../album-collector/collector-album';
import { Collector } from '../collector';
import { Performer } from '../performer';

describe('AlbumDetalleComponent', () => {
  let component: AlbumDetalleComponent;
  let fixture: ComponentFixture<AlbumDetalleComponent>;
  let element: HTMLElement;
  let debug: DebugElement;
  let mockAlbumService: any;

 let performer:Performer = new Performer( 1,
  "Alma",
  "img",
  "description: string",
  "birthDate: any")

  const id: number = 10;
  const name: string = faker.lorem.sentence();
  const cover: string = faker.image.imageUrl();
  const releaseDate: any = faker.date.past();
  const description: string = faker.lorem.sentence();
  const genre: string = faker.lorem.sentence();
  const recordLabel: string = faker.lorem.sentence();

  let albumDetalle: Album =
    new Album(
      id,
      name,
      cover,
      releaseDate,
      description,
      genre,
      recordLabel,
      null,
      null,
      null
    );

  const collectorAlbumStub: CollectorAlbum = <any>{};
  collectorAlbumStub.collector = <any>{};
  collectorAlbumStub.collector.name = "La ultima";
  collectorAlbumStub.album = albumDetalle;
  collectorAlbumStub.album.name = "Los 50";
  collectorAlbumStub.id = 1;

  let collectorArray:Collector[] = []
  let performerArray:Performer[] = []

  let colectorAlbumArray:CollectorAlbum[] = []


  beforeEach(async(() => {
    performerArray.push(performer)
    albumDetalle.performers = performerArray;
    colectorAlbumArray.push(collectorAlbumStub)
    const collectorStub: any = new Collector(1, 1234, "c@gmail.com", "Luis", performerArray, <any>{}, colectorAlbumArray)

    collectorArray.push(collectorStub)

    mockAlbumService = jasmine.createSpyObj(['getAlbumDetalle', 'getCollectors', "getCollectorAlbum"]);
    mockAlbumService.getAlbumDetalle.and.returnValue(of(albumDetalle));
    mockAlbumService.getCollectors.and.returnValue(of(collectorArray));
    mockAlbumService.getCollectorAlbum.and.returnValue(of(colectorAlbumArray));
    TestBed.configureTestingModule({
      declarations: [AlbumDetalleComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AlbumService, useValue: mockAlbumService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlbumDetalleComponent);
  }));

  beforeEach(() => {
    const id: number = 10;
    const name: string = faker.lorem.sentence();
    const cover: string = faker.image.imageUrl();
    const releaseDate: any = faker.date.past();
    const description: string = faker.lorem.sentence();
    const genre: string = faker.lorem.sentence();
    const recordLabel: string = faker.lorem.sentence();
    albumDetalle =
      new Album(
        id,
        name,
        cover,
        releaseDate,
        description,
        genre,
        recordLabel,
        null,
        null,
        null
      );

    fixture = TestBed.createComponent(AlbumDetalleComponent);
    component = fixture.componentInstance;
    component.albumDetalle = albumDetalle;
    element = fixture.nativeElement;
    debug = fixture.debugElement;
  });

  it('should create the component', () => {
    const resgistro = fixture.componentInstance;
    expect(resgistro).toBeTruthy();
  });



  it('ngOnInit makes expected calls', () => {
    fixture.detectChanges();
    fixture.componentInstance.idAlbumDetalle = 1
    fixture.componentInstance.ngOnInit();
    expect(mockAlbumService.getAlbumDetalle).toHaveBeenCalled();
    expect(mockAlbumService.getCollectors).toHaveBeenCalled();
    expect(mockAlbumService.getCollectorAlbum).toHaveBeenCalled();
  });



});





