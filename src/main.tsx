import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css' // Import Tailwind CSS
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <Toaster/>
      <App />
    </BrowserRouter>

)

