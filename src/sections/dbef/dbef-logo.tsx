import React from 'react';

type DbefLogoProps = {
  width?: number;
  height?: number;
  fill?: string;
};

export default function DBEFLogo({ width = 80, height = 80, fill = "white" }: DbefLogoProps): React.JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.9152 0H15.8926V8L11.8931 4.84L7.89363 8V0H0V80H39.9152C61.9595 80 79.8304 62.0912 79.8304 40C79.8304 17.9088 61.9595 0 39.9152 0ZM18.9437 13.416H42.8928C49.506 13.416 54.8674 18.7888 54.8674 25.416C54.8674 32.0432 49.506 37.416 42.8928 37.416H18.9437V13.416ZM42.9376 66.856H18.9884V42.856H42.9376C49.5507 42.856 54.9121 48.2288 54.9121 54.856C54.9121 61.4832 49.5507 66.856 42.9376 66.856Z"
        fill={fill}
      />
    </svg>
  );
}
