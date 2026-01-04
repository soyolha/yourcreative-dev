import clsx from "clsx";
import Link from "next/link";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

import Bounded from "@/app/components/Bounded";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const items = (settings.data.nav_item ?? []).filter(
    (item: any) => isFilled.keyText(item?.label) && isFilled.link(item?.link)
  );

  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto max-w-6xl px-6 md:px-8 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        {/* Left: name + year */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={clsx(
              "text-xs text-slate-100 transition-colors duration-150",
              "hover:text-yellow-400"
            )}
          >
            {settings.data.name}
          </Link>

          <span className="text-slate-500">/</span>

          <p className="text-xs text-slate-300">
            © {new Date().getFullYear()}
          </p>
        </div>

       
        <nav aria-label="Footer Navigation" className="flex items-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-slate-300">
            {items.map((item: any, idx: number) => (
              <li key={`${item.label}-${idx}`} className="flex items-center">
                <PrismicNextLink
                  field={item.link}
                  className="transition-colors duration-150 hover:text-yellow-400"
                >
                  {item.label}
                </PrismicNextLink>

                {idx !== items.length - 1 && (
                  <span className="mx-3 text-slate-500">/</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}