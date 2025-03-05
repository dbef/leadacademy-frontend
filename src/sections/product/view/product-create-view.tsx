'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { useLanguage } from 'src/contexts/language-context';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductCreateView() {
  const { renderLanguage } = useLanguage();

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={renderLanguage('ახალი კურსის დამატება', 'Add new course')}
        // links={[
        //   { name: 'Dashboard', href: paths.dashboard.root },
        //   { name: 'Product', href: paths.dashboard.product.root },
        //   { name: 'New product' },
        // ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewEditForm />
    </DashboardContent>
  );
}
