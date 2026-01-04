"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Content, KeyTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { asLink } from "@prismicio/client";
import { MdClose, MdMenu,MdArrowOutward  } from "react-icons/md";

import Button from "./Button";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

type NavItem = { link: any; label: any };

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className=" inline-flex text-[12px] mt-[5px] font-semibold tracking-tight
       text-slate-900 "
    >
      {name ?? "Home"}
    </Link>
  );
}

function isActiveHref(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavItemLink({
  item,
  pathname,
  onClick,
  size = "sm",
}: {
  item: NavItem;
  pathname: string;
  onClick?: () => void;
  size?: "sm" | "lg";
}) {
  const href = (asLink(item.link) as string | null) ?? "";
  const active = href ? isActiveHref(pathname, href) : false;

  const textClass =
    size === "lg"
      ? "text-3xl font-bold text-slate-900"
      : "text-sm font-medium text-slate-700";

  const highlightBase =
    "absolute inset-0 -z-10 h-full w-full translate-y-6 rounded-md bg-yellow-300 " +
    "transition-transform duration-300 ease-in-out";

  const highlightState = active
    ? "translate-y-0"
    : "group-hover:translate-y-0";

  return (
    <PrismicNextLink
      field={item.link}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={clsx("group relative inline-block overflow-hidden px-3", textClass)}
    >
      <span className="relative z-10">{item.label}</span>
      <span className={clsx(highlightBase, highlightState)} />
    </PrismicNextLink>
  );
}

function DesktopMenu({
  items,
  pathname,
  ctaLink,
  ctaLabel,
}: {
  items: NavItem[];
  pathname: string;
  ctaLink: any;
  ctaLabel: any;
}) {
  return (
    <div className="hidden items-center md:flex">
      <ul className="flex items-center ">
        {items.map((item, index) => (
          <React.Fragment key={`d-${index}`}>

       <li>
  <Link
    href={asLink(item.link) ?? "/"}
    className="group text-sm font-semibold relative inline-flex items-center px-2 text-slate-900"
  >
  <span
  aria-hidden="true"
  className="
    absolute left-1 right-1 bottom-0 h-[8px]
    rounded bg-yellow-400/70
    translate-y-2 opacity-0
    group-hover:translate-y-0 group-hover:opacity-100
    transition-all duration-200
  "
/>
    <span className="relative z-10">{item.label}</span>

    {String(item.label).toLowerCase() === "contacts" && (
      <MdArrowOutward
       className="ml-1 text-black leading-none -translate-y-[4px]"
/>
      
    )}
  </Link>
</li>     
 
{index < items.length - 1 && (
<li
    className="px-1 text-2xl font-thin leading-[0] text-slate-400"
     aria-hidden="true"
      >
      /
    </li>
      )}
          </React.Fragment>
        ))}
      </ul>

      <div className="ml-2">
        <Button linkField={ctaLink} label={ctaLabel} />
      </div>
    </div>
  );
}

function MobileMenu({
  items,
  pathname,
  open,
  setOpen,
  ctaLink,
  ctaLabel,
}: {
  items: NavItem[];
  pathname: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  ctaLink: any;
  ctaLabel: any;
}) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-[60] transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}
      aria-hidden={!open}
    >
     
      <div className="absolute inset-0 bg-white" />

      <button
        aria-label="Close menu"
        className="absolute right-4 top-4 z-10 p-2 text-3xl text-slate-900"
        onClick={() => setOpen(false)}
        type="button"
      >
        <MdClose />
      </button>

      <nav className="relative z-10 mt-20 px-6">
        <ul className="flex flex-col gap-7">
          {items.map((item, index) => (
            <li key={`m-${index}`}>
              <NavItemLink
                item={item}
                pathname={pathname}
                onClick={() => setOpen(false)}
                size="lg"
              />
            </li>
          ))}

          <li className="mt-2">
            <Button linkField={ctaLink} label={ctaLabel} />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const items: NavItem[] = useMemo(() => {
    const base = (settings.data.nav_item ?? []) as NavItem[];

   
    const hasContacts = base.some(
      (x) => String(x.label ?? "").toLowerCase().trim() === "contacts"
    );

    if (hasContacts) return base;

  
    const blogIndex = base.findIndex(
      (x) => String(x.label ?? "").toLowerCase().trim() === "blog"
    );

    const contactsItem: NavItem = {
      label: "Contacts",
      link: { link_type: "Web", url: "/contacts" }, 
    };

    if (blogIndex >= 0) {
      const copy = [...base];
      copy.splice(blogIndex + 1, 0, contactsItem);
      return copy;
    }

    return [...base, contactsItem];
  }, [settings.data.nav_item]);
return (
  <nav aria-label="Main navigation" className="relative mb-16 mb:mb-20 lg:mb-23 z-50">
 
    <div
      className={clsx(
        "fixed left-1/2 top-3 -translate-x-1/2",
        "w-[min(92vw,1050px)]",
        "rounded-xl border border-slate-200 bg-white",
        "px-4 py-2 shadow-sm md:px-6"
      )}
    >
        <div className="flex items-center justify-between">
          <NameLogo name={settings.data.name} />

          <DesktopMenu
            items={items}
            pathname={pathname}
            ctaLink={settings.data.cta_link}
            ctaLabel={settings.data.cta_label}
          />

          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="p-2 text-2xl text-slate-900 md:hidden"
            onClick={() => setOpen(true)}
            type="button"
          >
            <MdMenu />
          </button>
        </div>
      </div>

      <MobileMenu
        items={items}
        pathname={pathname}
        open={open}
        setOpen={setOpen}
        ctaLink={settings.data.cta_link}
        ctaLabel={settings.data.cta_label}
      />
    </nav>
  );
}