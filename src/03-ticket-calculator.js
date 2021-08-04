/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticket - An object representing data for a single ticket.
 * @param {string} ticket.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticket.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticket.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticket) {
  const ticketType = ticket.ticketType;
  if (ticketData[ticketType] === undefined) {
    return `Ticket type '${ticketType}' cannot be found.`;
  }

  const entrantType = ticket.entrantType;
  if (ticketData[ticketType].priceInCents[entrantType] === undefined) {
    return `Entrant type '${entrantType}' cannot be found.`;
  }

  const extras = ticket.extras;
  let total = ticketData[ticketType].priceInCents[entrantType];
  for (let i = 0; i < extras.length; i++) {
    const extra = extras[i];
    const extraType = ticketData.extras[extra];
    if (extraType === undefined) {
      return `Extra type '${extra}' cannot be found.`;
    }

    const extraPrice = extraType.priceInCents[entrantType];
    total = total + extraPrice;
  }

  return total;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */

/**
 * createDollarString
 * ---------------------
 * Converts a price in cents to a user-facing representation of the price.
 * @param {Number} priceInCents - a number representing the price in cents to be formatted
 * @returns {String} the price converted to dollars proceeded by a dollar sign
 */

function createDollarString(priceInCents) {
  return "$" + (priceInCents / 100).toFixed(2);
}

/**
 * createExtrasString
 * ---------------------
 * Converts a list of extras to a user-facing representation.
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {String[]} extras - a list of extras
 * @returns {String} a list of extras formatted for the user
 */
function createExtrasString(ticketData, extras) {
  if (extras.length === 0) {
    return "";
  }

  let result = " (";
  for (let i = 0; i < extras.length; i++) {
    const extra = extras[i];
    if (i === extras.length - 1) {
      result = result + ticketData.extras[extra].description + ")";
    } else {
      result = result + ticketData.extras[extra].description + ", ";
    }
  }

  return result;
}

function purchaseTickets(ticketData, purchases) {
  let total = 0;
  let result =
    "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  for (let i = 0; i < purchases.length; i++) {
    const ticket = purchases[i];
    const price = calculateTicketPrice(ticketData, ticket);
    if (typeof price === "string") {
      return price;
    }

    const entrantTypeString =
      ticket.entrantType[0].toUpperCase() +
      ticket.entrantType.slice(1).toLowerCase();
    const ticketTypeString = ticketData[ticket.ticketType].description;
    const dollarString = createDollarString(price);
    const extrasString = createExtrasString(ticketData, ticket.extras);
    result =
      result +
      entrantTypeString +
      " " +
      ticketTypeString +
      ": " +
      dollarString +
      extrasString +
      "\n";

    total = total + price;
  }

  result = result + "-------------------------------------------\nTOTAL: ";
  result = result + createDollarString(total);
  return result;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
