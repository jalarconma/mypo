export class StringUtils {

  static dateToString(date: Date | null): string | null {
    if(!date) {
      return null;
    }

    const day = StringUtils.formatNumberTo2Digits(date.getDate());
    const month = StringUtils.formatNumberTo2Digits(date.getMonth() + 1);
    const year = StringUtils.formatNumberTo2Digits(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  static dateToValidString(date: Date | null): string {
    if(!date) {
      return '';
    }

    const day = StringUtils.formatNumberTo2Digits(date.getDate());
    const month = StringUtils.formatNumberTo2Digits(date.getMonth() + 1);
    const year = StringUtils.formatNumberTo2Digits(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  static formatNumberTo2Digits(input: number): string | null {

    if(!input) {
      return null;
    }

    const value = Math.abs(input);

    return value > 9 ? `${value}` : `0${value}`;
  }
}