import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import { useTranslation } from '../../lib/i18n'
import RatingStars from '../../components/RatingStars'

export default function ReviewPage() {
  const router = useRouter()
  const { projectId } = router.query
  const { t } = useTranslation()
  
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const handleSubmit = async () => {
    if (rating === 0) {
      alert(t('reviews.selectRating'))
      return
    }
    
    setSubmitting(true)
    try {
      await axios.post('/api/reviews', {
        project_id: projectId,
        reviewer_id: 'CURRENT_USER_ID', // TODO: Get from auth
        reviewee_id: 'PROFESSIONAL_ID', // TODO: Get from project
        reviewer_type: 'customer',
        reviewee_type: 'professional',
        rating,
        title,
        comment
      })
      
      alert(t('reviews.submitSuccess'))
      router.push('/dashboard')
    } catch (error) {
      console.error('Review submission failed:', error)
      alert(t('reviews.submitError'))
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <>
      <Head>
        <title>{t('reviews.leaveReview')} - Q-MÉTIER</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{t('reviews.leaveReview')}</h1>
          
          <div className="bg-white rounded-lg shadow p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t('reviews.rating')} *
              </label>
              <RatingStars 
                rating={rating}
                interactive={true}
                onChange={setRating}
                size="lg"
                showNumber={false}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t('reviews.title')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('reviews.titlePlaceholder')}
                className="w-full p-3 border rounded"
                maxLength={200}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t('reviews.comment')}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('reviews.commentPlaceholder')}
                className="w-full p-3 border rounded h-32"
                maxLength={2000}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={submitting || rating === 0}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? t('common.loading') : t('reviews.submit')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
