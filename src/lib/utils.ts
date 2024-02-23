export function formatTimeDiff(createdAt: Date) {
  const currentTime = new Date();
  const timeDiff = Math.abs(currentTime.getTime() - createdAt.getTime());
  const hours = Math.ceil(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (hours < 24 * 7) {
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  } else if (hours < 24 * 30) {
    const weeks = Math.floor(hours / (24 * 7));
    return `${weeks} weeks ago`;
  } else if (hours < 24 * 365) {
    const months = Math.floor(hours / (24 * 30));
    return `${months} months ago`;
  } else {
    const years = Math.floor(hours / (24 * 365));
    return `${years} years ago`;
  }
}

export function formatLargeNumber(number: number) {
  const suffixes = ["", "k", "m", "b", "t"]; // Thousand, Million, Billion, Trillion
  const tier = (Math.log10(Math.abs(number)) / 3) | 0; // Math.floor(Math.log10(Math.abs(number)) / 3)

  if (tier === 0) return number; // If number is less than 1000, return as is

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}
