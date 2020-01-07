export function propertySorter<T>(selector: (obj: T) => any): (a: T, b: T) => number {
  return (a, b) => {
    const valA = selector(a);
    const valB = selector(b);

    if (valA > valB) {
      return 1;
    }
    if (valA < valB) {
      return -1;
    }
    return 0;
  }
}
