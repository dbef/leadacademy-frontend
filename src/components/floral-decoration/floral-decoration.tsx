'use client';

// Sparse falling flowers across the full viewport.
// pointer-events: none so nothing is blocked.

// ----------------------------------------------------------------------

// Site palette — petals use the main brand color, centre is white
const GREEN  = { petal: '#3F8A62', center: '#ffffff', inner: '#DCEFE1' };
const PURPLE = { petal: '#8E33FF', center: '#ffffff', inner: '#EFD6FF' };
const YELLOW = { petal: '#FFAB00', center: '#ffffff', inner: '#FFF5CC' };

type Color = typeof GREEN;

type FlowerDef = {
  left: string;
  delay: string;
  duration: string;
  size: number;
  anim: 'a' | 'b' | 'c';
  type: 'daisy' | 'petal';
  color: Color;
};

const FLOWERS: FlowerDef[] = [
  { left: '4%',  delay: '-3s',  duration: '14s', size: 14, anim: 'a', type: 'daisy', color: GREEN  },
  { left: '13%', delay: '-10s', duration: '11s', size: 11, anim: 'b', type: 'petal', color: PURPLE },
  { left: '27%', delay: '-5s',  duration: '16s', size: 15, anim: 'c', type: 'daisy', color: YELLOW },
  { left: '39%', delay: '-8s',  duration: '12s', size: 10, anim: 'a', type: 'petal', color: GREEN  },
  { left: '51%', delay: '-1s',  duration: '15s', size: 13, anim: 'b', type: 'daisy', color: PURPLE },
  { left: '64%', delay: '-13s', duration: '13s', size: 12, anim: 'c', type: 'petal', color: YELLOW },
  { left: '75%', delay: '-6s',  duration: '14s', size: 15, anim: 'a', type: 'daisy', color: GREEN  },
  { left: '86%', delay: '-4s',  duration: '11s', size: 11, anim: 'b', type: 'petal', color: PURPLE },
  { left: '44%', delay: '-15s', duration: '17s', size: 12, anim: 'c', type: 'petal', color: YELLOW },
  { left: '91%', delay: '-9s',  duration: '13s', size: 14, anim: 'a', type: 'daisy', color: GREEN  },
];

// ----------------------------------------------------------------------

function Daisy({ size, color }: { size: number; color: Color }) {
  return (
    <svg width={size * 2.4} height={size * 2.4} viewBox="-10 -10 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="0" cy="-6.2" rx="2.8" ry="5.2" fill={color.petal} opacity="0.92" />
      <ellipse cx="0" cy="-6.2" rx="2.8" ry="5.2" fill={color.petal} opacity="0.92" transform="rotate(72)"  />
      <ellipse cx="0" cy="-6.2" rx="2.8" ry="5.2" fill={color.petal} opacity="0.92" transform="rotate(144)" />
      <ellipse cx="0" cy="-6.2" rx="2.8" ry="5.2" fill={color.petal} opacity="0.92" transform="rotate(216)" />
      <ellipse cx="0" cy="-6.2" rx="2.8" ry="5.2" fill={color.petal} opacity="0.92" transform="rotate(288)" />
      <circle r="3.5" fill={color.center} opacity="0.95" />
      <circle r="2"   fill={color.inner}  />
    </svg>
  );
}

function Petal({ size, color }: { size: number; color: Color }) {
  return (
    <svg width={size * 1.4} height={size * 2} viewBox="-5 -9 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="0" cy="0" rx="4.2" ry="8" fill={color.petal}  opacity="0.88" />
      <ellipse cx="0" cy="1" rx="2"   ry="6" fill={color.center} opacity="0.4"  />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function FloralDecoration() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {FLOWERS.map((f, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: f.left,
            opacity: 0,
            animation: `petal-fall-${f.anim} ${f.duration} ${f.delay} ease-in infinite`,
          }}
        >
          {f.type === 'daisy' ? <Daisy size={f.size} color={f.color} /> : <Petal size={f.size} color={f.color} />}
        </div>
      ))}
    </div>
  );
}
