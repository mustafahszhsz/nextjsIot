import { GetUserProfileResult } from '@/service/types/GetCurrentProfileResult';
import {
  IAuthenticationInput,
  IAuthenticationResult,
  IEditProfileInput,
  IProfileResult,
  IVerifyAuthenticateInput
} from '../../types';
import { api } from '../core/api';


export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    editUserProfile: build.mutation<IProfileResult, IEditProfileInput>({
      query: (body) => ({
        url: `users/me/profile`,
        method: 'PUT',
        body: body,
      }),
    }),
    editUserProfilePhone: build.mutation<
      IAuthenticationResult,
      IAuthenticationInput
    >({
      query: (body) => ({
        url: `users/me/change-phone`,
        method: 'PUT',
        body: body,
      }),
    }),
    verifyUserProfilePhone: build.mutation<
      IAuthenticationResult,
      IVerifyAuthenticateInput
    >({
      query: (body) => ({
        url: `users/me/change-phone-verify`,
        method: 'POST',
        body: body,
      }),
    }),
    currentUserProfile: build.query<GetUserProfileResult, void>({
      query: (body) => ({
        url: `users/me/profile`,
        method: 'GET',
        body: body,
      }),
    }),
    deleteCurrentUser: build.mutation<void, void>({
      query: (body) => ({
        url: `users/me`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useEditUserProfileMutation,
  useEditUserProfilePhoneMutation,
  useVerifyUserProfilePhoneMutation,
  useDeleteCurrentUserMutation,
  useCurrentUserProfileQuery,
} = userApi;
