// tnb-utils.ts
export function calculateAmountForYear(
  year: number,
  principal: number,
  isDeclared: boolean = false
): number {
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()
  // If calculating for the current year and we're in January or February,
  // only the principal applies (no majorations or default charge).
  if (year === currentYear && (currentMonth === 1 || currentMonth === 2)) {
    return principal
  }

  const def = isDeclared ? 0 : Math.max(principal * 0.15, 500)
  const maj10 = principal * 0.1
  const maj5 = principal * 0.05

  const monthsLate = Math.max((currentYear - year) * 12 + (currentMonth - 3), 0)
  const maj0_5 = principal * 0.005 * monthsLate

  const total = principal + maj10 + maj5 + maj0_5 + def
  return total
}
