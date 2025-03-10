'use client';

import type { FileDto } from 'src/types/file';

// import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid2';

import apiClient from 'src/api/apiClient';

import { Image } from 'src/components/image';

export default function ImageGrid() {
  const [imageItems, setImages] = useState<FileDto[]>([]);
  const handleFetchFiles = useCallback(async () => {
    const response = await apiClient('/api/v1/gallery', 'get', {
      queryParams: {
        direction: 'desc',
        rowsPerPage: 6,
        page: 0,
        sortBy: 'createdAt',
      },
    });

    setImages(response.data);
  }, []);

  useEffect(() => {
    handleFetchFiles();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid container size={{ xs: 12, md: 6 }} spacing={2}>
        <Grid size={{ xs: 6, md: 6 }}>
          <Image
            src={imageItems[0]?.media_url}
            alt={imageItems[0]?.media_name}
            ratio="4/3"
            style={{ borderRadius: '8px' }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <Image
            src={imageItems[1]?.media_url}
            alt={imageItems[1]?.media_name}
            ratio="4/3"
            style={{ borderRadius: '8px' }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Image
            src={imageItems[4]?.media_url}
            alt={imageItems[4]?.media_name}
            ratio="7/7"
            style={{ borderRadius: '8px' }}
          />
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Image
          src={imageItems[2]?.media_url}
          alt={imageItems[2]?.media_name}
          ratio="3/4"
          style={{ borderRadius: '8px' }}
        />
      </Grid>
    </Grid>
  );
}
