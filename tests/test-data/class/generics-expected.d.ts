declare class MyList<T> extends Array<T> {
  public get(index: number): T;

  public getPlus1(index: number): T | undefined;

  public cast<TCast extends T>(index: number): TCast;

  public static create<TCreate extends { new(): TCreate }>(c: TCreate): TCreate;

  public static create2<TCreate>(c: { new(): TCreate }): TCreate;

  private wrap(): Array<T[]>;
}
