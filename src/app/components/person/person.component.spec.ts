import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // LifeCycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the name "Leiner"', () => {
    component.person = new Person('Leiner', 'Barrios', 23, 65, 1.75);
    expect(component.person?.name).toEqual('Leiner');
  });

  it('should have <h3> with "Hola, {person.name}"', () => {
    // Arrange
    component.person = new Person('Jose', 'Barrios', 23, 65, 1.75);
    const expectedMessage = `Hola, ${ component.person.name }`
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element?.textContent).toEqual(expectedMessage);
  });

  it('should have <p> with "Mi altura es {person.height}"', () => {
    // Arrange
    component.person = new Person('Jose', 'Barrios', 23, 65, 1.75);
    const expectedMessage = `Mi altura es ${ component.person.height }`
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(pElement?.textContent).toEqual(expectedMessage);
  });

  it('should display a text with IMC when do click', () => {
    // Arrange
    const expectedMessage = 'overweight level 3';
    component.person = new Person('Juan', 'Pérez', 30, 120, 1.65); // overweight level 3
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement: HTMLElement = buttonDebug.nativeElement;
    // Act
    buttonDebug.triggerEventHandler('click', null)
    fixture.detectChanges();
    // Assert
    expect(buttonElement.textContent).toContain(expectedMessage);
  });

  it('should raise selected event when doing click', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Pérez', 30, 120, 1.65); // overweight level 3
    component.person = expectedPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => {
      selectedPerson = person;
    })
    // Act
    buttonDebug.triggerEventHandler('click', null)
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  });
});

@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})
class HostComponent {
  person: Person = new Person('Santiago', 'Molina', 13, 5, 1.40);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectedName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    // Arrange
    const btnDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});

