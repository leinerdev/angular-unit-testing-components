import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/models/person.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person component', () => {
    // Arrange
    component.people = [
      new Person('Leiner', 'Barrios', 23, 65, 1.75),
      new Person('Jose', 'Barrios', 27, 75, 1.76),
      new Person('Santiago', 'Barrios', 27, 75, 1.76),
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    fixture.detectChanges();
    //Assert
    expect(debugElement.length).toEqual(3)
  });

  it('should raise selected event when the button is clicked', () => {
    // Arrange
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selectedPerson', () => {
    // Arrange
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    const liElement: HTMLElement = liDebug.nativeElement;
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liElement.textContent).toContain(component.selectedPerson?.name);
  })
});
