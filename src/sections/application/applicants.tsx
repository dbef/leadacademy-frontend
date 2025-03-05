'use client';

import type { CourseDto } from 'src/types/course-type';
import type { Applications } from 'src/types/applicants';
import type { TableHeadCellProps } from 'src/components/table';

import { varAlpha } from 'minimal-shared/utils';
import { useSetState } from 'minimal-shared/hooks';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';

import apiClient from 'src/api/apiClient';
import { DashboardContent } from 'src/layouts/dashboard';
import { useLanguage } from 'src/contexts/language-context';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { ApplicationsTableRow } from './application-table-row';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  course_id: string;
};

export function ApplicantsTable({ course_id }: Props) {
  const STATUS_OPTIONS = [
    { value: '', label: 'All', label_ka: 'ყველა' },
    { value: 'approved', label: 'Approved', label_ka: 'დადასტურებული' },
    { value: 'pending', label: 'Pending', label_ka: 'მომლოდინე' },
    { value: 'rejected', label: 'Rejected', label_ka: 'გაუქმებული' },
  ];

  const TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'parent', label: 'Parent', label_ka: 'მშობელი', width: 88 },
    { id: 'child', label: 'Child', label_ka: 'შვილი', width: 88 },
    { id: 'created_at', label: 'Date', label_ka: 'თარიღი', width: 88 },
    { id: 'status', label: 'Status', label_ka: 'სტატუსი', width: 88 },
    { id: 'approve_reject', label: 'Approve/Reject', label_ka: 'დადასტურება/გაუქმება', width: 88 },
  ];

  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const handleApproveOrReject = async (id: string, status: string) => {
    const accessToken = window.sessionStorage.getItem(JWT_STORAGE_KEY);

    if (!accessToken) return;

    await apiClient('/api/v1/admin/applications/{id}', 'patch', {
      pathParams: { id },
      headers: { authorization: `Bearer ${accessToken}` },
      body: {
        status,
      },
    });

    setData((prev) => prev.filter((item) => item.application_id !== id));

    if (status === 'approved') {
      toast.success(renderLanguage('დადასტურებულია', 'Approved'));
    }

    if (status === 'rejected') {
      toast.error(renderLanguage('გაუქმებულია', 'Rejected'));
    }
  };

  const { renderLanguage } = useLanguage();

  const filters = useSetState<{ status: string }>({
    status: '',
  });
  const { state: currentFilters, setState: updateFilters } = filters;

  const [data, setData] = useState<Applications[]>([]);
  const [filteredData, setFilteredData] = useState<Applications[]>([]);
  const [course, setCourse] = useState<CourseDto>();
  const [counts, setCounts] = useState<{
    approved: number;
    rejected: number;
    all: number;
    pending: number;
  }>({
    approved: 0,
    rejected: 0,
    pending: 0,
    all: 0,
  });

  const fetchData = useCallback(async () => {
    const accessToken = window.sessionStorage.getItem(JWT_STORAGE_KEY);

    console.log('AccessToken:', accessToken);

    if (!accessToken) return;

    const response = await apiClient('/api/v1/admin/applications/{course_id}', 'get', {
      pathParams: { course_id },
      headers: { authorization: `Bearer ${accessToken}` },
    });

    if (response.length > 0) {
      setCourse(response[0].course);
      setCounts({
        approved: response.filter((item) => item.status === 'approved').length,
        rejected: response.filter((item) => item.status === 'rejected').length,
        pending: response.filter((item) => item.status === 'pending').length,
        all: response.length,
      });
    }

    setData(response);
    setFilteredData(response);
  }, [course_id]);

  console.log('Counts:', counts);

  useEffect(() => {
    fetchData();
  }, [course_id]);

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      updateFilters({ status: newValue });
      handleAdjustStatusFilter(newValue);
    },
    [updateFilters, table]
  );

  const handleAdjustStatusFilter = (status: string) => {
    if (status) {
      setFilteredData(data.filter((item) => item.status === status));

      return;
    }

    setFilteredData(data);
  };
  return (
    <DashboardContent>
      {course ? (
        <>
          <Typography>{renderLanguage('კურსის სახელი', 'Course Name')}</Typography>
          <Typography variant="h2"> {renderLanguage(course.title_ka, course.title_en)}</Typography>
          <Typography>{course.price} ₾</Typography>
        </>
      ) : null}
      <Card>
        <Tabs
          value={currentFilters.status}
          onChange={handleFilterStatus}
          sx={[
            (theme) => ({
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }),
          ]}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={renderLanguage(tab.label_ka, tab.label)}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === currentFilters.status) && 'filled') ||
                    'soft'
                  }
                  color={
                    (tab.value === 'approved' && 'success') ||
                    (tab.value === 'pending' && 'warning') ||
                    (tab.value === 'rejected' && 'error') ||
                    'default'
                  }
                >
                  {['approved', 'pending', 'rejected'].includes(tab.value)
                    ? data.filter((item) => item.status === tab.value).length
                    : data.length}
                </Label>
              }
            />
          ))}
        </Tabs>
        <Box sx={{ position: 'relative' }}>
          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headCells={TABLE_HEAD}
                rowCount={data.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {filteredData.map((row) => (
                  <ApplicationsTableRow row={row} handleApproveOrReject={handleApproveOrReject} />
                ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, data.length)}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </Card>
    </DashboardContent>
  );
}
