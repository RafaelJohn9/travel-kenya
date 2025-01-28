import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function SliderExperiences({ e }) {
    const [current, setCurrent] = useState(0);

    const showNext = () => {
        setCurrent((prev) => (prev + 1) % e.length); 
    };

    const showPrev = () => {
        setCurrent((prev) => (prev - 1 + e.length) % e.length); 
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % e.length);
        }, 3000);

        return () => clearTimeout(timer); 
    }, [current, e.length]);

    return (
        <div className="slider">
            <div>{e[current]}</div>
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
