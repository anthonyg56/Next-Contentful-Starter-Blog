import type { NextPage, GetStaticProps } from 'next'
import { createClient, CreateClientParams, Entry } from 'contentful'
import { TypeReciepe, TypeRecipeFields } from '../@types'
import RecipeCard from '../components/RecipeCard'

export const getStaticProps: GetStaticProps = async () => {

  const contentfulConfig: CreateClientParams = {
    accessToken: "bafc9e682b9f9703341a15d4a66782fc4e99f3c901e6406238c5f17e5afe5363",
    space: "aagf7zedqso5"
  }

  const client = createClient(contentfulConfig)
  const res = await client.getEntries<TypeRecipeFields>({ content_type: 'recipe' })

  console.log(res)

  return {
    props: {
      recipes: res.items
    }
  }
}

type PageProps = {
  recipes: TypeReciepe[]
}

const Home: NextPage<PageProps> = ({ recipes }) => {
  const recipesList = recipes.map(recipe => <RecipeCard
    key={recipe.sys.id}
    title={recipe.fields.title}
    cookingTime={recipe.fields.cookingTime}
    slug={recipe.fields.slug}
    thumbnail={recipe.fields.thumbnail}
  />)

  return (
    <div className="recipe-list">
      {recipesList}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px
        }
      `}</style>
    </div>
  )
}

export default Home
