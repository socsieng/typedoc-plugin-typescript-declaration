import AccessorRenderer from './accessor-renderer';
import CallSignatureRenderer from './call-signature-renderer';
import ConstructorSignatureRenderer from './constructor-signature-renderer';
import ContainerRenderer from './container-renderer';
import EnumMemberRenderer from './enum-member-renderer';
import EventRenderer from './event-renderer';
import FunctionRenderer from './function-renderer';
import GetSignatureRenderer from './get-signature-renderer';
import IndexSignatureRenderer from './index-signature-renderer';
import MethodRenderer from './method-renderer';
import ModuleRenderer from './module-renderer';
import ObjectLiteralRenderer from './object-literal-renderer';
import ParameterRenderer from './parameter-renderer';
import ProjectRenderer from './project-renderer';
import PropertyRenderer from './property-renderer';
import { ReflectionKind } from 'typedoc/dist/lib/models';
import ReflectionRenderer from './reflection-renderer';
import SetSignatureRenderer from './set-signature-renderer';
import TypeAliasRenderer from './type-alias-renderer';
import TypeLiteralRenderer from './type-literal-renderer';
import TypeParameterRenderer from './type-parameter-renderer';

export const renderers: { [kind: number]: ReflectionRenderer } = {
  [ReflectionKind.Accessor]: new AccessorRenderer(),
  [ReflectionKind.CallSignature]: new CallSignatureRenderer(),
  [ReflectionKind.Class]: new ContainerRenderer('class'),
  [ReflectionKind.Constructor]: new MethodRenderer(),
  [ReflectionKind.ConstructorSignature]: new ConstructorSignatureRenderer(),
  [ReflectionKind.Enum]: new ContainerRenderer('enum'),
  [ReflectionKind.EnumMember]: new EnumMemberRenderer(),
  [ReflectionKind.Event]: new EventRenderer(),
  [ReflectionKind.ExternalModule]: new ModuleRenderer(),
  [ReflectionKind.Function]: new FunctionRenderer(),
  [ReflectionKind.GetSignature]: new GetSignatureRenderer(),
  [ReflectionKind.Global]: new ProjectRenderer(),
  [ReflectionKind.IndexSignature]: new IndexSignatureRenderer(),
  [ReflectionKind.Interface]: new ContainerRenderer('interface'),
  [ReflectionKind.Method]: new MethodRenderer(),
  [ReflectionKind.Module]: new ModuleRenderer(),
  [ReflectionKind.ObjectLiteral]: new ObjectLiteralRenderer(),
  [ReflectionKind.Parameter]: new ParameterRenderer(),
  [ReflectionKind.Property]: new PropertyRenderer(),
  [ReflectionKind.SetSignature]: new SetSignatureRenderer(),
  [ReflectionKind.TypeAlias]: new TypeAliasRenderer(),
  [ReflectionKind.TypeLiteral]: new TypeLiteralRenderer(),
  [ReflectionKind.TypeParameter]: new TypeParameterRenderer(),
  [ReflectionKind.Variable]: new PropertyRenderer(),
}
