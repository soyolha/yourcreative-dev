"use client";

import { PrismicNextLink } from "@prismicio/next";
import { KeyTextField, LinkField } from "@prismicio/client";
import clsx from "clsx";

type ButtonProps = {
  linkField: LinkField;
  label: KeyTextField;
  className?: string;
};

export default function Button({
  linkField,
  label,
  className,
}: ButtonProps) {
  if (!linkField || !label) return null;

  return (
    <PrismicNextLink
      field={linkField}
      className={clsx(
        "inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700",
        className
      )}
    >
      {label}
    </PrismicNextLink>
  );
}