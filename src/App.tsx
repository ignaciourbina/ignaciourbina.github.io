import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { usePageTracking } from './lib/analytics'
import Home from './pages/Home'
import Tools from './pages/Tools'
import Research from './pages/Research'
import Teaching from './pages/Teaching'
import About from './pages/About'
import CV from './pages/CV'
import Conferences from './pages/Conferences'
import ConferenceViewer from './pages/ConferenceViewer'
import MathCamp from './pages/MathCamp'
import MathCampUnit from './pages/MathCampUnit'
import MathCampViewer from './pages/MathCampViewer'
import MathCampQuiz from './pages/MathCampQuiz'
const MathCampPractice = lazy(() => import('./pages/MathCampPractice'))
const GpuGateway = lazy(() => import('./pages/GpuGateway'))

function App() {
  usePageTracking()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tools" element={<Tools />} />
        <Route
          path="tools/gpu-gateway"
          element={
            <Suspense fallback={null}>
              <GpuGateway />
            </Suspense>
          }
        />
        <Route path="research" element={<Research />} />
        <Route path="teaching" element={<Teaching />} />
        <Route path="math-camp" element={<MathCamp />} />
        <Route path="math-camp/:unitId" element={<MathCampUnit />} />
        <Route path="math-camp/:unitId/self-assessment" element={<MathCampQuiz />} />
        <Route
          path="math-camp/:unitId/practice"
          element={
            <Suspense fallback={null}>
              <MathCampPractice />
            </Suspense>
          }
        />
        <Route path="math-camp/:unitId/:slug" element={<MathCampViewer />} />
        <Route path="conferences" element={<Conferences />} />
        <Route path="conferences/:slug" element={<ConferenceViewer />} />
        <Route path="about" element={<About />} />
        <Route path="cv" element={<CV />} />
      </Route>
    </Routes>
  )
}

export default App
