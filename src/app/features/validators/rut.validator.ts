import { FormControl } from '@angular/forms';

export const rutValidator = (control: FormControl) => {
  if (!control.value) {
    return null;
  }
  let value = control.value.split('.').join('');
  value = value.replace('-', '');

  const baseRut = value.slice(0, -1);

  let checkerDigit = value.slice(-1).toUpperCase();

  let sum = 0;
  let multiple = 2;

  for (let i = 1; i <= baseRut.length; i++) {
    const index = multiple * value.charAt(baseRut.length - i);
    sum = sum + index;
    if (multiple < 7) {
      multiple = multiple + 1;
    } else {
      multiple = 2;
    }
  }

  const checkerDigitExpected = 11 - (sum % 11);

  checkerDigit = checkerDigit === 'K' ? 10 : checkerDigit;
  checkerDigit = checkerDigit === '0' ? 11 : checkerDigit;

  if (checkerDigitExpected.toString() !== checkerDigit.toString()) {
    return {
      errorRut: 'invalid rut',
    };
  } else {
    return null;
  }
};
