import { HeaderContainer } from './sytyles'
import LogoIgnite from '../../assets/logo-ignite.svg'
import React from 'react'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt='' />
      <nav>
        <NavLink to='/' title='timer'>
          <Timer size={24} weight='fill' />
        </NavLink>
        <NavLink to='/history' title='History'>
          <Scroll size={24} weight='fill' />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
