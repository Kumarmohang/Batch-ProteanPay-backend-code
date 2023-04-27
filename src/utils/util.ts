import _ from 'lodash';
import bigDecimal from 'js-big-decimal';
import { ethers } from 'ethers';
/**
 * This function checks whether value is Empty or not
 *
 * @param value test subject
 * @returns returns boolean value
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * Function to populate invoice items in html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
const populateItemSelector = dataJson => {
  return dataJson.invoice.invoiceItems
    .map(
      invoiceItem =>
        `<tr >
                    <td style="text-align:left;">${invoiceItem.description}
                    ${invoiceItem?.extraData && extraDataPopulate(invoiceItem.extraData) ? extraDataPopulate(invoiceItem.extraData) : ''}
                    </td>
                    <td style="text-align:center;">${
                      invoiceItem?.extraData?.find(item => {
                        return item.keyName === 'patient count';
                      })['value']
                        ? invoiceItem?.extraData?.find(item => {
                            return item.keyName === 'patient count';
                          })['value']
                        : ''
                    }</td>
                    <td style="text-align:center;">${
                      invoiceItem?.extraData?.find(item => {
                        return item.keyName === 'record count';
                      })['value']
                        ? invoiceItem?.extraData?.find(item => {
                            return item.keyName === 'record count';
                          })['value']
                        : ''
                    }</td>
                    <td style="text-align:right">${invoiceItem.amount ? new bigDecimal(invoiceItem.amount).getValue() : 0}</td>
                </tr>`,
    )
    .join('\n');
};

/**
 * Function to populate invoices in receipt html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
const populateReceiptItemSelector = dataJson => {
  return dataJson.invoiceList
    .map(invoiceItem => {
      return `<tr >
                    <td style="text-align:left;word-wrap:break-word;">${invoiceItem.dataValues.customInvoiceIdentifier}
                    ${
                      invoiceItem?.dataValues.extraData && extraDataPopulate(invoiceItem.dataValues.extraData)
                        ? extraDataPopulate(invoiceItem.dataValues.extraData)
                        : ''
                    }
                    </td>
                    <td style="word-wrap:break-word;font-size:11px">${invoiceItem.dataValues.destinationPublicAddress}</td>
                    <td style="text-align:left;">${convert(invoiceItem.dataValues.creationDate)}</td>
                    <td style="text-align:right;word-wrap:break-word;">${
                      invoiceItem.dataValues.totalAmount ? new bigDecimal(invoiceItem.dataValues.totalAmount).getValue() : 0
                    }</td>
                </tr>`;
    })
    .join('\n');
};

/**
 * Function to populate invoice items extra data fields
 *
 * @param extraData - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
const extraDataPopulate = extraData => {
  const data = extraData
    .filter(item => item.keyName !== 'patient count' && item.keyName !== 'record count')
    .map(item => `<p>${item.keyName} : ${item.value}</p>`);
  return data.toString().replace(/,/g, '');
};
/**
 * Function to populate invoice items in html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - total invoice item calculation amount
 */
const getTotalAmount = dataJson => {
  return dataJson.invoice.totalAmount ? new bigDecimal(dataJson.invoice.totalAmount).getValue() : 0;
};

/**
 * Get Gui Value
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - total invoice item calculation amount
 */
const getGasFeeGuiValue = dataJson => {
  const weiValue = ethers.utils.parseUnits(dataJson.transaction.gasFee.toString(), 'ether');
  return ethers.utils.formatUnits(weiValue, 'gwei');
};

/**
 * Get Time Stamp
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - timestamp
 */
const getTimeStamp = dataJson => {
  return dataJson.transaction.updatedAt.toGMTString();
};

/**
 * Function to get discount in html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - total invoice item calculation amount
 */
const getDiscountPercent = dataJson => {
  return dataJson.invoice ? dataJson.invoice.discountPercent : 0;
};

/**
 * Function to get discount amount in html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - total invoice item calculation amount
 */
const getDiscountAmount = dataJson => {
  return dataJson.invoice ? new bigDecimal(dataJson.invoice.discountAmount).getValue() : 0;
};

/**
 * Function to get tax amount in html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - total invoice item calculation amount
 */
const getTaxAmount = dataJson => {
  return dataJson.invoice ? new bigDecimal(dataJson.invoice.taxAmount).getValue() : 0;
};

/**
 * Function to get tax in html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - total invoice item calculation amount
 */
const getTaxPercent = dataJson => {
  return dataJson.invoice ? dataJson.invoice.taxPercent : 0;
};

/**
 * Function to populate invoice items in html template
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - total invoice item calculation amount
 */
const getTotaltxReceiptAmount = dataJson => {
  return new bigDecimal(
    dataJson.invoiceList.reduce((acc, invoiceItem) => acc + (invoiceItem.dataValues.totalAmount ? invoiceItem.dataValues.totalAmount : 0), 0),
  ).getValue();
};
const selectorMap = new Map();

selectorMap.set('ITEMS', populateItemSelector);
selectorMap.set('TOTAL_AMOUNT', getTotalAmount);
selectorMap.set('DISCOUNT', getDiscountPercent);
selectorMap.set('TAX', getTaxPercent);
selectorMap.set('TAX_AMOUNT', getTaxAmount);
selectorMap.set('DISCOUNT_AMOUNT', getDiscountAmount);

const receiptSelectorMap = new Map();
receiptSelectorMap.set('RECEIPT_ITEMS', populateReceiptItemSelector);
receiptSelectorMap.set('TOTAL_TOKEN_AMOUNT', getTotaltxReceiptAmount);
receiptSelectorMap.set('GUI_VALUE', getGasFeeGuiValue);
receiptSelectorMap.set('TIMESTAMP', getTimeStamp);

/**
 * Function to replace selectors from html docstring to it's values
 *
 * @param stringWithSelector - html template docstring
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
export const replaceSelectorToOriginal = (stringWithSelector: string, dataJson: Object): string => {
  return stringWithSelector.replace(/{{(.*?)}}/g, function (_string, match) {
    if (!selectorMap.has(match)) {
      return _.get(dataJson, match, '-');
    }
    return selectorMap.get(match)(dataJson);
  });
};

/**
 * Function to replace selectors from html docstring to it's values
 *
 * @param stringWithSelector - html template docstring
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
export const replaceSelectorReceiptToOriginal = (stringWithSelector: string, dataJson: Object): string => {
  return stringWithSelector.replace(/{{(.*?)}}/g, function (_string, match) {
    if (!receiptSelectorMap.has(match)) {
      return _.get(dataJson, match, '-');
    }
    return receiptSelectorMap.get(match)(dataJson);
  });
};

/**
 * This function convert date string into formatted date
 *
 *@function
 * @param str as a date string
 * @returns formatted string
 */
export function convert(str) {
  const date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join('-');
}
