import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rut',
})
export class RutPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const rawRut = value.replace('.', '').replace('.', '').replace('-', '');

      const rutLength = rawRut.length;
      let checkerDigit = rawRut.substring(rutLength - 1, rutLength);

      let rut = '';
      let rut1 = '';
      let rut2 = '';
      let rut3 = '';

      if (rutLength < 5 && rutLength > 1) {
        rut1 = rawRut.substring(0, rutLength - 1);
        rut = rut1 + '-' + checkerDigit;
      }
      if (rutLength < 8 && rutLength > 4) {
        rut1 = rawRut.substring(rutLength - 4, rutLength - 1);
        rut2 = rawRut.substring(rutLength - 8, rutLength - 4);
        rut = rut2 + '.' + rut1 + '-' + checkerDigit;
      }
      if (rutLength < 10 && rutLength > 7) {
        rut1 = rawRut.substring(rutLength - 4, rutLength - 1);
        rut2 = rawRut.substring(rutLength - 7, rutLength - 4);
        rut3 = rawRut.substring(0, rutLength - 7);
        if (typeof checkerDigit === 'string') {
          checkerDigit = checkerDigit.toUpperCase();
        }
        rut = rut3 + '.' + rut2 + '.' + rut1 + '-' + checkerDigit;
      }

      if (rutLength === 1) {
        rut = rawRut;
      }

      return rut;
    } else {
      return '';
    }
  }

  parse(value) {
    return value.match(/[0-9Kk]+/g).join('');
  }
}
