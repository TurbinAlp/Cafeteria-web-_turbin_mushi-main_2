const useRandomNumberGenerator = () => {
  const totalSalesGenerator = (): string => {
    return Math.round(Math.random() * 100000).toFixed(2);
  };

  return { totalSalesGenerator };
};

export default useRandomNumberGenerator;
