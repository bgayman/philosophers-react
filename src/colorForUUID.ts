import backgroundColors from './backgroundColor';
import colorPairs from './colorPairs';

// Create a map to store UUID-to-color associations
const uuidColorMap: Map<string, string> = new Map();
const uuidColorPairsMap: Map<string, string[]> = new Map();

var count = 0;

// Function to get a color for a given UUID
export function getColorForUUID(uuid: string): string {
  // Check if the UUID already has an associated color
  if (uuidColorMap.has(uuid)) {
    return uuidColorMap.get(uuid) as string; // Return the existing color
  }

  // If no color is associated, pick a random color
  const colorKeys = Object.keys(backgroundColors); // Get all the color keys
  const randomColorKey = colorKeys[Math.floor(count % colorKeys.length)]; // Pick a random key
  const selectedColor = backgroundColors[randomColorKey as keyof typeof backgroundColors]; // Get the color value

  // Associate the random color with the UUID
  uuidColorMap.set(uuid, selectedColor);
  count += 1;

  return selectedColor; // Return the newly assigned color
}

var pairsCount = 0;

export function getColorPairsForUUID(uuid: string): string[] {
  // Check if the UUID already has an associated color
  if (uuidColorPairsMap.has(uuid)) {
    return uuidColorPairsMap.get(uuid) as string[]; // Return the existing color
  }

  // If no color is associated, pick a random color
  const colorPair = colorPairs[Math.floor(pairsCount % colorPairs.length)]; // Pick a random key

  // Associate the random color with the UUID
  uuidColorPairsMap.set(uuid, colorPair);
  pairsCount += 1;

  return colorPair; // Return the newly assigned color
}