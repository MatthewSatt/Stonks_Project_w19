import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { handleEdit } from '../../store/session';
// import * as sessionActions from "../../store/session"

const EditForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const username = user.username

    const[name, setName] = useState(username)


    useEffect(() => {
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let id = user.id
        await dispatch(handleEdit(name, id))
    }

  return (
    <form onSubmit={handleSubmit}>
        <h2>Nickname</h2>
        <input type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        ></input>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default EditForm

// username
// color pallete to theme to be changed
