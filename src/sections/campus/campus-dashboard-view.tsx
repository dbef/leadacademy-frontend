'use client';

import type { CampusDto } from 'src/types/campus';

import { useCallback, useEffect, useState } from 'react';

import Container from '@mui/material/Container';

import apiClient from 'src/api/apiClient';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { CampusList } from './campus-list';

export function CampusDashboardView() {
  const [campuses, setCampuses] = useState<CampusDto[]>([]);

  const fetchData = useCallback(async () => {
    const data = await apiClient('/api/v1/admin/campus', 'get', {
      headers: {
        authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
      },
    });

    setCampuses(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ mb: 15 }}>
      <CampusList products={campuses} />
    </Container>
  );
}
