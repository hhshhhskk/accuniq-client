// import logo from "./logo.svg";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Visual from "./components/Visual";
import Recommend from "./components/Recommend";

function App() {
  return (
    <div className="wrap">
      {/* 상단 영역 */}
      <Header />
      {/* 메인 영역 */}
      <div className="main">
        <Visual />
        <Recommend />
      </div>
      {/* 하단 영역 */}
      <Footer />
    </div>
  );
}

export default App;
