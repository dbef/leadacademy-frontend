'use client';


import type { LecturerDto } from 'src/types/lecturer';

import { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';

import apiClient from 'src/api/apiClient';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { LecturerList } from './lecturer-list';

export function LecturersDashboardView() {
  const [lecturers, setLecturers] = useState<LecturerDto[]>([]);

  const fetchData = useCallback(async () => {
    const data = await apiClient('/api/v1/admin/lecturer', 'get', {
      headers: {
        authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
      },
    });

    setLecturers(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ mb: 15 }}>
      <LecturerList products={lecturers} />
    </Container>
  );
}
