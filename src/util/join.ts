export default function join(delimiter: string, ...values: any[]): string {
  return values.filter(v => v !== null && v !== undefined && v !== '')
    .join(delimiter);
}
