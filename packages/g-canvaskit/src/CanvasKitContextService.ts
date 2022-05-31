import type { CanvasLike } from '@antv/g';
import { CanvasConfig, ContextService, isBrowser, isString, setDOMSize } from '@antv/g';
import type { CanvasKit } from 'canvaskit-wasm';
import { CanvasKitInit } from 'canvaskit-wasm';
import { inject, singleton } from 'mana-syringe';

/**
 * @see https://skia.org/docs/user/modules/quickstart/
 */
@singleton({ token: ContextService })
export class CanvasKitContextService implements ContextService<CanvasRenderingContext2D> {
  private $container: HTMLElement | null;
  private $canvas: CanvasLike | null;
  private dpr: number;
  private context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

  @inject(CanvasConfig)
  private canvasConfig: CanvasConfig;

  private canvaskit: CanvasKit;

  async init() {
    const { container, canvas, devicePixelRatio } = this.canvasConfig;

    if (canvas) {
      this.$canvas = canvas;

      if (container && (canvas as HTMLCanvasElement).parentElement !== container) {
        (container as HTMLElement).appendChild(canvas as HTMLCanvasElement);
      }

      this.$container = (canvas as HTMLCanvasElement).parentElement;
      this.canvasConfig.container = this.$container;
    } else if (container) {
      // create container
      this.$container = isString(container) ? document.getElementById(container) : container;
      if (this.$container) {
        // create canvas
        const $canvas = document.createElement('canvas');

        this.$container.appendChild($canvas);
        if (!this.$container.style.position) {
          this.$container.style.position = 'relative';
        }
        this.$canvas = $canvas;
      }
    }

    const ckLoaded = CanvasKitInit({
      locateFile: (file) => 'https://unpkg.com/canvaskit-wasm@0.19.0/bin/' + file,
    });
    const CanvasKit = await ckLoaded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const surface = CanvasKit.MakeCanvasSurface(this.$canvas as HTMLCanvasElement);

    this.context = this.$canvas.getContext('2d');
    // use user-defined dpr first
    let dpr = devicePixelRatio || (isBrowser && window.devicePixelRatio) || 1;
    dpr = dpr >= 1 ? Math.ceil(dpr) : 1;
    this.dpr = dpr;

    this.resize(this.canvasConfig.width, this.canvasConfig.height);
  }

  getContext() {
    return this.context as CanvasRenderingContext2D;
  }

  getDomElement() {
    return this.$canvas;
  }

  getDPR() {
    return this.dpr;
  }

  getBoundingClientRect() {
    if ((this.$canvas as HTMLCanvasElement).getBoundingClientRect) {
      return (this.$canvas as HTMLCanvasElement).getBoundingClientRect();
    }
  }

  destroy() {
    // @ts-ignore
    if (this.$container && this.$canvas && this.$canvas.parentNode) {
      // destroy context
      // @ts-ignore
      this.$container.removeChild(this.$canvas);
    }
  }

  resize(width: number, height: number) {
    if (this.$canvas) {
      // set canvas width & height
      this.$canvas.width = this.dpr * width;
      this.$canvas.height = this.dpr * height;

      // set CSS style width & height
      setDOMSize(this.$canvas, width, height);

      const dpr = this.getDPR();
      // scale all drawing operations by the dpr
      // @see https://www.html5rocks.com/en/tutorials/canvas/hidpi/
      this.context.scale(dpr, dpr);
    }
  }

  applyCursorStyle(cursor: string) {
    if (this.$container && this.$container.style) {
      this.$container.style.cursor = cursor;
    }
  }
}
