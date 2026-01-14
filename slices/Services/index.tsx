

import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

export default function Services({ slice }: ServicesProps) {
  return (
    <Bounded as="section" className="py-16" id="services">
      {/* Title */}
      {slice.primary.section_title ? (
        <Heading as="h1" size="lg" className="text-left">
          {slice.primary.section_title}
        </Heading>
      ) : null}

      {/* Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {slice.primary.services_list?.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            {/* service_title */}
            {item.service_title ? (
              <h3 className="text-3xl font-semibold text-white/80">
                {item.service_title}
              </h3>
            ) : null}

            {/* description (StructuredText) */}
            {item.description ? (
              <div className="mt-4 text-lg text-white/70 leading-relaxed">
                <PrismicRichText field={item.description} />
              </div>
            ) : null}

            {/* timeline_price */}
            {item.timeline_price ? (
              <p className="mt-4 text-lg font-medium text-white/70">
                {item.timeline_price}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </Bounded>
  );
}
