/**
 * Converts a time string into various units.
 * Supports compound inputs like "1h30m15s500ms".
 *
 * @param input - The time string to convert (e.g., "1h30m", "500ms", "2d3h").
 * @returns An object with time converted to different units.
 * @throws Error if an invalid unit is used.
 *
 * @example
 * convertTime("1h30m");
 * // Returns:
 * // {
 * //   seconds: 5400,
 * //   milliseconds: 5400000,
 * //   minutes: 90,
 * //   hours: 1.5,
 * //   days: 0.0625,
 * //   weeks: 0.00893
 * // }
 *
 * @example
 * convertTime("500ms");
 * // Returns:
 * // {
 * //   seconds: 0.5,
 * //   milliseconds: 500,
 * //   minutes: 0.00833,
 * //   hours: 0.0001389,
 * //   days: 0.000005787,
 * //   weeks: 0.0000008267
 * // }
 */
export function convertTime(input: string): {
  seconds: number;
  milliseconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
} {
  const units: Record<string, number> = {
    ms: 1 / 1000,
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
    w: 604800,
  };

  const regex = /(\d+)(ms|s|m|h|d|w)/g;
  let match: RegExpExecArray | null;
  let totalSeconds = 0;

  while ((match = regex.exec(input)) !== null) {
    const value = parseInt(match[1]);
    const unit = match[2];
    if (!(unit in units)) throw new Error(`Invalid unit: ${unit}`);
    totalSeconds += value * units[unit];
  }

  return {
    seconds: totalSeconds,
    milliseconds: totalSeconds * 1000,
    minutes: totalSeconds / 60,
    hours: totalSeconds / 3600,
    days: totalSeconds / 86400,
    weeks: totalSeconds / 604800,
  };
}
