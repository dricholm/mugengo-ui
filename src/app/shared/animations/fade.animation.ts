import { animation, animate, style } from '@angular/animations';

export const fadeInAnimation = animation([
  style({
    height: '0',
    opacity: '0',
  }),
  animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)'),
]);

export const fadeOutAnimation = animation([
  animate(
    '75ms cubic-bezier(0.4, 0.0, 1, 1)',
    style({
      height: '0',
      opacity: '0',
    })
  ),
]);
