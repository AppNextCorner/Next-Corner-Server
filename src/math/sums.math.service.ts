
export default class mathSummationService {
  public async Σ(arr: number[]) {
    const λ = await arr.reduce(
      (n: number, currentValue: any) => n + currentValue,
      0
    );
    return λ;
  }

  public async average(arr: number[], listLength: number) {
    const sum = await this.Σ(arr);
    return sum / listLength;
  }
}
