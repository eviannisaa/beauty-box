export const formatAmount = (price: number) => {
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2, // Set minimum decimal places
      maximumFractionDigits: 2, // Set maximum decimal places
    }).format(amount);
  };

  return formatIDR(Number(price));
};
