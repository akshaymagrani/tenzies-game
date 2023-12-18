import { useEffect } from "react";

function Die(props) {
        // on click a die, id should be passed to a local storages
        // number() should take values of the dies from local storage for those ids.
    const style={
        background: props.isHeld ? '#59E391' : 'white'
    }
    return(
        <div className='font-semibold text-2xl leading-4 bg-white shadow-md w-10 h-10 rounded p-3 m-3 flex-wrap' onClick={props.handleClick} style={style}>{props.value}</div>
    )
}

export default Die;