import { ReversePipe } from './reverse.pipe';
import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("roma");
    expect(rta).toEqual("amor");
  });

  @Component({
    template: `
      <h5>{{'amor' | reverse}}</h5>
      <input [(ngModel)]="text">
      <p>{{ text | reverse }}</p>
    `
  })
  class HostComponent {
    public text = '';
  }

  describe('ReversePipe from HostComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ HostComponent, ReversePipe ],
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

    it('should the h5 be "roma"', () => {
      const h5Debug = fixture.debugElement.query(By.css('h5'));
      expect(h5Debug.nativeElement.textContent).toEqual('roma');
    });

    it('should apply the reverse pipe when typing in the input', () => {
      const inputDebug = fixture.debugElement.query(By.css('input'));
      const inputElement: HTMLInputElement = inputDebug.nativeElement;
      const pDebug = fixture.debugElement.query(By.css('p'));

      expect(pDebug.nativeElement.textContent).toEqual('');

      inputElement.value = 'ANA 2'; // 2 ANA
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(pDebug.nativeElement.textContent).toEqual('2 ANA');
    });
  });

});
