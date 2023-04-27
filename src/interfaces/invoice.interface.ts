type payerObject = {
  email: string;
  payerText: string;
};
export interface Invoice {
  id: string;
  customDirectoryIdentifier: string;
  customInvoiceIdentifier: string;
  projectId: string;
  merchantId: string;
  creationDate: string;
  from: string;
  to: string;
  tags: Array<string>;
  memo: string;
  extraData: Array<string>;
  payer: payerObject;
  tokenSymbol: string;
  tokenName: string;
  tokenId: string;
  blockChainId: string;
  finalPaymentAmonut: string;
  finalPaymentCurrency: string;
  allowedPaymentCurrency: string;
  status: string;
  isDeleted: boolean;
  transactionId: string;
  destinationPublicAddress: string;
  taxPercent: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
}
