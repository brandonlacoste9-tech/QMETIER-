interface Props {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  interactive?: boolean
  onChange?: (rating: number) => void
}

export default function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = true,
  interactive = false,
  onChange
}: Props) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  }
  
  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value)
    }
  }
  
  return (
    <div className="flex items-center">
      <div className={`flex ${sizeClasses[size]}`}>
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= Math.round(rating)
          const isHalf = starValue === Math.ceil(rating) && rating % 1 !== 0
          
          return (
            <span
              key={index}
              onClick={() => handleClick(starValue)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition' : ''} ${
                isFilled ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              {isHalf ? '⯨' : '★'}
            </span>
          )
        })}
      </div>
      {showNumber && (
        <span className="ml-2 text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
