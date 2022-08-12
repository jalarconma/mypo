export class DateUtils {

  static dateToUTCmilliseconds(input: Date): number {

    let fromDate = input;

    if(!input) {
      fromDate = new Date();
    }

    const day = fromDate.getDate();
    const month = fromDate.getMonth() + 1;
    const year = fromDate.getFullYear();

    const clonedDate = Date.UTC(year, month, day);

    return clonedDate;
  }

  static stringDateToUTCmilliseconds(input: string): number {
    let fromDate;

    if(isNaN(Date.parse(input))) {
      fromDate = new Date();
    } else {
      fromDate = new Date(input);
    }

    const day = fromDate.getDate();
    const month = fromDate.getMonth() + 1;
    const year = fromDate.getFullYear();

    const clonedDate = Date.UTC(year, month, day);

    return clonedDate;
  }
}