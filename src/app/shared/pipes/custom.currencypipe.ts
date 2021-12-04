import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'myCurrency',
  })
  export class MycurrencyPipe implements PipeTransform {
    transform(
        value: number,
        currencyCode: string = 'RUB',
        display:
            | 'code'
            | 'symbol'
            | 'symbol-narrow'
            | string
            | boolean = 'symbol-narrow',
        digitsInfo: string = '3.0',
        locale: string = 'ru',
    ): string | null {

        return formatCurrency(
          value,
          locale,
          getCurrencySymbol(currencyCode, 'narrow'),
          currencyCode,
          digitsInfo,
        );
    }
}