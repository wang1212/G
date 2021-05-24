import { vec3 } from 'gl-matrix';
import { injectable } from 'inversify';
import { GeometryAABBUpdater } from '.';
import { AABB } from '../../shapes';
import { ShapeAttrs } from '../../types';

@injectable()
export class PolylineUpdater implements GeometryAABBUpdater {
  dependencies = ['points', 'lineWidth', 'anchor'];

  update(attributes: ShapeAttrs, aabb: AABB) {
    const { lineWidth = 0, anchor = [0, 0] } = attributes;
    const points = attributes.points as number[][];
    const minX = Math.min(...points.map((point) => point[0]));
    const maxX = Math.max(...points.map((point) => point[0]));
    const minY = Math.min(...points.map((point) => point[1]));
    const maxY = Math.max(...points.map((point) => point[1]));

    // anchor is left-top by default
    attributes.x = minX;
    attributes.y = minY;

    const width = maxX - minX;
    const height = maxY - minY;

    const halfExtents = vec3.fromValues(width / 2, height / 2, 0);
    const center = vec3.fromValues((1 - anchor[0] * 2) * halfExtents[0], (1 - anchor[1] * 2) * halfExtents[1], 0);

    vec3.add(halfExtents, halfExtents, vec3.fromValues(lineWidth, lineWidth, 0));
    aabb.update(center, halfExtents);
  }
}