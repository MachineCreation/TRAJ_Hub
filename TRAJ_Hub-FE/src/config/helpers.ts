// splitting and capitalizing "rifle"
export const SplitRifle = (str: string) => {
    if (str.includes("rifle")) {
      return str.replace("rifle", " Rifle");
    }
    return str;
  };

// converting strings to title Case
export const ToTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(/(\s+|-|')/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

// convert strinifyed float to 2 decimal float
export const FormatToTwoDecimals = (floatStr: string): string => {
    const num = parseFloat(floatStr);
    if (isNaN(num)) return floatStr; // Return original if not a valid number
    return num.toFixed(2);
  }