const useRandomNumberGenerator = () => {
  const totalSalesGenerator = (): string => {
    return Math.round(Math.random() * 100000).toFixed(2);
  };

  const menuPriceGenerator = (): string => {
    return String(Math.round(Math.random() * 5000));
  };

  return { totalSalesGenerator, menuPriceGenerator };
};

export default useRandomNumberGenerator;
