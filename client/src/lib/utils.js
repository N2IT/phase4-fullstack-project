import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
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

    // if (data.status === 'closed') {
    //   return;
    // }

    if (data.status === 'closed') {
      return;
    }

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
    // return allTime to two decimal places
    return allTime.reduce((a, b) => a + b, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (action === 'open total') {
    return openTotal.reduce((a, b) => a + b, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // Return the number of recent customers if requested
  if (action === 'show all') { 
    return data_set.length;
  }

  if (action === 'get recent') {
    if (pastSevenDays.length === 0) {
      return `Nothing new this week`;
    }

    if (pastSevenDays.length >= 1) {
      return pastSevenDays.length + ` new this week`;
    }

    return pastSevenDays.length;
  }

  if (action ==='get recent' && type === 'dollar') {
    return pastSevenDays.reduce((a, b) => a + b, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Handle the case where no data to compare
  if (older.length === 0) {
    return 'No data from prior week';
  }

  // Calculate the percentage change from last week
  let calculated = (pastSevenDays.length - older.length) / older.length;
  return calculated.toFixed(2) + '%' + " from last week";
};

// show sales revenue for the past 7 days
export function showRecentSales(data_set) {
  let pastSevenDays = [];
  data_set.forEach((data) => {
    const currentDate = new Date();
    let createDate = data.created_at && new Date(data.created_at);
    const timeDifference = currentDate - createDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    if (daysDifference <= 7) {
      pastSevenDays.push(data.sale_price);
    }
  });
  return pastSevenDays.reduce((a, b) => a + b, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' new this week';
}

// show quotes with status != 'closed'
export function showOpenQuotes(data_set) {
  let openQuotes = [];
  data_set.forEach((data) => {
    if (data.status !== 'closed') {
      openQuotes.push(data);
    }
  });
  return openQuotes.length;
}

//show quote dollar value difference from last week
export function showQuoteDifference(data_set) {
  let older = [];
  let pastSevenDays = [];
  data_set.forEach((data) => {
    const currentDate = new Date();
    let createDate = data.created_at && new Date(data.created_at);
    const timeDifference = currentDate - createDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    if (daysDifference > 7 && daysDifference <= 14) {
      older.push(data.sale_price);
    }
    if (daysDifference <= 7) {
      pastSevenDays.push(data.sale_price);
    }
  });
  if (older.length === 0) {
    return 'No data from prior week';
  }
  let calculated = (pastSevenDays.reduce((a, b) => a + b, 0) - older.reduce((a, b) => a + b, 0)) / older.reduce((a, b) => a + b, 0);
  return calculated.toFixed(2) + '%';
}

