export function removeArrayElement<T>(array: T[], index: number): T {
  return array.splice(index, 1)[0];
}

export function isEmpty(value: unknown[]): boolean {
  return value.length > 0;
}
