import type { HTMLAttributes } from 'react';

export const CreditIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#597081"
        d="M18.025 22q-2.1 0-3.562-1.45T13 17t1.463-3.55T18.025 12q2.075 0 3.525 1.463T23 17t-1.45 3.538T18.025 22M4 18v-8v.325V6zM4 8h16V6H4zm0 12q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v3.95q0 .45-.387.663t-.813.012q-.65-.3-1.388-.463T17.9 10q-1.425 0-2.687.538T13 12H4v6h6.575q.425 0 .713.288t.287.712t-.287.713t-.713.287zm14.5-3.2v-2.3q0-.2-.15-.35T18 14t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"
      />
    </svg>
  );
};
