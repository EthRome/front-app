export function formatBalance(balance: string): string {
  const [integerPart, decimalPart] = balance.split('.');

  const formattedDecimal = decimalPart ? decimalPart.slice(0, 6) : '00';

  return decimalPart ? `${integerPart}.${formattedDecimal}` : `${integerPart}.00`;
}
