import type { Applications } from 'src/types/applicants';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fDate, fTime } from 'src/utils/format-time';

import { useLanguage } from 'src/contexts/language-context';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: Applications;
  handleApproveOrReject: (id: string, status: string) => void;
};

export function ApplicationsTableRow({ row, handleApproveOrReject }: Props) {
  const confirmDialog = useBoolean();
  const rejectDialog = useBoolean();
  const confirmPaymentDialog = useBoolean();
  const menuActions = usePopover();

  const { renderLanguage } = useLanguage();

  const renderPrimaryRow = () => (
    <TableRow hover>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span">{`${row.parent_name} ${row.parent_lastname}`}</Box>

            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_email}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.relation}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_pn}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_phone}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_city}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_nationality}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_country}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_address}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.parent_gender}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span">{`${row.student_name} ${row.student_lastname}`}</Box>

            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.student_email}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.student_pn}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.student_phone}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.student_class}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.student_gender}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.alergens}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.medicaments}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.diet_restrictions}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.physical_disabilities}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.additional_info}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.potential_roommate}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.special_needs}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span">{row.emergency_contact_name}</Box>

            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.emergency_contact_phone}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.emergency_relation}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.relationship_with_peers}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.social_skills}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.additional_comfort_info}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.media_release}
            </Box>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <ListItemText
          primary={fDate(row.created_at)}
          secondary={fTime(row.created_at)}
          slotProps={{
            primary: {
              noWrap: true,
              sx: { typography: 'body2' },
            },
            secondary: {
              sx: { mt: 0.5, typography: 'caption' },
            },
          }}
        />
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'approved' && 'success') ||
            (row.status === 'pending' && 'warning') ||
            (row.status === 'rejected' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
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
            confirmPaymentDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'warning.main' }}
        >
          <Iconify icon="solar:user-check-bold" />
          {renderLanguage('დადასტურება (გადახდილია)', 'Approve (Paid)')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'success.main' }}
        >
          <Iconify icon="solar:user-check-bold" />
          {renderLanguage('დადასტურება', 'Approve')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            menuActions.onClose();
            rejectDialog.onTrue();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {renderLanguage('გაუქმება', 'Reject')}
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderApproveDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title={renderLanguage('დადასტურება', 'Approve')}
      content={renderLanguage('გსურთ აპლიკანტის დადასტურება?', 'Confirm this applicant')}
      action={
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleApproveOrReject(row.application_id || '', 'pending-payment');
            confirmDialog.onFalse();
          }}
        >
          {renderLanguage('დადასტურება', 'Approve')}
        </Button>
      }
    />
  );

  const renderPaymentWithoutCard = () => (
    <ConfirmDialog
      open={confirmPaymentDialog.value}
      onClose={confirmPaymentDialog.onFalse}
      title={renderLanguage('დადასტურება (გადმორიცხულია)', 'Approve (Paid)')}
      content={renderLanguage('გსურთ აპლიკანტის დადასტურება?', 'Confirm this applicant')}
      action={
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleApproveOrReject(row.application_id || '', 'approved');
            confirmPaymentDialog.onFalse();
          }}
        >
          {renderLanguage('დადასტურება', 'Approve')}
        </Button>
      }
    />
  );

  const renderRejectDialog = () => (
    <ConfirmDialog
      open={rejectDialog.value}
      onClose={rejectDialog.onFalse}
      title={renderLanguage('გაუქმება', 'Reject')}
      content={renderLanguage('გსურთ აპლიკანტის გაუქმება?', 'Reject this applicant')}
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleApproveOrReject(row.application_id || '', 'rejected');
            rejectDialog.onFalse();
          }}
        >
          {renderLanguage('გაუქმება', 'Reject')}
        </Button>
      }
    />
  );

  return (
    <>
      {renderPrimaryRow()}
      {renderMenuActions()}
      {renderApproveDialog()}
      {renderRejectDialog()}
      {renderPaymentWithoutCard()}
    </>
  );
}
