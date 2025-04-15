'use client';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import apiClient from 'src/api/apiClient';

import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';
import { JWT_STORAGE_KEY, JWT_REFRESH_STORAGE_KEY } from './constant';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      const refreshToken = sessionStorage.getItem(JWT_REFRESH_STORAGE_KEY);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, refreshToken);

        const res = await apiClient('/api/v1/admin/me', 'get', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = {
          id: '8864c717-587d-472a-929a-8e5f298024da-0',
          displayName: 'Jaydon Frankie',
          photoURL: 'https://api-dev-minimal-v630.pages.dev/assets/images/avatar/avatar-25.webp',
          phoneNumber: '+1 416-555-0198',
          country: 'Canada',
          address: '90210 Broadway Blvd',
          state: 'California',
          city: 'San Francisco',
          zipCode: '94116',
          about:
            'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
          role: 'admin',
          isPublic: true,
          email: 'demo@minimals.cc',
          password: '@2Minimal',
        };

        const { username } = res;
        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, []);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
