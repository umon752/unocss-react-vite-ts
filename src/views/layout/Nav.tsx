import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type NavProps = {};

const Nav: React.FC<NavProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <>
    <div className="bg-blue-100 sticky top-0 left-0 z-3000 py-[20px]">
      <div className="g-container flex flex-(items-center) gap-[20px]">
          <NavLink className={({isActive = false}) => {
            return `u-h4 text-blue-500 hover:(text-blue-500) ${isActive ? 'text-blue-800 font-bold' : ''}`
          }} to='/'>Usage</NavLink>
          <NavLink className={({isActive = false}) => {
            return `u-h4 text-blue-500 hover:(text-blue-500) ${isActive ? 'text-blue-800 font-bold' : ''}`
          }} to='form'>From</NavLink>
          <button type="button" className="u-h4 text-blue-500 hover:(text-blue-500)" onClick={() => navigate('/form')}>動態換頁 From</button>
          <NavLink className={({isActive = false}) => {
            return `u-h4 text-blue-500 hover:(text-blue-500) ${isActive ? 'text-blue-800 font-bold' : ''}`
          }} to='reactHookForm'>ReactHookForm</NavLink>
          <NavLink className={({isActive = false}) => {
            return `u-h4 text-blue-500 hover:(text-blue-500) ${isActive ? 'text-blue-800 font-bold' : ''}`
          }} to='tanstackForm'>TanstackForm</NavLink>
        </div>
      </div>
    </>
  )
}

export default Nav
