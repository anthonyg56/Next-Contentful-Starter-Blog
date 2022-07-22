import Image from 'next/image'
import { GetStaticPaths, GetStaticProps, NextPage,  } from 'next'
import { createClient, CreateClientParams, Entry } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { TypeReciepe, TypeRecipeFields } from "../../@types";
import { Document } from "@contentful/rich-text-types"

const contentfulConfig: CreateClientParams = {
  accessToken: "bafc9e682b9f9703341a15d4a66782fc4e99f3c901e6406238c5f17e5afe5363",
  space: "aagf7zedqso5"
}
const client = createClient(contentfulConfig)

// Recipes details page component
const RecipeDetails: NextPage<PageProps> = ({ recipe }) => {
  const {
    cookingTime,
    featuredImage,
    ingredients,
    method,
    thumbnail,
    title
  } = recipe.fields

  console.log(method)

  const ingredientsList = ingredients ? ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  )) : []

  return (
    <div>
      <div className="banner">
        <Image
          src={'https:' + featuredImage.fields.file.url }
          width={featuredImage.fields.file.details.image?.width}
          height={featuredImage.fields.file.details.image?.height}
        />
        <h2>title</h2>
      </div>

      <div className="title">
        <p>Takes about { cookingTime } mins to cook</p>
        <h3>Ingredients</h3>

        {ingredientsList}
      </div>

      <div className="method">
        <h3>Method</h3>
        <div>{documentToReactComponents(method as Document)}</div>
      </div>

      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  )
}

// Creates route paths at build time with a unique address based on the slug of the recipe
export const getStaticPaths: GetStaticPaths = async () => {

  const res = await client.getEntries<TypeRecipeFields>({
    content_type: 'recipe'
  })

  const paths = res.items.map(item => {
    return {
      params: { 
        slug: item.fields.slug
      }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

// Grabs a single recipe entry from contentful CMS
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return {
    props: {}
  }

  const res = await client.getEntries<TypeRecipeFields>({ content_type: 'recipe', 'fields.slug': params.slug })

  return {
    props: {
      recipe: res.items[0]
    }
  }
}

// Type interface for page props
interface PageProps {
  recipe: TypeReciepe
}

export default RecipeDetails