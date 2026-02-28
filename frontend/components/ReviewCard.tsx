import RatingStars from './RatingStars'
import { useTranslation } from '../lib/i18n'

interface Review {
  id: string
  reviewer_name: string
  rating: number
  title?: string
  comment?: string
  response?: string
  created_at: string
  is_verified: boolean
}

interface Props {
  review: Review
  onRespond?: (reviewId: string, response: string) => void
}

export default function ReviewCard({ review, onRespond }: Props) {
  const { t } = useTranslation()
  const date = new Date(review.created_at).toLocaleDateString()
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center mb-2">
            <span className="font-semibold text-lg">{review.reviewer_name}</span>
            {review.is_verified && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                ✓ {t('reviews.verified')}
              </span>
            )}
          </div>
          <RatingStars rating={review.rating} size="sm" showNumber={false} />
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      
      {review.title && (
        <h4 className="font-semibold mb-2">{review.title}</h4>
      )}
      
      {review.comment && (
        <p className="text-gray-700 mb-3">{review.comment}</p>
      )}
      
      {review.response && (
        <div className="bg-gray-50 rounded p-3 mt-3 border-l-4 border-blue-500">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {t('reviews.response')}:
          </p>
          <p className="text-sm text-gray-600">{review.response}</p>
        </div>
      )}
    </div>
  )
}
