// Removes floating point noise from a result, so 0.1 + 0.2 shows 0.3 instead of 0.30000000000000004
export function formatNumber(value) {
  return String(parseFloat(value.toPrecision(12)))
}
