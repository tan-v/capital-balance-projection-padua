export default class Utils {
  public static getPercentage(value: number): number {
    return value / 100;
  }
  public static getRoundedValue(value: number) {
    return Math.round(value);
  }
}
