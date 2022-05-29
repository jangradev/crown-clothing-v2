import { Routes, Route } from 'react-router-dom';

import Home from '../src/routes/home/home.component.jsx';
import Navigation from './routes/navigation/navigation.component.jsx';
import SignIn from './routes/signIn/signIn.component.jsx';

const Shop = () => {
  return (
    <div>
      <h1> i am at Shop Page</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='signIn' element={<SignIn />} />
      </Route>
    </Routes>
  );
};
export default App;
