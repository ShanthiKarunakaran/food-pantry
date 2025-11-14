import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";


export default function App() {
  return (
    <>
      < Header navbarSpot={<Navbar/>}/>
      <Footer />
      <Form />
    </>
  );
}
