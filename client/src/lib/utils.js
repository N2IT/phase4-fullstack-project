import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import GENERAL from '../data/templar_knight_shade/general_values.json';
import FABRIC from '../data/templar_knight_shade/fabric_type.json';
import FRAME from '../data/templar_knight_shade/frame_type.json';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function tksFormat(configurator) {
  let tks = '';
  tks += `${FABRIC.options[configurator.fabric_collection]?.displayName} - ${FABRIC.options[configurator.fabric_collection]?.options[configurator.fabric_color]?.displayName}\n`;
  tks += `${formatInches(configurator.unit_width_in)} (w) x ${formatInches(configurator.unit_height_in)} (h) w/ ${FRAME.options[configurator.frame_color]?.displayName}\n`;
  return tks;
}

