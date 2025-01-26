import { experiences } from './experiences'
import './App.css'
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react'

function App() {
  
  return (
    <>
      <div className="contents">
        {experiences.map((item, index) => {
          <div key={index} className="image">
            <div>
              <h1>{item.experience}</h1>
              {item.locations.map((item, index) => {
                <li key={index}>
                  <span>{item.place}</span>
                  <span>{item.rating}</span>
                  <span>{item.reviews}</span>
                </li>
              })}
            </div>
            <div className='cool-des-app'>
              <span></span>
              <div id="my_div" style={{
                outline: "none",
                height: "70px",
                transform: "rotate(90deg)"
              }}>
                <svg width='100%' height='100%' viewBox='0 0 100 100' preserveAspectRatio='none'>
                    <line x1="0" y1="0" x2="100" y2="100" vector-effect="non-scaling-stroke" stroke="white" />
                  </svg>
              </div>
              <div className='ex'>{item.description}</div>
            </div>
          </div>
        })}

        <div className='slider-nav'>
          {experiences.map((item, index) => {
            <button onClick={showElem} className="keyBTN" key={index}>{item.experience}</button>
          })}
          <button onClick={showPrev} className='showPrev'><ArrowBigLeftDash /></button>
          <button onClick={showNext} className='showNext'><ArrowBigRightDash /></button>
        </div>
      </div>
    </>
  )
}

export default App
