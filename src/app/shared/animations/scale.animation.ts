import { animation, animate, style } from '@angular/animations';

export const scaleUpAnimation = animation(
  [
    style({
      transform: 'scale({{ from }})',
    }),
    animate(
      '{{ time }} cubic-bezier(0.0, 0.0, 0.2, 1)',
      style({ transform: 'scale(1)' })
    ),
  ],
  { params: { from: 0.5, time: '150ms' } }
);
export const scaleDownAnimation = animation(
  [
    style({
      transform: 'scale(1)',
    }),
    animate(
      '{{ time }} cubic-bezier(0.0, 0.0, 0.2, 1)',
      style({ transform: 'scale({{ to }})' })
    ),
  ],
  { params: { to: 0.5, time: '75ms' } }
);
