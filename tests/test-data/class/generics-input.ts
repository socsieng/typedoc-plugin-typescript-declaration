export class MyList<T> extends Array<T> {
  public get(index: number) {
    return this[index];
  }

  public getPlus1(index: number): T | undefined {
    if (index >= this.length) {
      return;
    }
    return this[index + 1];
  }

  public cast<TCast extends T>(index: number): TCast {
    return this[index] as TCast;
  }

  public static create<TCreate extends { new(): TCreate }>(c: TCreate): TCreate {
    return new c();
  }

  public static create2<TCreate>(c: { new(): TCreate }): TCreate {
    return new c();
  }

  private wrap(): Array<T[]> {
    return [this];
  }
}
