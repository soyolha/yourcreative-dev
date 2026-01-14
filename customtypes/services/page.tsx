import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function ServicesPage() {
  const client = createClient();

  // твій Custom Type називається "services", UID теж "services"
  const doc = await client.getByUID("services", "services").catch(() => null);

  if (!doc) notFound();

  return <SliceZone slices={doc.data.slices} components={components} />;
}