import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type NavProps = {};

const Nav: React.FC<NavProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <>
    <div className="bg-blue-100 sticky top-0 left-0 z-3000 py-20">
      <div className="g-container flex flex-(items-center) gap-20">
          <NavLink className={({isActive = false}) => {
            return `text-blue-500 u-h4 hover:(text-blue-500) ${isActive ? 'text-blue-800 font-bold' : ''}`
          }} to='/'>Usage</NavLink>
          <NavLink className={({isActive = false}) => {
            return `text-blue-500 u-h4 hover:(text-blue-500) ${isActive ? 'text-blue-800 font-bold' : ''}`
          }} to='form'>From</NavLink>
          <button type="button" className="text-blue-500 u-h4 hover:(text-blue-500)" onClick={() => navigate('/form')}>動態換頁 From</button>
        </div>
      </div>
    </>
  )
}

export default Nav
