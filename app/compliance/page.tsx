import LegalDocumentPage from "@/components/pages/legal-document-page";
import { buildMetadata } from "@/lib/metadata";
import { getLegalDocument } from "@/lib/site-data";

const document = getLegalDocument("compliance");

export const metadata = buildMetadata({
  title: document.navLabel,
  description: document.metaDescription,
  path: document.href,
});

export default function CompliancePage() {
  return <LegalDocumentPage slug="compliance" />;
}
