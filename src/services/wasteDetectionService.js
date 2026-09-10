import { classifyWaste } from './wasteClassifier';

// Replace mock classifier with real computer vision model here.
export function detectWaste(imageData) {
  return classifyWaste(imageData);
}
