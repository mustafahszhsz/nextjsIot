export interface SendRpcInput {
  assetId: string;
  deviceId: string;
  method: string;
  value: boolean;
  useStrictDataTypes: false;
  params: boolean;
  persistent: false;
  timeout: 500;
}
