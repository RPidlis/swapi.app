import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import s from './AutoCompleteComponent.module.css'

const AutoCompleteComponent = ({redirect, characters}) => {

    let [id, setId] = useState(null)

    useEffect(() => {
        // redirect on click to profile
        if (Number.isInteger(id)) {
            redirect(id)
        }
    }, [id, redirect])

    return (
        <>
            <Autocomplete
                className={s.autocomplete}
                id="combo-box-demo"
                onChange={(event, option) => {
                    setId(option.id)
                }}
                options={characters}
                getOptionLabel={(option) => option.name}
                style={{width: 300}}
                renderInput={(params) =>
                    <TextField {...params} label="Search character by name" variant="outlined"/>}
            />
        </>
    )
}


export default AutoCompleteComponent