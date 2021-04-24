export class TimeNumberConverter {
  static MINUTES_IN_HOUR = 60;
  private readonly delimiter: string;

  constructor(delimiter: string) {
    this.delimiter = delimiter;
  }

  /**
   *
   * @param time → this param should contain hours and minutes separated with delimiter for example:
   * 12:20 where hour is equal to 12 minutes is equal to 20 and the delimiter is ':'
   */
  public toNumberFromTime(time: string): number {
    const [hour, minute] = time.split(this.delimiter);
    const convertedMinutes = Math.ceil(
      (Number(minute) / TimeNumberConverter.MINUTES_IN_HOUR) * 100
    );
    return Number(`${hour}.${convertedMinutes}`);
  }

  /**
   *
   * @param time this param should contain number which represents the time.
   * For example 12.5 will represent 12:30`
   */
  public toTimeFromNumber(time: number): string {
    const [hour, minute] = time.toString().split('.');
    const convertedMinutes = Math.floor(
      TimeNumberConverter.MINUTES_IN_HOUR * Number(`0.${minute}`)
    );
    return `${hour}${this.delimiter}${convertedMinutes}`;
  }
}
