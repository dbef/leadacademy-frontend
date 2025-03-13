'use client';

import type { CourseDto } from 'src/types/course-type';
import type { Applications } from 'src/types/applicants';
import type { TableHeadCellProps } from 'src/components/table';

import * as XLSX from "xlsx";
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
import LoadingButton from '@mui/lab/LoadingButton';

import apiClient from 'src/api/apiClient';
import { DashboardContent } from 'src/layouts/dashboard';
import { useLanguage } from 'src/contexts/language-context';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable, emptyRows, TableEmptyRows, TableHeadCustom } from 'src/components/table';

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
    { value: 'pending-payment', label: 'Payment Pending', label_ka: 'გადასახდელია' },
  ];

  const TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'parent', label: 'Parent', label_ka: 'მშობელი', width: 88 },
    { id: 'child', label: 'Child', label_ka: 'შვილი', width: 88 },

    { id: 'alergens', label: 'Alergens', label_ka: 'ალერგიები', width: 88 },
    { id: 'medicaments', label: 'Medicaments', label_ka: 'მედიკამენტები', width: 88 },
    {
      id: 'diet_restrictions',
      label: 'Diet restrictions',
      label_ka: 'დიეტური შეზღუდვები',
      width: 88,
    },
    {
      id: 'physical_disabilities',
      label: 'Physical disabilities',
      label_ka: 'ფიზიკური შეზღუდვები',
      width: 88,
    },
    { id: 'additional_info', label: 'Additional Info', label_ka: 'დამატებითი ინფო', width: 88 },
    {
      id: 'potential_roommate',
      label: 'Potential roommate',
      label_ka: 'პოტენციური რუმმეითი',
      width: 88,
    },
    {
      id: 'special_needs',
      label: 'Special Needs',
      label_ka: 'სპეციალური საჭიროებები',
      width: 88,
    },
    {
      id: 'emergency_contact',
      label: 'Emergency Contact',
      label_ka: 'სანდო კონტაქტი',
      width: 88,
    },
    {
      id: 'relation_with_peers',
      label: 'Relationship with peers',
      label_ka: 'ურთიერთობა თანატოლებთან',
      width: 88,
    },
    {
      id: 'social_skills',
      label: 'Social Skills',
      label_ka: 'სოციალური უნარები',
      width: 88,
    },
    {
      id: 'additional_comfort_info',
      label: 'Additional Comfort Info',
      label_ka: 'დამატებითი კომფორტის ინფო',
      width: 88,
    },
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

    setUpdated(true);

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
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<{
    approved: number;
    rejected: number;
    all: number;
    pending: number;
    pending_payment: number;
  }>({
    approved: 0,
    rejected: 0,
    pending: 0,
    all: 0,
    pending_payment: 0,
  });

  const fetchData = useCallback(async () => {
    const accessToken = window.sessionStorage.getItem(JWT_STORAGE_KEY);

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
        pending_payment: response.filter((item) => item.status === 'pending-payment').length,
        all: response.length,
      });
    }

    setData(response);
    setFilteredData(response);
  }, [course_id]);

  useEffect(() => {
    if (updated) {
      fetchData();
      setUpdated(false);
    }
  }, [updated]);

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

  
  const onGetExporProduct = async () => {
    try {
      setLoading(true);
      // Check if the action result contains data and if it's an array
      if (filteredData && Array.isArray(filteredData)) {
        const dataToExport = filteredData.map((item) => ({
          'მშობელი': `${item.parent_name} ${item.parent_lastname}`,
          'მშობლის ნომერი': item.parent_phone,
          'ქვეყანა': item.parent_country,
          'ქალაქი': item.parent_city,
          'მშობლის სქესი': item.parent_gender,
          'მისამართი': item.parent_address,
          'მშობლის პირადი ნომერი': item.parent_pn,
          'სტუდენტი': `${item.student_name} ${item.student_lastname}`,
          'სტუდენტის მეილი': `${item.student_email}`,
          'სტუდენტის ნომერი': item.student_phone,
          'სტუდენტის დაბადების თარიღი': item.student_dob,
          'სტუდენტის სქესი': item.student_gender,
          'სტუდენტის კლასი': item.student_class,
          'პროგრამა': item.program,
          'სანდო კონტაქტი': `${item.emergency_contact_name}`,
          'სანდო კონტაქტის ნომერი': item.emergency_contact_phone,
          'სანდო კონტაქტის რელაცია': item.emergency_relation,
          'სპეციალური საჭიროებები': item.special_needs,
          'ურთიერთობა თანატოლებთან': item.relationship_with_peers,
          'სოციალური უნარები': item.social_skills,
          'დამატებითი კომფორტის ინფო': item.additional_comfort_info,
          'პოტენციური რუმმეითი': item.potential_roommate,
          'ალერგენები': item.alergens,
          'მედიკამენტები': item.medicaments,
          'დიეტური შეზღუდვები': item.diet_restrictions,
          'ფიზიკური შეზღუდვები': item.physical_disabilities,
          'დამატითი ინფო': item.additional_info,
          'თარიღი': item.created_at,
          'სტატუსი': item.status,
        })
          ,);
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${course?.title_en}.xlsx`);

        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error")
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);

    }
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
        <LoadingButton variant="contained" sx={{ mb: 2 }} loading={loading} onClick={onGetExporProduct}>
          {renderLanguage('ექსელის ექსპორტი', 'Export to Excel')}
        </LoadingButton>
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
                    (tab.value === 'pending-payment' && 'info') ||
                    'default'
                  }
                >
                  {['approved', 'pending', 'rejected', 'pending-payment'].includes(tab.value)
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
