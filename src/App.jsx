import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import GitHub from "./pages/Github";
import Footer from "./components/Footer";
import { NamesProvider } from "./context/NamesProvider";

function App() {
  return (
    <NamesProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/edit" element={<Edit />} />

          <Route path="/github" element={<GitHub />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </NamesProvider>
  );
}

export default App;
