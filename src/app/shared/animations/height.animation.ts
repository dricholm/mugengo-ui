import { animation, animate, style } from '@angular/animations';

export const expandAnimation = animation(
  [
    style({
      height: 0,
    }),
    animate('{{ time }} cubic-bezier(0.0, 0.0, 0.2, 1)'),
  ],
  { params: { time: '150ms' } }
);

export const collapseAnimation = animation(
  [
    animate(
      '{{ time }} cubic-bezier(0.4, 0.0, 1, 1)',
      style({
        height: 0,
      })
    ),
  ],
  { params: { time: '75ms' } }
);
