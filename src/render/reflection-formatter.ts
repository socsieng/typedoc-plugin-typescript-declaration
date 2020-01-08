import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models';
import AccessorRenderer from './accessor-renderer';
import CallSignatureRenderer from './call-signature-renderer';
import ConstructorSignatureRenderer from './constructor-signature-renderer';
import ContainerRenderer from './container-renderer';
import EnumMemberRenderer from './enum-member-renderer';
import FunctionRenderer from './function-renderer';
import GetSignatureRenderer from './get-signature-renderer';
import MethodRenderer from './method-renderer';
import ParameterRenderer from './parameter-renderer';
import PropertyRenderer from './property-renderer';
import ReflectionRenderer from './reflection-renderer';
import SetSignatureRenderer from './set-signature-renderer';
import TypeAliasRenderer from './type-alias-renderer';
import TypeLiteralRenderer from './type-literal-renderer';
import TypeParameterRenderer from './type-parameter-renderer';

export default class ReflectionFormatter {
  private _renderers: { [kind: number]: ReflectionRenderer } = {};

  constructor() {
    this._renderers[ReflectionKind.ExternalModule] = new ContainerRenderer('module');
    this._renderers[ReflectionKind.Module] = new ContainerRenderer('module');
    this._renderers[ReflectionKind.Class] = new ContainerRenderer('class');
    this._renderers[ReflectionKind.Enum] = new ContainerRenderer('enum');
    this._renderers[ReflectionKind.Interface] = new ContainerRenderer('interface');
    this._renderers[ReflectionKind.Method] = new MethodRenderer();
    this._renderers[ReflectionKind.Constructor] = new MethodRenderer();
    this._renderers[ReflectionKind.CallSignature] = new CallSignatureRenderer();
    this._renderers[ReflectionKind.GetSignature] = new GetSignatureRenderer();
    this._renderers[ReflectionKind.SetSignature] = new SetSignatureRenderer();
    this._renderers[ReflectionKind.ConstructorSignature] = new ConstructorSignatureRenderer();
    this._renderers[ReflectionKind.Accessor] = new AccessorRenderer();
    this._renderers[ReflectionKind.Property] = new PropertyRenderer();
    this._renderers[ReflectionKind.Variable] = new PropertyRenderer();
    this._renderers[ReflectionKind.EnumMember] = new EnumMemberRenderer();
    this._renderers[ReflectionKind.TypeLiteral] = new TypeLiteralRenderer();
    this._renderers[ReflectionKind.TypeAlias] = new TypeAliasRenderer();
    this._renderers[ReflectionKind.Function] = new FunctionRenderer();
    this._renderers[ReflectionKind.Parameter] = new ParameterRenderer();
    this._renderers[ReflectionKind.TypeParameter] = new TypeParameterRenderer();
  }

  public render(reflection?: Reflection, terminatorCharater?: string): string {
    if (reflection) {
      const renderer = this._renderers[reflection.kind];

      if (renderer) {
        return renderer.render(reflection, terminatorCharater);
      }

      throw new Error(`Unrecognised reflection for kind ${reflection.kindString} ${reflection.name}`);
    }

    return '';
  }

  private static _instance: ReflectionFormatter;
  public static instance() {
    if (!ReflectionFormatter._instance) {
      ReflectionFormatter._instance = new ReflectionFormatter();
    }
    return ReflectionFormatter._instance;
  }
}
