const Σ = async (arr: number[]) => {
  const λ = await arr.reduce(
    (n: number, currentValue: any) => n + currentValue,
    0
  );
  return λ;
};

export default Σ;
