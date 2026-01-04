import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage"); // або getByUID(...) якщо в тебе UID

  return <SliceZone slices={page.data.slices} components={components} />;
}