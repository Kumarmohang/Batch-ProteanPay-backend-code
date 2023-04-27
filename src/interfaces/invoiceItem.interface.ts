export interface InvoiceItem {
  id: string;
  projectId: string;
  invoiceId: string;
  merchantId: string;
  description: string;
  quantity: number;
  rate: number;
  taxPercent: number;
  extraData: string[];
  customInvoiceIdentifier: string;
  customDirectoryIdentifier: string;
  amount: number;
}
