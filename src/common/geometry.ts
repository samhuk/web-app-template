export type Position = { x: number, y: number }

export type Size = { height: number, width: number }

export type Rect = Position & Size

export enum VerticalDirection {
  UP = 'up',
  DOWN = 'down',
}

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export const distanceBetween = (p1: Position, p2: Position) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
