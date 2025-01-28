import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import "./slider.css"

function SliderExperiences({ e }) {
    const [current, setCurrent] = useState(0);

    const showNext = () => {
        setCurrent((prev) => (prev + 1) % e.length); 
    };

    const showPrev = () => {
        setCurrent((prev) => (prev - 1 + e.length) % e.length); 
    };

    

    const themes = [
        "rgba(0, 0, 255, .2)",
        "rgba(0, 255, 255, .2)",
        "rgba(110, 255, 0, .2)",
        "rgba(230, 111, 127, .2)",
        "rgba(255, 0, 110, .2)
    ]; //for research
    
    const [currentTheme, setTheme] = useState(0);

    const expback = {
        backgroundColor: themes[currentTheme], //change on each slide
        backgroundPosition: "center",
        objectFit: "cover",
        height: "fit-content",
        width: "100%",
    }

    const removeLocItem = (index, current) => {
        return e[current].locations.filter(item => item !== removeValue);
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % e.length);
            setTheme((prev) => (prev + 1) % e.length);
        }, 3000);

        return () => clearTimeout(timer); 
    }, [current, e.length]);

    return (
        <div className="slider">
            <div className='expeContainer'>
                <div style={expback}>
                    <span className='experience-tag'>{e[current].experience}</span>
                    {e[current].location.map((item, index) => (
                        <span key={index} className="loc-item">
                            <button className='remove-loc-item' onClick={removeLocItem(index, current)}></button>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
            <button onClick={showPrev} className="sliderBtn">
                <ArrowBigLeftDash />
            </button>
            <button onClick={showNext} className="sliderBtn">
                <ArrowBigRightDash />
            </button>
        </div>
    );
}

SliderExperiences.propTypes = {
    e: PropTypes.array.isRequired,
};

export default SliderExperiences;
