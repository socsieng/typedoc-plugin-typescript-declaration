import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models';
import CommentRenderer from './comment-renderer';
import Indentor from './indentor';

export default abstract class ReflectionRenderer {
  protected _indentor: Indentor;
  protected _commentRenderer: CommentRenderer;

  constructor() {
    this._indentor = Indentor.instance();
    this._commentRenderer = new CommentRenderer();
  }

  public abstract render(node: Reflection, terminationCharacter?: string): string;

  protected getModifiers(node: Reflection, parent?: Reflection): string[] {
    if (!node) return [];

    const modifiers: string[] = [];
    const flags = node.flags;
    const parentFlags = parent?.flags;

    // if (flags.isExported || parentFlags?.isExported) {
    //   modifiers.push('export');
    // }

    if (flags.isPublic || parentFlags?.isPublic) {
      modifiers.push('public');
    } else if (flags.isProtected || parentFlags?.isProtected) {
      modifiers.push('protected');
    } else if (flags.isPrivate || parentFlags?.isPrivate) {
      modifiers.push('private');
    }

    if (flags.isStatic || parentFlags?.isStatic) {
      modifiers.push('static');
    }

    if (flags.isAbstract || parentFlags?.isAbstract) {
      modifiers.push('abstract');
    }

    if (flags.isConst || parentFlags?.isConst) {
      modifiers.push('const');
    }
    if (flags.isLet || parentFlags?.isLet) {
      modifiers.push('let');
    }

    return modifiers;
  }

  protected renderComment(node: Reflection): string {
    return this._commentRenderer.render(node);
  }

  protected encodeName(name: string): string {
    return /[^\w]/.test(name) ? JSON.stringify(name) : name;
  }

  protected isTop(node: Reflection): boolean {
    return !node.parent || (node.parent && node.parent!.kind === ReflectionKind.Global);
  }

  protected getTag(node: Reflection, tag: string) {
    return node.comment?.tags?.find(t => t.tagName === tag);
  }
}
