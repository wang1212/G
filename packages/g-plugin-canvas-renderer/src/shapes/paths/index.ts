import { ShapeAttrs } from '@antv/g';

export const PathGeneratorFactory = Symbol('PathGeneratorFactory');
export const PathGenerator = Symbol('Path');
export type PathGenerator = (context: CanvasRenderingContext2D, attributes: ShapeAttrs) => void;

export { generatePath as CirclePath } from './Circle';
export { generatePath as EllipsePath } from './Ellipse';
export { generatePath as RectPath } from './Rect';
export { generatePath as LinePath } from './Line';
export { generatePath as PolylinePath } from './Polyline';
export { generatePath as PolygonPath } from './Polygon';