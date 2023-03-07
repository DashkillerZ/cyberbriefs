import { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import user from "../static/user.jfif"
import {GlobalContext} from "../contexts/GlobalContext";

const Navbar = () => {
    const {handleSearch} = useContext(GlobalContext);
    return (
        <StyledNavbar>
				<div className="search">
					<span className="material-symbols-outlined">search</span>
					<input type="text" placeholder="Search..." onChange={(e)=>{handleSearch(e.target.value)}} />
				</div>
				<div className="right">
					<Link to="/" >
						<span className="material-symbols-outlined">notifications</span>
					</Link>
					<Link to="/" >
						<span className="material-symbols-outlined">mail</span>
					</Link>
					<div className="user-image">
						<img src={user} alt="" />
					</div>
					<div className="user-details">
						<div className="user-name">Austin Robertson</div>
						<div className="user-email">austin@example.com</div>
					</div>
				</div>
        </StyledNavbar>
    );
}

export default Navbar;
const StyledNavbar = styled.div`
*{
    /* border: 1px solid limegreen; */
}
background: var(--pallete-1);
display: flex;  
align-items: center;
width: 100%;
height: var(--navbar-height);
--padding-inline:20px;
.search{
    background: var(--white);
    margin: 0 0 0 var(--padding-inline);
    border-radius: 30px;    
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px 0 5px;
    width: 250px;
}
.search span{
    color: var(--secondary-light);
}
.search input{
    border: none;
    outline: none;
    width: 250px;
    height: 25px;
}
.right{
    display: flex;
    margin: 0 10px 0 auto;
    align-items: center;
}
.right > a{
    margin: 0 5px 0 0;
    color: var(--secondary-dark);
}
.right .user-image{
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    border-radius: 50px;
    margin: 0 10px;
}
.user-details{
    margin-right: var(--padding-inline);
}
.user-name{
    font-weight: 600;
}
.user-email{
    color: var(--secondary-dark);
    font-size:0.85rem;
}
.right .user-image img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
`