export default class HumanFilesize {
  public static FromBytes(bytes: number): string {
    if (Math.abs(bytes) < 1024) {
      return `${bytes} B`;
    }
    var units = ["B", "KB", "MB", "GB"];
    var i = (Math.floor(Math.log(bytes) / Math.log(1024)));
    return HumanFilesize.RoundToTwo(bytes / Math.pow(1024, i)) + " " + units[i];
  }

  private static RoundToTwo(n: number): number {
    return Math.round(n * 100) / 100;
  }
}