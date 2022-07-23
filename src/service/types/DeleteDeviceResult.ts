export interface DeleteDeviceResult {
  additionalInfo: {
    AssetId: string;
  };
  createdTime: number;
  customerId: {
    id: string;
    entityType: string;
  };
  deviceData: {
    configuration: {
      type: string;
    };
    transportConfiguration: {
      type: string;
    };
  };
  deviceProfileId: {
    id: string;
    entityType: string;
  };
  id: {
    id: string;
    entityType: string;
  };
  label: string;
  name: string;
  tenantId: {
    id: string;
    entityType: string;
  };
  type: string;
}
