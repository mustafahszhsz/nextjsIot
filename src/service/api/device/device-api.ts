import { AddDeviceInput } from '@/service/types/AddDeviceInput';
import { AddDeviceResult } from '@/service/types/AddDeviceResult';
import { DeleteDeviceInput } from '@/service/types/DeleteDeviceInput';
import { DeleteDeviceResult } from '@/service/types/DeleteDeviceResult';
import { EditDeviceInput } from '@/service/types/EditDeviceInput';
import { EditDeviceResult } from '@/service/types/EditDeviceResult';
import { GetAllDevicesResult } from '@/service/types/GetAllDevices';
import { GetAllDevicesInput } from '@/service/types/GetAllDevicesInput';
import { GetDeviceInput } from '@/service/types/GetDeviceInput';
import { GetDeviceResult } from '@/service/types/GetDeviceResult';
import { GetDeviceTokenInput } from '@/service/types/GetDeviceTokenInput';
import { GetDeviceTokenResult } from '@/service/types/GetDeviceTokenResult';
import { GetTelemetriesInput } from '@/service/types/GetTelemetriesInput';
import { GetTelemetriesResult } from '@/service/types/GetTelemetriesResult';
import { SendRpcInput } from '@/service/types/SendRpcCommandInput';
import { SendRpcResult } from '@/service/types/SendRpcCommandResult';

import { api } from '../core/api';

export const deviceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllDevices: build.query<GetAllDevicesResult[], GetAllDevicesInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices`,
        method: 'GET',
      }),
    }),
    addDevice: build.mutation<AddDeviceResult, AddDeviceInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices`,
        method: 'POST',
        body: body,
      }),
    }),
    getDevice: build.query<GetDeviceResult, GetDeviceInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices/${body.id}`,
        method: 'GET',
      }),
    }),
    sendRpcCommand: build.mutation<SendRpcResult, SendRpcInput>({
      query: (body) => {
        return {
          url: `assets/${body.assetId}/devices/${body.deviceId}/rpc`,
          method: 'POST',
          body,
        };
      },
    }),
    getDeviceTelemetries: build.query<
      GetTelemetriesResult,
      GetTelemetriesInput
    >({
      query: (body) => ({
        url: `plugins/telemetry/${body.entityType}/${body.entityId}/values/timeseries`,
        method: 'GET',
      }),
    }),
    getDeviceToken: build.query<GetDeviceTokenResult, GetDeviceTokenInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices/${body.deviceId}/user-token`,
        method: 'GET',
      }),
    }),
    editDevice: build.mutation<EditDeviceResult, EditDeviceInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices/${body.deviceId}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteDevice: build.mutation<DeleteDeviceResult, DeleteDeviceInput>({
      query: (body) => ({
        url: `customer/device/${body.deviceId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllDevicesQuery,
  useAddDeviceMutation,
  useGetDeviceQuery,
  useSendRpcCommandMutation,
  useGetDeviceTelemetriesQuery,
  useGetDeviceTokenQuery,
  useEditDeviceMutation,
  useDeleteDeviceMutation,
} = deviceApi;
