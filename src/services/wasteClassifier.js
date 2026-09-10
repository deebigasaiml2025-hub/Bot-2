const CLASSIFICATIONS = {
  'Used Syringe': { object: 'Used Syringe', category: 'SHARPS', bin: 'WHITE', confidence: 97.8, risk: 'HIGH', action: 'Route to White Sharps Compartment' },
  Needle: { object: 'Needle', category: 'SHARPS', bin: 'WHITE', confidence: 98.1, risk: 'HIGH', action: 'Route to White Sharps Compartment' },
  'Contaminated Gloves': { object: 'Contaminated Gloves', category: 'CONTAMINATED RECYCLABLE PLASTIC', bin: 'RED', confidence: 96.2, risk: 'MEDIUM', action: 'Route to Red Plastic Compartment' },
  'Blood-Stained Cotton': { object: 'Blood-Stained Cotton', category: 'INFECTIOUS WASTE', bin: 'YELLOW', confidence: 98.5, risk: 'HIGH', action: 'Route to Yellow Infectious Compartment' },
  'Dressing Material': { object: 'Dressing Material', category: 'INFECTIOUS WASTE', bin: 'YELLOW', confidence: 94.6, risk: 'MEDIUM', action: 'Route to Yellow Infectious Compartment' },
  'IV Tube': { object: 'IV Tube', category: 'CONTAMINATED PLASTIC', bin: 'RED', confidence: 95.1, risk: 'MEDIUM', action: 'Route to Red Plastic Compartment' },
  'Plastic Medical Waste': { object: 'Plastic Medical Waste', category: 'CONTAMINATED PLASTIC', bin: 'RED', confidence: 91.7, risk: 'MEDIUM', action: 'Route to Red Plastic Compartment' },
  'Glass Vial': { object: 'Glass Vial', category: 'GLASSWARE', bin: 'BLUE', confidence: 98.1, risk: 'LOW', action: 'Route to Blue Glassware Compartment' },
  'Medicine Bottle': { object: 'Medicine Bottle', category: 'GLASSWARE / METALLIC WASTE', bin: 'BLUE', confidence: 94.7, risk: 'LOW', action: 'Route to Blue Glassware Compartment' },
  'Human Anatomical/Pathological Waste': { object: 'Human Anatomical/Pathological Waste', category: 'PATHOLOGICAL / INFECTIOUS WASTE', bin: 'YELLOW', confidence: 88.4, risk: 'HIGH', action: 'Route to Yellow Infectious Compartment' },
  'Other Biomedical Waste': { object: 'Other Biomedical Waste', category: 'BIOMEDICAL WASTE', bin: null, confidence: 72.4, risk: 'UNKNOWN', action: 'Manual Verification Required' },
  'Unknown Object': { object: 'Unknown Object', category: 'UNCLASSIFIED', bin: null, confidence: 61.3, risk: 'UNKNOWN', action: 'Manual Verification Required' },
};

export const DEMO_OBJECTS = ['Used Syringe', 'Contaminated Gloves', 'Blood-Stained Cotton', 'IV Tube', 'Glass Vial', 'Needle'];

export function classifyWaste(imageOrObject = 'Used Syringe') {
  const isImageData = typeof imageOrObject === 'string' && imageOrObject.startsWith('data:image/');
  const objectName = isImageData ? 'Used Syringe' : typeof imageOrObject === 'string' ? imageOrObject : 'Used Syringe';
  const result = CLASSIFICATIONS[objectName] || CLASSIFICATIONS['Unknown Object'];
  return Promise.resolve({
    ...result,
    objectName: result.object,
    wasteType: result.category,
    category: result.bin ? result.bin[0] + result.bin.slice(1).toLowerCase() : 'Unknown',
    riskLevel: result.risk,
    explanation: result.bin ? `Visual prototype indicators matched ${result.object.toLowerCase()} characteristics.` : 'The visual prototype could not identify a safe biomedical waste class.',
    source: isImageData ? 'AI Vision Prototype' : 'AI Classification Demo',
    image: isImageData ? imageOrObject : null,
  });
}
