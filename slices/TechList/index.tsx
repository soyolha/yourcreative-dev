"use client";
import type{JSX} from "react";
import React, { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/app/components/Heading";
import { MdCircle } from "react-icons/md";
import Bounded from "@/app/slice-simulator/components/Bounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({slice}: TechListProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger:{
        markers:false,
        start:"top bottom",
        end:"bottom top",
        scrub:6,
        }
      });

        tl.fromTo(
          ".tech-row",
          {
            x: (i) =>
              i % 2 === 0
                ? gsap.utils.random(600, 400)
                : gsap.utils.random(-600, -400),   
               
          },
          {
            x: (i) =>
              i % 2 === 0
                ? gsap.utils.random(-600, -400)
                : gsap.utils.random(600, 400),
          }
        );
      },component);
      return()=>ctx.revert();
  });
    
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded className="px-10">
        <Heading
          size="sm"
          as="h3"
          className="opacity-60 text-3xl sm:text-4xl md:text-5xl"
        >
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.tech_name.map(({ tech_name, tech_color }, index) => {
        return (
          <div
            key={index}
            className="tech-row mb-6 flex items-center justify-center gap-4 text-slate-700"
            aria-label={tech_name || undefined}
          >
            {Array.from({ length: 15 }, (_, index) => (
              <React.Fragment key={index}>
                <span
                  className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold"
                  style={{
                    color: index === 7 && tech_color? tech_color : "inherit",
                  }}
                  >
            
                  {tech_name}
                </span>
                <span className="text-1.5xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default TechList;