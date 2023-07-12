import { SpinningCircles } from 'react-loading-icons';

import './Loading.css'

const Loading = () => {
    return (
        <div className='Loading-container'>
            <SpinningCircles className='loading' stroke='#fff' fill='#fff' />
        </div>
    )
}

export default Loading