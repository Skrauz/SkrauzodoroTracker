export function formatDateEnGB(input: Date): string {
  return new Intl.DateTimeFormat("en-GB").format(input);
}
