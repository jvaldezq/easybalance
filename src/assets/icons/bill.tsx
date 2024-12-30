import type { HTMLAttributes } from 'react';

export const BillIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="none"
        stroke="#597081"
        d="M0 12.5h15m-15 2h15M2.5 4V2.5H4m7 0h1.5V4m-10 3v1.5H4m7 0h1.5V7m-5 .5a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm-6-7h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
};
