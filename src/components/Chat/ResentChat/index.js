import React, { useContext } from 'react'
import { darkContext } from '../../../context/DarkmodeContext'

function ResentChat() {
  const [state, dispatch] = useContext(darkContext)
  const toggleTheme = (color) => {
    dispatch({
      type: color
    })
  }
  return (
    <div>
      <button
      onClick={()=>toggleTheme('MAKE_DARK')}
      >toggle theme dark</button>
       <button
      onClick={()=>toggleTheme('MAKE_LIGHT')}
      >toggle theme light</button>
      <div
      style={{
        background: state.background,
        color: state.font1,
        width: '100px',
        height: '100px'
      }}
      >test</div>
    </div>
  )
}

export default ResentChat