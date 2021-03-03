import { ContextService, ContributionProvider, DefaultShapeRenderer } from '@antv/g-core';
import { Entity } from '@antv/g-ecs';
import { inject, injectable, named } from 'inversify';

export const StyleRendererContribution = Symbol('StyleRendererContribution');
export interface StyleRendererContribution {
  apply(entity: Entity, context: CanvasRenderingContext2D): void;
}

@injectable()
export abstract class BaseRenderer extends DefaultShapeRenderer {
  @inject(ContextService)
  protected contextService: ContextService<CanvasRenderingContext2D>;

  @inject(ContributionProvider)
  @named(StyleRendererContribution)
  protected handlers: ContributionProvider<StyleRendererContribution>;

  abstract generatePath(entity: Entity): void;

  public onAttributeChanged(entity: Entity, name: string, value: any) {
    super.onAttributeChanged(entity, name, value);
  }

  render(entity: Entity) {
    const context = this.contextService.getContext();

    if (context) {
      context.save();
      context.beginPath();

      // implemented by subclass
      this.generatePath(entity);

      this.handlers.getContributions().forEach((handler) => {
        handler.apply(entity, context);
      });

      context.closePath();
      context.restore();
    }
  }
}