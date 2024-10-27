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


export function compChartData(data_set, action, type = null) {
  let older = [];
  let pastSevenDays = [];
  let allTime = [];
  let openTotal = [];

  // Process each customer across all accounts
  data_set.forEach((data) => {
    const currentDate = new Date();
    let createDate = data.created_at && new Date(data.created_at);
    const timeDifference = currentDate - createDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference > 7 && daysDifference <= 14) {
      older.push(data);
    }
    if (daysDifference <= 7) {
      pastSevenDays.push(data);
    }
    if (action === 'open total') {
      openTotal.push(data.sale_price);
    }
    if (action === 'get total') {
      allTime.push(data.sale_price);
    }
  });

  // Return the total sales if requested
  if (type === 'dollar') {
    return allTime.reduce((a, b) => a + b, 0);
  }

  if (action === 'open total') {
    return openTotal.reduce((a, b) => a + b, 0);
  }

  // Return the number of recent customers if requested
  if (action === 'show all') {
    return data_set.length;
  }

  if (action === 'get recent') {
    if (pastSevenDays.length === 0) {
      return `Nothing new this week`;
    }

    if (pastSevenDays.length === 1) {
      return pastSevenDays.length + ` new this week`;
    }

    return pastSevenDays.length;
  }

  // Handle the case where no data to compare
  if (older.length === 0) {
    return `Nothing from the previous week to compare`;
  }

  // Calculate the percentage change from last week
  let calculated = (pastSevenDays.length - older.length) / older.length;
  return calculated.toFixed(2) + '%' + " from last week";
};

