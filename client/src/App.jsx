
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Register />} path='/register' />
      <Route element={<Login />} path='/' />
      <Route element={<ProtectedRoute/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
