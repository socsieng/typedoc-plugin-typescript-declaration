import { Component, RendererComponent } from 'typedoc/dist/lib/output/components';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models';
import Renderer from './render/renderer';
import ContainerRenderer from './render/container-renderer';

const renderers: { [kind: number]: Renderer } = {};
renderers[ReflectionKind.Class] = new ContainerRenderer('class');
renderers[ReflectionKind.Enum] = new ContainerRenderer('enum');
renderers[ReflectionKind.Interface] = new ContainerRenderer('interface');

@Component({ name: 'render-component'})
export default class TypeScriptDeclarationRenderer extends RendererComponent {
  private _renders: string[] = [];

  protected initialize() {
    this.listenTo(this.owner, {
      [RendererEvent.BEGIN]: this.onRenderBegin,
    });
  }

  private onRenderBegin(event: RendererEvent) {
    const reflections = event.project.reflections;

    Object.values(reflections).forEach(reflection => {
      this.render(reflection);
    });
  }

  private render(reflection: Reflection) {
  }
}
