import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react'

// Type Interface for props
interface Props {
  title: string;
  slug: string;
  cookingTime: number;
  thumbnail: any;
}

// Recipe Card JSX Component
const RecipeCard: FC<Props> = ({ title, slug, cookingTime, thumbnail }) => {
  return (
    <div className='card'>
      <div className="featured">
        <Image
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          src={'https:' + thumbnail.fields.file.url}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins</p>
        </div>
        <div className="actions">
          <Link href={'/recipes/' + slug}><a>Cook this</a></Link>
        </div>
      </div>

      <style jsx>{`
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: -5px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: #f01b29;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

//JSX Styling
export default RecipeCard