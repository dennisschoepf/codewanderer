import { BehaviorSubject, Subject } from 'rxjs';
import { mp5 } from '../main';

export const playerHeadPosition$ = new Subject<{ x: number; y: number }>();

export const revealedArea$ = new BehaviorSubject<{ x: number; y: number; w: number }>({
  x: 0,
  y: 0,
  w: 0,
});

export function pointIsRevealed(
  point: { x: number; y: number },
  revealedArea: { x: number; y: number; w: number }
): boolean {
  const distanceBetweenPoints = mp5.dist(point.x, point.y, revealedArea.x, revealedArea.y);

  return distanceBetweenPoints < revealedArea.w / 2;
}