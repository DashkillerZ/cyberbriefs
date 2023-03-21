import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState,useContext, useEffect } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";
import { motion } from "framer-motion";
const Feed = ({data ,articles,isActive}) => {
    let {mobile,responsiveMenu} = useContext(GlobalContext);
    let articlelink = articles?.find(article=>data?.feedName===article?.feedName);


    return (
        <motion.div
            animate={{}}
            Layout
        >
        <StyledFeed>
            <Link to={`/${data?.feedName}/${!mobile?(encodeURIComponent(articlelink?.title)):""}`}  className={isActive?"list-el active":"list-el"} key={data?.id} onClick={() => {}}>
                <div className="icon">
					<img src={data?.feedIcon} alt="" />
				</div>
				<div className={!responsiveMenu?"source-title":"gone"} title={data?.feedName}>{data?.feedName}</div>
				<span className={!responsiveMenu?"material-symbols-outlined":"gone"} >expand_more</span>
				<div className={!responsiveMenu?"border-right":"gone"}></div>
			</Link>
        </StyledFeed>
        </motion.div>
    ); 
}
export default Feed;

const StyledFeed = styled.div`
--transition-time:300ms ;
--max-width: 300px;
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
    .list-el{
        max-width: 100vw;

    }
    .gone{
        display: none;
    }
    /* .source-title{
        display: none;
    }
    .material-symbols-outlined{
        display: none;
    }
    .border-right{
        display: none;
    } */
}
`