import { TailSpin } from 'react-loading-icons';

import './Loading.css'

const Loading = () => {
    return (
        <div className='Loading-container'>
            <TailSpin className='loading' stroke='#fff' fill='#fff' />
        </div>
    )
}

export default Loading