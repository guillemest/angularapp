import { RutPipe } from './../pipes/rut.pipe';
import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appRut]',
})
export class RutDirective implements OnInit {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef, private rutPipe: RutPipe) {
    this.el = this.elementRef.nativeElement;
    this.el.maxLength = 12;
  }

  ngOnInit() {
    if (this.el.value) {
      this.el.value = this.rutPipe.transform(this.el.value);
    }
  }

  @HostListener('keydown', ['$event'])
  keyDown(value) {
    const e = value as KeyboardEvent;
    const arrayAllow = [
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      8,
      9,
      75,
      37,
      39,
      96,
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104,
      105,
    ];

    if (arrayAllow.indexOf(e.keyCode) === -1) {
      e.preventDefault();
    }

    this.el.value = this.rutPipe.transform(value.target.value);
  }

  @HostListener('keypress', ['$event.target.value'])
  onKeyPress(value) {
    if (+value) {
      this.el.value = this.rutPipe.transform(value);
    }
  }

  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(value) {
    if (+value) {
      this.el.value = this.rutPipe.transform(value);
    }
  }
}
