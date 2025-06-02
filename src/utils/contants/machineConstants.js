// Machine types available in the system, matching backend constants
export const MACHINE_TYPES = [
  { label: 'Cutting', value: 'Cutting' },
  { label: 'Stitching', value: 'Stitching' },
  { label: 'Logo Printing', value: 'Logo Printing' },
  { label: 'Fabric Pricing', value: 'Fabric Pricing' },
  { label: 'Packaging', value: 'Packaging' },
];

// Map module types to machine types (matching backend mapping)
export const MODULE_TO_MACHINE_MAP = {
  CuttingModule: 'Cutting',
  StitchingModule: 'Stitching',
  LogoPrintingModule: 'Logo Printing',
  FabricPricingModule: 'Fabric Pricing',
  PackagingModule: 'Packaging',
}; 