/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrizeDetailComponent } from './prize-detail.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import faker from "faker";
import { Prize } from "../prize";
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PrizeService } from '../prize.service';
import { PerformerPrize } from '../performerPrize';
import { PrizePerformerDetail } from './prize-performer-detail';
import { Performer } from 'src/app/album/performer';

describe('PrizeDetailComponent', () => {
  let component: PrizeDetailComponent;
  let fixture: ComponentFixture<PrizeDetailComponent>;
  let debug: DebugElement;
  let element: HTMLElement;
  let mockprizeService: any;

  const performantPrizeStrub = new PerformerPrize (1,"mundo")
  let performantPrizeArray:PerformerPrize[] = []

  const performer = new Performer(1,"name","img","descrip","")

  const prizeStrub: Prize = new Prize(
    1,
    "Org",
    "nombre",
    "description",
     [])

    let prizeArray:Prize[] = []

  const prizePerformerDetail= new PrizePerformerDetail (
    1,
    "12/12/2021",
    performer,
    prizeStrub)

    let prizePerformerDetailArray:PrizePerformerDetail[] = []


  beforeEach(async(() => {
    prizePerformerDetailArray.push(prizePerformerDetail)
    prizeArray.push(prizeStrub)
    performantPrizeArray.push(performantPrizeStrub)
    prizeStrub.performerPrizes =performantPrizeArray
    mockprizeService = jasmine.createSpyObj(['getPrize', 'getPrizePerformers']);
    mockprizeService.getPrize.and.returnValue(of(prizeArray));
    mockprizeService.getPrizePerformers.and.returnValue(of(prizePerformerDetailArray));
    TestBed.configureTestingModule({
      declarations: [PrizeDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: PrizeService, useValue: mockprizeService }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PrizeDetailComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.prizeDetail = new Prize(faker.random.number(),
      faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence(),
      []);
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should have a header element ", () => {
    const header = element.querySelector('#header');
    expect(header.innerHTML).toContain('Detalle premio');
  });

  it('getPrizeDetail makes expected calls', () => {
    fixture.detectChanges();
    fixture.componentInstance.prizeDetail=prizeStrub
    fixture.componentInstance.getPrizeDetail();
    expect(mockprizeService.getPrize).toHaveBeenCalled();

  });

  it('getPrizeDetail makes expected calls', () => {
    fixture.detectChanges();
    fixture.componentInstance.prizeDetail=prizeStrub
    fixture.componentInstance.getPerformersList();
    expect(mockprizeService.getPrizePerformers).toHaveBeenCalled();
  });


});
