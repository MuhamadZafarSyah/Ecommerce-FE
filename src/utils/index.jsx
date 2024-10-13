export const generateSelectAmount = (amount) => {
  return Array.from({ length: amount }, (_, i) => {
    const amount = i + 1;
    return (
      <option className="text-black bg-gray-400" key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

export const PriceFormat = (price) => {
  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
  return rupiahFormat;
};
