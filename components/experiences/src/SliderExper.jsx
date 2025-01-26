import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react'

export default function SliderExperiences(e) {

    return (
        <div className='slider'>
            {e.map((n, i)=>{
                <div className="image">
                    <div>{}</div>
                    <div>{}</div>
                </div>
            })}
            <button><ArrowBigLeftDash /></button>
            <button><ArrowBigRightDash /></button>
        </div>
    )
}