import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";

function App(props) {
  return (
    <section className={props.className}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='demo' element={<Chat />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
