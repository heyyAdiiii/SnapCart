import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
   <>
    <Header/>
     <main className='min-h-[85vh] '>
      <Outlet/>
     </main>
     <Footer/>
   </>
  )
}

export default App