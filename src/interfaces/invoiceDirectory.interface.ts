import { Model } from 'sequelize';
export interface InvoiceDirectory extends Model {
  id: string;
  name: string;
  customDirectoryIdentifier: string;
  merchantId: string;
}

export interface DirectoryRequestData {
  name: string;
  customDirectoryIdentifier: string;
  startDate: string;
  endDate: string;
  isBatchTransactionOnly: boolean;
}

export interface PayerRequestData {
  firstname: string;
  lastname: string;
  email: string;
  org_name: string;
}
