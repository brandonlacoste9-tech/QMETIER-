import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useTranslation } from '../lib/i18n'
import LocationDetector from '../components/LocationDetector'
import { Location } from '../lib/geolocation'

export default function ProjectWizard() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    skill_tags: [] as string[],
    location_lat: 0,
    location_lng: 0
  })
  
  const handleLocationDetected = (location: Location) => {
    setFormData({
      ...formData,
      location_lat: location.lat,
      location_lng: location.lng
    })
  }
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/projects', formData)
      window.location.href = `/projects/${response.data.id}`
    } catch (error) {
      console.error('Project creation failed:', error)
    }
  }
  
  return (
    <>
      <Head>
        <title>Create Project - Q-MÉTIER</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Create a Project</h1>
          
          <div className="bg-white rounded-lg shadow p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">What do you need?</h2>
                <input
                  type="text"
                  placeholder="Project title"
                  className="w-full p-3 border rounded mb-4"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
                <textarea
                  placeholder="Describe your project in detail..."
                  className="w-full p-3 border rounded mb-4 h-32"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
                <button
                  onClick={() => setStep(2)}
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            )}
            
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{t('project.locationAndSkills')}</h2>
                
                <LocationDetector 
                  onLocationDetected={handleLocationDetected}
                  autoDetect={true}
                />
                
                <p className="text-gray-600 mt-4 mb-4">
                  {t('project.locationHelp')}
                </p>
                
                <button
                  onClick={handleSubmit}
                  disabled={!formData.location_lat}
                  className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {t('project.createProject')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
