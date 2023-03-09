import { useState,useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import user from "../static/user.jfif"
import {GlobalContext} from "../contexts/GlobalContext";

const Navbar = ({articles}) => {
    const {handleSearch,searchQuery,setSearchQuery} = useContext(GlobalContext);
    function handleSearchClick(){
        setSearchQuery("")
    }
    
    return (
        <StyledNavbar>
				<div className="search">
					<span className="material-symbols-outlined">search</span>
					<input type="text" placeholder="Search..." onChange={(e)=>{handleSearch(e.target.value)}} />
                    
                    {searchQuery!=="" && <div className="search-list">
                        {articles?.filter(article=>article.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(data=>(
                        <div className="list-el" key={data.id}>
                            <Link to={`/${data.feedName}/${data.title}`} onClick={()=>handleSearchClick()} >
                                <span>{data.title}</span>
                                <div>- {data.feedName}</div>
                            </Link>
                        </div>
                        ))}
                    </div> }
				</div>
				{/* <div className="right">
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
				</div> */}
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
    position: relative;
}
.search span{
    color: var(--secondary-dark);
    
}
.search input{
    border: none;
    outline: none;
    width: 250px;
    height: 25px;
}

.search .search-list{
    position: absolute;
    background: var(--white);
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(35px);
    border-radius: 10px;
    min-height: 30px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1;
    box-shadow: 0 0 20px var(--secondary-lighter);
}
.search .search-list .list-el a{
    text-decoration: none;
    color: var(--secondary-darker);
    margin: 10px;
    padding: 4px;
    display: block;
    border-radius: 5px;
    white-space: nowrap;
    width:calc(100% - 18px); 
    text-overflow: ellipsis;
    overflow: hidden;
    
}
.search .search-list .list-el a>span{
    font-size: 0.9rem;
    
}

.search .search-list .list-el div{
    font-size: 0.8rem;
    color: var(--secondary-light);
    white-space: nowrap;
    width:calc(100% - 18px); 
    text-overflow: ellipsis;
    overflow: hidden;
    

}
.search .search-list a:hover{
    background: var(--pallete-1);
}
.search .search-list .list-el{
    border-bottom: 1px solid var(--pallete-1);
    padding-bottom: 3px;
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
@media screen and (max-width:1000px){
    padding-left: 60px;
    width:  calc( 100% - 60px);
}

`