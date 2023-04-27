/* eslint-disable valid-jsdoc */
const _ = require('lodash');

const template = `<html>
<head>
    <title>HTML Content</title>
    <style>
        .rectangleDiv {
/* position: absolute;
top: 58px;
left: 218px;
border-radius: 12px;
background-color: var(--color-white);
box-shadow: 0 16px 47px 12px rgba(205, 204, 204, 0.25);
width: 1004px;
height: 1265px; */
}
.onBehalfOfHospitalName {
position: absolute;
top: 276px;
left: 100px;
font-weight: 500;
color: var(--color-black);
display: inline-block;
}
.grabenstrasse25P {
margin-block-start: 0;
margin-block-end: 0;
}
.supportamritaiWwwamrita {
margin: 0;
}
.grabenstrasse256340BaarSwi {
position: absolute;
top: 333px;
left: 100px;
font-weight: 500;
color: var(--color-black);
display: inline-block;
}
.invoiceTOSpan {
font-weight: 600;
color: #005cf6;
}
.mrDr {
margin-block-start: 0;
margin-block-end: 0;
color: var(--color-black);
}
.streetAddressSpan {
font-weight: 500;
}
.invoiceTOMrDrPharmaCo {
position: absolute;
top: 478px;
left: 100px;
display: inline-block;
}
.fORSpan {
font-weight: 600;
font-family: var(--font-montserrat);
color: #005cf6;
}
.fORResearchProjectNameProj {
top: 478px;
left: 746px;
color: var(--color-black);
}
.fORResearchProjectNameProj,
.iNVOICEB,
.iNVOICENOInvoiceNoDATEE {
position: absolute;
display: inline-block;
}
.iNVOICENOInvoiceNoDATEE {
top: 333px;
left: 746px;
color: var(--color-black);
}
.iNVOICEB {
top: 193px;
left: 100px;
font-size: 35px;
color: #005cf6;
}
.recordMatchedDiv,
.tHANKYOUFORYOURBUSINESS {
position: absolute;
font-weight: 600;
color: #005cf6;
display: inline-block;
}
.tHANKYOUFORYOURBUSINESS {
top: 1137px;
left: 350px;
font-size: 22.47px;
line-height: 231.9%;
}
.recordMatchedDiv {
top: 688px;
left: 100px;
}
.bloodReportDiv {
position: absolute;
top: 762px;
left: 100px;
font-weight: 500;
display: inline-block;
}
.cTScanDiv {
left: 100px;
}
.cTScanDiv,
.div,
.mRIDiv {
position: absolute;
font-weight: 500;
display: inline-block;
}
.mRIDiv {
left: 100px;
}
.cTScanDiv {
top: 832px;
}
.mRIDiv {
top: 906px;
}
.div,
.div1 {
top: 762px;
left: 375px;
width: 10px;
}
.div1 {
left: 600px;
width: 9px;
}
.div1,
.div2,
.div3 {
position: absolute;
font-weight: 500;
display: inline-block;
}
.div2 {
top: 762px;
left: 870px;
text-align: right;
}
.div3,
.div4 {
top: 832px;
left: 375px;
width: 8px;
}
.div4 {
left: 600px;
width: 9px;
}
.div4,
.div5,
.div6 {
position: absolute;
font-weight: 500;
display: inline-block;
}
.div5 {
top: 906px;
left: 600px;
width: 8px;
}
.div6 {
top: 832px;
left: 870px;
text-align: right;
}
.div7 {
top: 906px;
left: 375px;
width: 9px;
}
.div7,
.div8,
.enterDescriptionn4 {
position: absolute;
font-weight: 500;
display: inline-block;
}
.div8 {
top: 906px;
left: 870px;
text-align: right;
}
.enterDescriptionn4 {
top: 972px;
left: 100px;
font-size: 13.97px;
}
.patientsMAtchedDiv,
.recordsMatchedDiv {
position: absolute;
top: 688px;
left: 325px;
font-weight: 600;
color: #005cf6;
display: inline-block;
}
.recordsMatchedDiv {
left: 550px;
}
.amountButton {
position: absolute;
font-weight: 600;
color: #005cf6;
top: 688px;
left: 850px;
}
.totalAmountDiv,
.totalDiv {
position: absolute;
top: 1042px;
left: 850px;
font-weight: 600;
color: #005cf6;
text-align: right;
display: inline-block;
}
.totalDiv {
left: 100px;
}
.vectorIcon,
.vectorIcon1 {
position: absolute;
top: 662.25px;
left: 307px;
width: 826px;
height: 1.49px;
}
.vectorIcon1 {
top: 732.25px;
}
.vectorIcon2 {
top: 802.25px;
}
.vectorIcon2,
.vectorIcon3,
.vectorIcon4,
.vectorIcon5,
.vectorIcon6 {
position: absolute;
left: 307px;
width: 826px;
height: 1.49px;
}
.vectorIcon3 {
top: 872.25px;
}
.vectorIcon4 {
top: 943.25px;
}
.vectorIcon5 {
top: 1013.25px;
}
.vectorIcon6 {
top: 1083.25px;
}
.desktop1 {
/* position: relative; */
background-color: var(--color-white);
width: 100%;
/* height: 1393px; */
overflow: hidden;
text-align: left;
font-size: var(--font-size-base);
color: var(--color-gray);
font-family: var(--font-montserrat);
}
    </style>
</head>
<div class="desktop1">
  <div class="rectangleDiv" />
  <div class="onBehalfOfHospitalName">
     {{from}}
  </div>
  <div class="grabenstrasse256340BaarSwi">
    <p class="grabenstrasse25P">Grabenstrasse 25</p>
    <p class="grabenstrasse25P">6340 Baar</p>
    <p class="grabenstrasse25P">Switzerland</p>
    <p class="grabenstrasse25P">Phone Enter phone no.</p>
    <p class="supportamritaiWwwamrita">
      support@amrit.ai | www.amrit.ai
    </p>
  </div>
  <div class="invoiceTOMrDrPharmaCo">
    <p class="grabenstrasse25P">
      <span class="invoiceTOSpan">Invoice TO</span>
    </p>
        {{invoice.payer.payerText}}
    <!-- <p class="mrDr">
      <span class="streetAddressSpan">Mr. / Dr.</span>
    </p>
    <p class="grabenstrasse25P">
      <span class="streetAddressSpan">Pharma Company name</span>
    </p>
    <p class="grabenstrasse25P">
      <span class="streetAddressSpan">Street address</span>
    </p>
    <p class="grabenstrasse25P">
      <span class="streetAddressSpan">
        City, County, Postcode
      </span>
    </p>
    <p class="grabenstrasse25P">
      <span class="streetAddressSpan">
        Phone Enter phone no. | Email address
      </span>
    </p>
    <p class="supportamritaiWwwamrita">
      <span class="streetAddressSpan">Oncocoin ID</span>
    </p> -->
  </div>
  <div class="fORResearchProjectNameProj">
    <p class="grabenstrasse25P">
      <span class="fORSpan">FOR </span>
      <span class="streetAddressSpan">
        {{invoice.directory.name}}
      </span>
    </p>
    <p class="grabenstrasse25P">
      <span class="streetAddressSpan">Project Code</span>
    </p>
    <p class="supportamritaiWwwamrita">
    <span class="fORSpan">PO NO</span>
      <span class="streetAddressSpan">{{invoice.customDirectoryIdentifier}}</span> 
    </p>
  </div>
  <div class="iNVOICENOInvoiceNoDATEE">
    <p class="grabenstrasse25P">
      <span class="fORSpan">INVOICE NO.</span>
      <span class="streetAddressSpan"> {{invoice.customInvoiceIdentifier}}</span>
    </p>
    <p class="supportamritaiWwwamrita">
      <span class="fORSpan">DATE</span>
      <span class="streetAddressSpan">{{invoice.creationDate}}</span>
    </p>
  </div>
  <b class="iNVOICEB">INVOICE</b>
  <div class="tHANKYOUFORYOURBUSINESS">
    THANK YOU FOR YOUR BUSINESS.
  </div>
  <div class="recordMatchedDiv">Description</div>
  <div class="bloodReportDiv">{{invoice.invoiceItems.description}}</div>
  {{ITEMS}}
  <!-- <div class="enterDescriptionn4">Enter descriptionn 4</div> -->
  <div class="patientsMAtchedDiv">quantity</div>
  <div class="recordsMatchedDiv">Rate</div>
  <div
    class="amountButton"
    type="text"
    size="middle"
    shape="default"
  >
    Amount
  </div>
  <div class="totalAmountDiv">Total Amount: {{TOTAL_AMOUNT}}</div>
  <!-- <div class="totalDiv">Total</div> -->
  <img class="vectorIcon" alt="" src="../vector-1.svg" />
  <img class="vectorIcon1" alt="" src="../vector-1.svg" />
  <img class="vectorIcon2" alt="" src="../vector-1.svg" />
  <img class="vectorIcon3" alt="" src="../vector-1.svg" />
  <img class="vectorIcon4" alt="" src="../vector-1.svg" />
  <img class="vectorIcon5" alt="" src="../vector-1.svg" />
  <img class="vectorIcon6" alt="" src="../vector-7.svg" />
</div>
</html>`;

/**
 * Function to replace selectors from html docstring to it's values
 *
 * @param stringWithSelector - html template docstring
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
const populateItemSelector = dataJson => {
  return dataJson.invoice.invoiceItems
    .map(
      invoiceItem =>
        `<div class="bloodReportDiv">${invoiceItem.description}</div>
    <div class="div">${invoiceItem.quantity}</div>
    <div class="div1">${invoiceItem.rate}</div>
    <div class="div2">${invoiceItem.quantity * invoiceItem.rate}</div>`,
    )
    .join('\n');
};

/**
 * Function to replace selectors from html docstring to it's values
 *
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
const getTotalAmount = dataJson => {
  return dataJson.invoice.invoiceItems.reduce((acc, invoiceItem) => acc + invoiceItem.quantity * invoiceItem.rate, 0);
};

const selectorMap = new Map();

selectorMap.set('ITEMS', populateItemSelector);
selectorMap.set('TOTAL_AMOUNT', getTotalAmount);
/**
 * Function to replace selectors from html docstring to it's values
 *
 * @param stringWithSelector - html template docstring
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
const replaceSelectorToOriginal = (stringWithSelector, dataJson) => {
  return stringWithSelector.replace(/{{(.*?)}}/g, function (_string, match) {
    if (!selectorMap.has(match)) {
      return _.get(dataJson, match, '-');
    }
    return selectorMap.get(match)(dataJson);
  });
};

console.log(replaceSelectorToOriginal(template, dataJson));
