import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState,useContext, useEffect } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";
const Feed = ({data ,articles,isActive}) => {
    let {mobile,setMobile} = useContext(GlobalContext);
    let articlelink = articles?.find(article=>data?.feedName===article?.feedName);
    useEffect(()=>{
        function resize(){
            if(window.innerWidth<500){
                setMobile(true)
            }
            if(window.innerWidth>500){
                setMobile(false)
            }
        }
        window.addEventListener("load",()=>{
            // resize();
            if(window.innerWidth<500){
                setMobile(false)
            }
            if(window.innerWidth>500){
                setMobile(true)
            }
        })
        window.addEventListener("resize",resize);
    },[])

    return (
        <StyledFeed>
            <Link to={`/${data?.feedName}/${!mobile?(encodeURIComponent(articlelink?.title)):""}`} className={isActive?"list-el active":"list-el"} key={data?.id} onClick={() => {}}>
				<div className="icon">
					<img src={data?.feedIcon} alt="" />
				</div>
				<div className="source-title" title={data?.feedName}>{data?.feedName}</div>
				<span className="material-symbols-outlined">expand_more</span>
				<div className="border-right"></div>
			</Link>
        </StyledFeed>
    ); 
}
export default Feed;

const StyledFeed = styled.div`
--transition-time:300ms ;
--max-width: 300px;
scroll-snap-type: y mandatory !important;
.list-el{
    display: flex;
    align-items: center;
    height: 50px;
    text-decoration: none;
    color:unset ;
    transition:  var(--transition-time);
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    max-width: var(--max-width);
}
.list-el.active .border-right{
    transform: translate(0);
}
.list-el.active {
    background: var(--secondary-lightest);
}
.list-el.active .icon{
    filter: saturate(100%);

}
.list-el.active .material-symbols-outlined{
    transform: rotate(-90deg);
}
.list-el:hover .border-right{
    transform: translate(0);
}
.list-el:hover {
    background: var(--secondary-lightest);
}
.list-el:first-child{
    border-top: 2px solid var(--secondary-lightest);

}
.list-el .source-title{
    font-size: 0.8rem;
    margin: 0 4px;
    white-space: nowrap;
    width:calc( 100% - 20px);
    text-overflow: ellipsis;
    overflow: hidden;
}

.list-el .icon{
    width: 1.5rem ;
    height: 1.5rem;
    min-width: 1.5rem;
    margin: 4px;
    margin-left: 10px;
    padding: 5px;
    border: 2px solid var(--secondary-lightest);
    border-radius: 2rem;
    background: var(--white);
    filter: saturate(0%);
}
.list-el img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
}
.list-el .material-symbols-outlined{
    margin-right: 15px;
    color: var(--secondary-light);
    transition: var(--transition-time);
}
.list-el .border-right{
    height: 100%;
    width: 5px;
    background: var(--pallete-4);
    transform: translateX(4px);
    transition: var(--transition-time);
}
@media screen and (max-width:500px){
height: var(--navbar-height);
    .list-el{
        width: min-content;
        height: var(--navbar-height);

    }
    .list-el .icon {
        margin: 5px;
    }

    .source-title{
        display: none;
    }
    .material-symbols-outlined{
        display: none;
    }
    .border-right{
        display: none;
    }
}
`