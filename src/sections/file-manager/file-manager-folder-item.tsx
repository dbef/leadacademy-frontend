import type { FolderDto } from 'src/types/folder';
import type { CardProps } from '@mui/material/Card';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { FileManagerNewFolderDialog } from './file-manager-new-folder-dialog';

// ----------------------------------------------------------------------

type Props = CardProps & {
  selected?: boolean;
  onDelete: () => void;
  onSelect?: () => void;
  folder: FolderDto;
};

export function FileManagerFolderItem({
  sx,
  folder,
  selected,
  onSelect,
  onDelete,
  ...other
}: Props) {
  const shareDialog = useBoolean();
  const confirmDialog = useBoolean();
  const detailsDrawer = useBoolean();
  const editFolderDialog = useBoolean();

  const checkbox = useBoolean();
  // const favorite = useBoolean(folder.isFavorited);

  const menuActions = usePopover();

  // const { copy } = useCopyToClipboard();

  const [inviteEmail, setInviteEmail] = useState('');
  const [folderName, setFolderName] = useState(folder.folder_name);

  const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  }, []);

  // const handleCopy = useCallback(() => {
  //   toast.success('Copied!');
  //   copy(folder.url);
  // }, [copy, folder.url]);

  const router = useRouter()

  const renderActions = () => (
    <Box
      sx={{
        top: 8,
        right: 8,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Box>
  );

  const renderIcon = () => (
    <Box
      onMouseEnter={checkbox.onTrue}
      onMouseLeave={checkbox.onFalse}
      sx={{ width: 36, height: 36 }}
    >
      <Box
        component="img"
        src={`${CONFIG.assetsDir}/assets/icons/files/ic-folder.svg`}
        sx={{ width: 1, height: 1 }}
        onClick={() => router.push(`/dashboard/file-manager/${folder.folder_name}`)}
      />
    </Box>
  );
  const renderText = () => (
    <ListItemText
      onClick={detailsDrawer.onTrue}
      primary={folder.folder_name}
      slotProps={{
        primary: { noWrap: true, sx: { typography: 'subtitle1' } },
        secondary: {
          sx: {
            mt: 0.5,
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
            display: 'inline-flex',
          },
        },
      }}
    />
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
            shareDialog.onTrue();
          }}
        >
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <MenuItem
          onClick={() => {
            menuActions.onClose();
            editFolderDialog.onTrue();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
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

  const renderEditFolderDialog = () => (
    <FileManagerNewFolderDialog
      open={editFolderDialog.value}
      onClose={editFolderDialog.onFalse}
      title="Edit Folder"
      onUpdate={() => {
        editFolderDialog.onFalse();
        setFolderName(folderName);
      }}
      folderName={folderName}
      onChangeFolderName={handleChangeFolderName}
    />
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
            gap: 1,
            p: 2.5,
            display: 'flex',
            borderRadius: 2,
            cursor: 'pointer',
            position: 'relative',
            bgcolor: 'transparent',
            flexDirection: 'column',
            alignItems: 'flex-start',
            ...((checkbox.value || selected) && {
              bgcolor: 'background.paper',
              boxShadow: theme.vars.customShadows.z20,
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {renderIcon()}
        {renderActions()}
        {renderText()}
      </Paper>
      {renderEditFolderDialog()}

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
