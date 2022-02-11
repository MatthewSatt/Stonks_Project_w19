import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { handleEdit } from '../../store/session';
// import * as sessionActions from "../../store/session"
import ProfileDisplay from '.';


// const COLORS = ["rgb(30, 30, 218)", "rgb(0, 167, 0)", "rgb(223, 22, 206)", "rgb(235, 16, 16)", "rgb(251, 255, 0)"]


const EditForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const username = user.username

    const[name, setName] = useState(username)
    // const [newColor, setNewColor] = useState(COLORS[0])

    // const setTextTheme = () => {

    // }

    useEffect(() => {
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let id = user.id
        await dispatch(handleEdit(name, id))
    }

  return (
    <form className='form__container' onSubmit={handleSubmit}>
        <h2>Nickname</h2>
        <input type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        ></input>
        <div id='change__theme__container'>
          <h3>Change Theme</h3>
          <div className='color__palette'>
            <div className='color1__container'>
              <button id='theme__color__btn1' className='color1'></button>
            </div>
            <div className='color2__container'>
              <button id='theme__color__btn2' className='color2'></button>
            </div>
            <div className='color3__container'>
              <button id='theme__color__btn3' className='color3'></button>
            </div>
            <div className='color4__container'>
              <button id='theme__color__btn4' className='color4'></button>
            </div>
            <div className='color5__container'>
              <button id='theme__color__btn5' className='color5'></button>
            </div>
          </div>
        </div>
        <button className='submit__edit__form' type='submit'>Submit</button>
    </form>
  )
}

export default EditForm;

// username
// color pallete to theme to be changed
