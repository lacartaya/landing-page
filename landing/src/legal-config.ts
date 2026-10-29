import identity from './public-identity.json';
// These fields are PUBLIC on the legal notice. Supply only publication-approved data.
export const legal = {
  name: import.meta.env.VITE_LEGAL_NAME || identity.name,
  nif: import.meta.env.VITE_LEGAL_NIF || identity.nif,
  address: import.meta.env.VITE_LEGAL_ADDRESS || identity.address,
  email: 'cartayala@gmail.com',
  phone: '+34 634 752 514',
  reviewed: import.meta.env.VITE_LEGAL_REVIEWED === 'true',
};
export const legalReady = Boolean(legal.nif && legal.address && legal.reviewed);
