import { Link } from 'react-router-dom'
import { IconArrowForward } from './Icons'

/** Category card — the whole card is a link to the category listing. */
export default function CategoryCard({ category }) {
  return (
    <Link className="category-card" to={`/category/${category.slug}`}>
      <div className="category-card__media">
        {category.images.map((src) => (
          <img key={src} src={src} alt="" loading="lazy" decoding="async" />
        ))}
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <span className="category-card__link">
        مشاهده محصولات
        <IconArrowForward size={16} />
      </span>
    </Link>
  )
}
