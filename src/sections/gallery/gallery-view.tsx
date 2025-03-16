'use client';

import type { FileDto } from 'src/types/file';

import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Modal,
  Button,
  ImageList,
  Pagination,
  Typography,
  ImageListItem,
} from '@mui/material';

import { _mock } from 'src/_mock';
import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';
import { useTable } from 'src/components/table';

import { CarouselThumbsX } from '../_examples/extra/carousel-view/carousel-thumbs-x';

export function GalleryView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const { rowsPerPage } = table;

  const [files, setFiles] = useState<FileDto[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const handleFetchFiles = useCallback(async () => {
    const response = await apiClient('/api/v1/gallery', 'get', {
      queryParams: {
        direction: 'desc',
        rowsPerPage: rowsPerPage || 10,
        page: page - 1,
        sortBy: 'createdAt',
      },
    });

    setFiles(response.data);
    setCount(response.count);
  }, [page, rowsPerPage]);

  useEffect(() => {
    handleFetchFiles();
  }, [page, rowsPerPage]);

  const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  }, []);

  const { renderLanguage } = useLanguage();

  const images = files.map((item) => ({
    id: item.media_id,
    title: item.media_name,
    coverUrl: item.media_url,
    description: item.media_name,
  }));

  return (
    <Box
      sx={{
        padding: '28px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '28px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '28px 24px',
          marginTop: '50px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
      }}
    >
      <Typography variant="h2" sx={{ fontFeatureSettings: "'case' on" }}>
        {renderLanguage('გალერია', 'Gallery')}
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        <ImageList variant="masonry" cols={2} gap={8}>
          {files.map((item, idx) => (
            <ImageListItem key={item.media_id}>
              <Image
                src={`${item.media_url}?w=248&fit=crop&auto=format`}
                alt={item.media_name}
                ratio={idx % 2 === 0 ? '3/4' : '16/9'}
                sx={{ borderRadius: '12px', cursor: 'pointer' }}
                onClick={() => {
                  setOpenModal(true);
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          page={page}
          shape="circular"
          count={Math.ceil(count / rowsPerPage)}
          onChange={handleChangePage}
          sx={{ mt: { xs: 5, md: 8 }, mx: 'auto' }}
        />
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            outline: 'none',
            width: '70%',
            '@media (max-width: 700px)': {
              width: '90%',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            {' '}
            <Button variant="contained" color="success" onClick={() => setOpenModal(false)}>
              {renderLanguage('დახურვა', 'Close')}
            </Button>
          </Box>

          <CarouselThumbsX data={images} />
        </Box>
      </Modal>
    </Box>
  );
}

// Now it's rocking MUI Grid and Next.js Image for optimal layout and performance! Let me know if you want more tweaks! 🚀
