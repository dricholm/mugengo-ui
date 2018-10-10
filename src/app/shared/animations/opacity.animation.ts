import { animation, animate, style } from '@angular/animations';

export const fadeInAnimation = animation(
  [
    style({
      opacity: 0,
    }),
    animate('{{ time }} cubic-bezier(0.0, 0.0, 0.2, 1)'),
  ],
  { params: { time: '150ms' } }
);

export const fadeOutAnimation = animation(
  [
    animate(
      '{{ time }} cubic-bezier(0.4, 0.0, 1, 1)',
      style({
        opacity: 0,
      })
    ),
  ],
  { params: { time: '75ms' } }
);
