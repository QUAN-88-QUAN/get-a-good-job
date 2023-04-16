function getCurvePoints(curveFunc, range, number, xLength) {
  if (number < 1) {
    return [];
  }
  if (number === 1) {
    return [0];
  }
  // 每一份的偏移值
  const piece = (range[1] - range[0]) / (number - 1);
  console.log(piece)
  // 缩放
  const scale = xLength / (range[1] - range[0]);
  const result = [];
  for (i = 0; i < number; i++) {
    result.push(-curveFunc(i * piece + range[0]) * scale);
  }
  return result;
}
