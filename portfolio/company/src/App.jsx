import Header from "./include/Header"
import Footer from "./include/Footer"

function App() {

  return (
    <>
      <Header/>
      <main>
        <div className="row">
          <div className="col">
            <div className="hero">
              <h3> Editor's choice </h3>
              <h4> Sebasian Weiss</h4>
              <h1>Urban Storkes</h1>
              <a href="#" className="button">Read More</a>
            </div>
          </div>
        </div>

        <div className="gallery-row">
          <div className="col col-md-one-half">
            <div className="info-box-tan">
              <h2>Inspring Reads</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, eaque!</p>
              <a href="#" className="button">Read More</a>
            </div>
          </div>
          <div className="col col-md-one-half">
            <div className="info-box-dark">
              <h2>Reflections</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, natus.</p>
              <a href="" className="button">Read More</a>
            </div>
          </div>
        </div>
        
        <div className="gallery-row">
          <div className="col col-md-one-half col-lg-one-fourth">
            <img src="img/gallery-1.jpg" alt="gallery1" />
          </div>
          <div className="col col-md-one-half col-lg-one-fourth">
            <img src="img/gallery-2.jpg" alt="gallery2" />
          </div>
          <div className="col col-md-one-half col-lg-one-fourth">
            <img src="img/gallery-3.jpg" alt="gallery3" />
          </div>
           <div className="col col-md-one-half col-lg-one-fourth">
            <img src="img/gallery-4.jpg" alt="gallery4" />
          </div>
        </div>

      </main>
      <Footer/>
    </>
  )
}

export default App
