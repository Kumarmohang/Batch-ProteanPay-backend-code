export interface User {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  status: string;
  org_name: string;
  address: string;
  fee: number;
  upper_cap_ammount: number;
  upper_cap_unit: string;
  api_key: string;
  is_verified: boolean;
  redirect_url: string;
  hook: string;
}
