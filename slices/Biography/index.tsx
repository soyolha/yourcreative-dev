import { PrismicRichText } from "@prismicio/react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type {FC} from "react"

import Bounded from "@/app/slice-simulator/components/Bounded";
import Heading from "@/app/components/Heading";



export type BiographyProps = SliceComponentProps<Content.BiographySlice>;
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
   
   <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  <div className="mx-auto w-full max-w-2xl px-6 pt-14 sm:pt-18">
    <Heading
      as="h1"
      size="lg"
      className="text-left opacity-60 leading-none tracking-tight text-[clamp(2.4rem,7vw,4.2rem)]"
    >
      {slice.primary.heading}
    </Heading>
  <div className="mt-5 max-w-xl text-left">
  <div className="prose prose-invert prose-lg leading-relaxed text-white/80">
    <PrismicRichText field={slice.primary.description} />
  </div>
    </div>
    </div>

</Bounded>
  )
};

export default Biography;