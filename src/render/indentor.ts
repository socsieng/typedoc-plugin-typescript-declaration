export default class Indentor {
  private _indentCache: string[];
  private _indentString: string;

  constructor(indentString: string = '  ') {
    this._indentCache = [];
    this._indentString = indentString;
  }

  public getIndent(size: number): string {
    if (size === 0) return '';

    let indent = this._indentCache[size];
    if (indent === undefined) {
      indent = new Array(size).fill(this._indentString).join('');
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
