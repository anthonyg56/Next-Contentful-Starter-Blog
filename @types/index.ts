import Contentful from 'contentful'
import CFRichTextTypes, { Document } from "@contentful/rich-text-types"

export interface TypeRecipeFields {
  title: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  thumbnail: Contentful.Asset;
  featuredImage: Contentful.Asset;
  ingredients?: Contentful.EntryFields.Symbol[];
  cookingTime: Contentful.EntryFields.Integer;
  method: CFRichTextTypes.Block | CFRichTextTypes.Inline | Document;
}

export type TypeReciepe = Contentful.Entry<TypeRecipeFields>