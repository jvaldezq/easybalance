export const USDFormatter = (number: number) => {
  const options = { style: 'currency', currency: 'USD' };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(number);
};

export const CRCFormatter = (number: number) => {
  const options = { style: 'currency', currency: 'CRC' };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const formatter = new Intl.NumberFormat('es-CR', options);
  return formatter.format(number);
};

export const NumberFormatter = (number: number) => {
  const formatter = new Intl.NumberFormat();
  return formatter.format(number);
};

export const PercentageFormatter = (
  number: number,
  maximumFractionDigits: number = 2,
) => {
  const options = {
    style: 'percent',
    maximumFractionDigits: maximumFractionDigits,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const formatter = new Intl.NumberFormat(undefined, options);
  return formatter.format(number);
};
