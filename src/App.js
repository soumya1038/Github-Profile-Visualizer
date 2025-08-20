import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Repository from './components/Repository'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/repository" element={<Repository />} />
    <Route path="/analysis" element={<Analysis />} />
    {/* Catch-all route for invalid paths */}
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
