'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';

/**
 * Client wrapper component that conditionally renders breadcrumbs
 * Only shows breadcrumbs for specific routes (/notes, /sides) and not on home page
 */
export default function BreadcrumbWrapper() {
  const pathname = usePathname();
  
  // Only show breadcrumbs for specific routes
  const shouldShowBreadcrumbs = pathname.startsWith('/notes') || pathname.startsWith('/sides');
  
  if (!shouldShowBreadcrumbs) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pt-6">
      <Breadcrumbs />
    </div>
  );
}
