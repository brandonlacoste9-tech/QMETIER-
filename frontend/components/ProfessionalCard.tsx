interface Professional {
  id: string
  name: string
  rating: float
  review_count: int
  similarity: float
  distance_miles: float
}

interface Props {
  professional: Professional
  onSelect: (id: string) => void
}

export default function ProfessionalCard({ professional, onSelect }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{professional.name}</h3>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 font-medium">{professional.rating.toFixed(1)}</span>
            <span className="ml-2 text-gray-600">({professional.review_count} reviews)</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Match Score</div>
          <div className="text-2xl font-bold text-blue-600">
            {(professional.similarity * 100).toFixed(0)}%
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        📍 {professional.distance_miles.toFixed(1)} miles away
      </div>
      
      <button
        onClick={() => onSelect(professional.id)}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        View Profile
      </button>
    </div>
  )
}
