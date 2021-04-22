export namespace ARRAY_UTILS {
  export function removeElement<T>(array: T[], index: number): T {
    return array.splice(index, 1)[0];
  }
}
