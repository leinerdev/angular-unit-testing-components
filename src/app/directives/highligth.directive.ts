import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highligth]'
})
export class HighligthDirective implements OnChanges {

  @Input('highligth') bgColor: string = '';

  defaultColor = 'gray';

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor
  }

}
