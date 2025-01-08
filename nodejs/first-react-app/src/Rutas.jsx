import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home2 from './Home2';
import Article from './Article';
import Category from './Category';

export default function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/news/:id" element={<Article />} />
        <Route path="/:category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}
