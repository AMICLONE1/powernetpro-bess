import { redirect } from "next/navigation";

/**
 * /contact is consolidated into the "Enquire now" (free-audit) page, which now
 * carries the contact details too. We keep this route as a permanent redirect
 * so old links, bookmarks and search-engine entries land on the right place
 * instead of 404-ing.
 */
export default function ContactPage() {
  redirect("/free-audit");
}
