// App Component

import { BrowserRouter, Routes, Route } from 'react-router';
import { EventProvider } from '@/contexts';
import { Home } from '@/pages';

export function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </EventProvider>
  );
}

export default App;
