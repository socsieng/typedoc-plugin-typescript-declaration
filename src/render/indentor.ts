export default class Indentor {
  public static indentString: string = '  ';

  private _indentCache: { [key: string]: string };
  private _indentString?: string;

  constructor(indentString?: string) {
    this._indentCache = {};
    this._indentString = indentString;
  }

  public getIndent(size: number): string {
    if (size === 0) return '';

    const indentString = this._indentString ?? Indentor.indentString;
    const key = `${indentString}_${size}`;

    let indent = this._indentCache[key];
    if (indent === undefined) {
      indent = new Array(size).fill(indentString).join('');
      this._indentCache[key] = indent;
    }
    return indent;
  }

  private static _instance: Indentor;
  public static instance(): Indentor {
    if (!Indentor._instance) {
      Indentor._instance = new Indentor();
    }
    return Indentor._instance;
  }
}
