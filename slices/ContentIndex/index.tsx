import { FC } from "react";
import { Content, isFilled} from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */

  
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
  export default async function ContentIndex({ slice }: ContentIndexProps) {
  const client = createClient()
  const blogPost = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

const CONTENT_TYPE = {
  BLOG: "1 Blog",
  PROJECT: "2 Project",
} as const;

const contentType = slice.primary.content_type ?? CONTENT_TYPE.BLOG;
const items = contentType === CONTENT_TYPE.BLOG ? blogPost : projects;


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <Heading size="lg" className="=mb-8 opacity-90 pb-5">
      {slice.primary.heading}
    </Heading> 
    {isFilled.richText(slice.primary.description)&&(
      <div className="prose prose-xl prose-invert mb-5 ">
        <PrismicRichText field={slice.primary.description}/>
      </div>
    )}

 <ContentList
  items={items}
  contentType={contentType}
  viewMoreText={slice.primary.view_more_text}
  fallbackItemImage={slice.primary.fallback_image}
/>

    </Bounded>
  );
 };


