import { HighligthDirective } from './highligth.directive';
import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <h5 class="title" highligth>Hay un valor</h5>
    <h5 highligth="yellow">Yellow</h5>
    <p highligth>parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [highligth]="color">
  `
})
class HostComponent {
  public color = 'pink';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ],
      imports: [FormsModule]
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

  it('should have three highligth elements', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highligth])'));
    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
  });

  it('h5.title should be default color', () => {
    const titleDebug = fixture.debugElement.query(By.css('.title'));
    const dir = titleDebug.injector.get(HighligthDirective);
    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  });

  it('should binding <input> and change the backgroundColor', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebug.nativeElement;

    expect(inputElement.style.backgroundColor).toEqual('pink');

    inputElement.value = 'red';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});
