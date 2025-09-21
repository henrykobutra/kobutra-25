import PersonSchema from './person-schema';
import OrganizationSchema from './organization-schema';
import WebsiteSchema from './website-schema';

/**
 * Main Structured Data component that combines all Schema.org markup
 * Orchestrates Person, Organization, and Website schemas for comprehensive SEO coverage
 */
export default function StructuredData() {
  return (
    <>
      <PersonSchema />
      <OrganizationSchema />
      <WebsiteSchema />
    </>
  );
}
