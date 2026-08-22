// Shared building blocks for the long-form content pages.
//
// Lives apart from pages.ts so privacy.ts can use these without the two files
// importing each other (a cycle would leave CONTACT uninitialised at load).

/** Contact details, kept in one place — they appear on several pages. */
export const CONTACT = {
  entity: "Istiqlol Tech LLC",
  address: "Katta Chilonzor-1 MFY, Arnasoy ko'chasi, 6-a-uy, Tashkent",
  // No public email yet. Set a branded one (e.g. support@zbrr.uz) and add it
  // back to the contact sections once the mailbox exists.
  phone: "+998 94 114 32 32",
};

export interface InfoSection {
  /** Section heading. */
  h?: string;
  /** Body paragraph. */
  p?: string;
  /** Optional bullet list, rendered under `p`. */
  items?: string[];
}

export interface InfoPageCopy {
  eyebrow: string;
  title: string;
  sub: string;
  sections: InfoSection[];
  /** Rendered as a muted "last updated" line under the title. */
  updated?: string;
  /** Optional call-to-action button at the end of the body. */
  cta?: { label: string; to: string };
}
