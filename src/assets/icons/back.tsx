import type { HTMLAttributes } from 'react';

export const BackIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12.5"
      height="25"
      viewBox="0 0 12 24"
      {...props}
    >
      <path
        fill="#597081"
        fillRule="evenodd"
        d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
      />
    </svg>
  );
};
