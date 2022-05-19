import type { RendererConfig } from '@antv/g';
import { AbstractRenderer } from '@antv/g';
import * as DomInteraction from '@antv/g-plugin-dom-interaction';
import * as DeviceRenderer from '@antv/g-plugin-device-renderer';
import * as WebGLDevice from '@antv/g-plugin-webgl-device';
import { ContextRegisterPlugin } from './ContextRegisterPlugin';

export { DomInteraction, DeviceRenderer, WebGLDevice };

interface WebGLRendererConfig extends RendererConfig {
  targets: ('webgl1' | 'webgl2')[];
}

export class Renderer extends AbstractRenderer {
  constructor(config?: Partial<WebGLRendererConfig>) {
    super(config);

    this.registerPlugin(new ContextRegisterPlugin());
    this.registerPlugin(
      new WebGLDevice.Plugin(
        config?.targets
          ? {
              targets: config.targets,
            }
          : {
              targets: ['webgl2', 'webgl1'],
            },
      ),
    );
    this.registerPlugin(new DeviceRenderer.Plugin());
    this.registerPlugin(new DomInteraction.Plugin());
  }
}