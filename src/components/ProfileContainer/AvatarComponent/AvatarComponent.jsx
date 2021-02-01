import React from 'react'
import s from './AvatarComponent.module.css'

const AvatarComponent = ({storePhoto}) => {

    const changeHandler = (event) => {
        storePhoto(event.target.files[0])
    };

    return(
        <div >
            <label htmlFor={'file'}> Upload Photo
                <input type={'file'} id='file'
                       className={s.file}
                       onChange={changeHandler}/>
            </label>
        </div>
    )
}

export default AvatarComponent

