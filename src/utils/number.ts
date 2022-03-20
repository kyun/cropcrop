const between = function (target: number, a: number, b: number): boolean {
  const min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return target > min && target < max;
};

export { between };
