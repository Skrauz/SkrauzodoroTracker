export function convertMinsToHrsMins(minutes: number): string {
  let h = Math.floor(minutes / 60);
  let m = Math.floor(minutes % 60);

  let hString = h < 10 ? '0' + h : h;
  let mString = m < 10 ? '0' + m : m;

  return hString + 'h ' + mString + 'm';
}
