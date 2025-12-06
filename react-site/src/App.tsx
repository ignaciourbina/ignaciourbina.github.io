import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tools from './pages/Tools'
import Research from './pages/Research'
import Teaching from './pages/Teaching'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tools" element={<Tools />} />
        <Route path="research" element={<Research />} />
        <Route path="teaching" element={<Teaching />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
