import type { FileDto } from 'src/types/file';
import type { CardProps } from '@mui/material/Card';

import { useCallback } from 'react';
import { useBoolean, usePopover, useCopyToClipboard } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { Image } from 'src/components/image';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = CardProps & {
  selected?: boolean;
  file: FileDto;
  onDelete: () => void;
  onSelect?: () => void;
  handleDeleteImage?: (image_name: string) => void;
};

export function FileManagerFileItem({ file, selected, onSelect, onDelete, sx, ...other }: Props) {
  const confirmDialog = useBoolean();
  const detailsDrawer = useBoolean();
  const menuActions = usePopover();

  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    toast.success('Copied!');
    copy(file.media_url);
  }, [copy, file.media_url]);

  const renderIcon = () => (
    <Box sx={{ display: 'inline-flex', width: '230px', height: 80 }}>
      {file.type.includes('image') ? (
        <Image alt="Sabado" src={file.media_url} ratio="1/16" />
      ) : (
        <FileThumbnail file={file.type} sx={{ width: 1, height: 1 }} />
      )}
    </Box>
  );

  const renderText = () => (
    <>
      <Typography
        variant="subtitle2"
        onClick={detailsDrawer.onTrue}
        sx={(theme) => ({
          ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
          mt: 2,
          mb: 0.5,
          width: '200px',
        })}
      >
        <a href={file.media_url} target="_blank" rel="noreferrer">
          {file.media_name}
        </a>
      </Typography>

      <Box
        sx={{
          maxWidth: 0.99,
          display: 'flex',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        {fData(file.media_size)}

        <Box
          component="span"
          sx={{
            mx: 0.75,
            width: 2,
            height: 2,
            flexShrink: 0,
            borderRadius: '50%',
            bgcolor: 'currentColor',
          }}
        />
        <Typography noWrap component="span" variant="caption">
          {fDateTime(file.created_at)}
        </Typography>
      </Box>
    </>
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            menuActions.onClose();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <Paper
        variant="outlined"
        sx={[
          (theme) => ({
            p: 2.5,
            display: 'flex',
            borderRadius: 2,
            cursor: 'pointer',
            position: 'relative',
            bgcolor: 'transparent',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {renderIcon()}
        {renderText()}
        <Button
          fullWidth
          color="error"
          variant="contained"
          onClick={() => {
            confirmDialog.onTrue();
          }}
        >
          Delete
        </Button>
      </Paper>

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
