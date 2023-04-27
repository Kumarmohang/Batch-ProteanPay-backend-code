export interface TransactionDirectory {
  id: string;
  status: 'initiated' | 'complete' | 'failed' | 'pending';
  txHash: string;
  callerAddress: string;
  type: 'approval' | 'payment';
  gasFee: number;
  blockNo: string;
}

export interface TransactionInvoiceMappingDirectory {
  id: number;
  transactionId: string;
  invoiceId: string;
}

export interface TransactionRequestData {
  payerPublicAddress: string;
  invoiceIds: string[];
  type: string;
}

export interface TransactionBody {
  status: string;
  txHash: string;
  callerAddress: string;
  type: string;
}

export interface TransactionUpdateRequestData {
  txnHash: string;
  txnId: string;
  status: string;
  gasFee: number;
  blockNo: string;
}
