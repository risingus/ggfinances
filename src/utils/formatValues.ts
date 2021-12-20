


export function formatNumberToMoney(value: number) {
  const amount = Number(value).toLocaleString(
    'pt-Br',
    {
      style: 'currency',
      currency: 'BRL'
    }
  );

  return amount;
}

export function formatStringToDate(value: string | Date) {
  const formatedDate = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(value));

  return formatedDate;

}

export function formatStringToDateBig(value: string | Date) {
  const formatedDate = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
  }).format(new Date(value));

  return formatedDate;

}