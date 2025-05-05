'use client';


import { DashboardContent } from 'src/layouts/dashboard';
import { useLanguage } from 'src/contexts/language-context';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { NewsCreateEditForm } from '../news-create-edit';

// ----------------------------------------------------------------------

export function NewsCreateView() {
  const { renderLanguage } = useLanguage();

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={renderLanguage('ახალი სიახლის დამატება', 'Add new news')}
        // links={[
        //   { name: 'Dashboard', href: paths.dashboard.root },
        //   { name: 'Product', href: paths.dashboard.product.root },
        //   { name: 'New product' },
        // ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <NewsCreateEditForm />
    </DashboardContent>
  );
}
