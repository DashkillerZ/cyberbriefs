import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";
import { motion } from "framer-motion";

const Article = ({data,isActive,index}) => {
    let {separateDate} = useContext(GlobalContext);
    let [starred,setStarred]=useState(false);
    let articleRef = useRef();
    useEffect(()=>{
        if(isActive){
            articleRef.current.scrollIntoView({ behavior: "smooth" });
        }
    },[isActive])
    return (
        <motion.div
            animate={{ scale:[0.9, 1 ],opacity:[0.5, 1 ]}}
        >

        <StyledArticle className="article">
		    <Link to={`/${data.feedName}/${encodeURIComponent(data.title)}`} ref={articleRef} className={isActive?"list-el active":"list-el"}>
		    	<div className="icon" style ={index%2===0?{background:"var(--pallete-4)"}:{background:"var(--pallete-5)"}}>
		    		<span className="material-symbols-outlined">forum</span>
		    	</div>
		    	<div>
		    		<div className="article-title" title={data.title}>{data.title}</div>
                    <div className="article-summery">{data.summary}</div>
		    	</div>
		    	<div>
		    		<div className="article-date">
                        {separateDate(data.publishedDate)[3]}
                        &nbsp;
                        {separateDate(data.publishedDate)[5]}
                    </div>
		    		<div className="favourite" onClick={()=>{setStarred(!starred)}}>
		    			{/* <span className="material-symbols-outlined">star</span> */}
                        <svg width="20" height="19" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 10.5C11 10.5 1.9 11.5 1.5 11.5L9 18.5L7 28.5L15.5 23L24 28.5L22.5 18.5L29 11.5L19.5 10.5L15.5 2L11 10.5Z" fill={starred?"#fbff00":""} stroke="black"/>
                        </svg>

		    		</div>
		    	</div>
		    </Link>
        </StyledArticle>
        </motion.div>

    );
}
 
export default Article;

const StyledArticle = styled.div`
--transition-time: 300ms   ;
--padding-inline:10px;
--max-width:330px;
.list-el{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    border-radius: 10px;
    margin: 8px 0;
    text-decoration: none;
    color: unset;
    user-select: none;
    transition:var(--transition-time) ;
    max-width: var(--max-width);
}
.list-el:hover{
    background: var(--secondary-lightest);
}
.list-el.active{
    background: var(--secondary-lightest);
}
.list-el .icon{
    color: var(--white);
    padding: 4px;
    width: 30px;
    min-width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    margin-left: var(--padding-inline);
    background: var(--pallete-4);
    
}



.list-el>div:nth-child(2){
    width: 200px;
    margin:0 5px;
}
.list-el .article-title{
    white-space: nowrap;
    width:100%;
    text-overflow: ellipsis;
    overflow: hidden;
    margin:0 0 5px 0;
    font-size: 0.9rem;

}
.list-el .article-title::first-letter{
    text-transform: uppercase;
}
.list-el .article-summery{
    color: var(--secondary-lighter);
    font-size: 0.7rem;
    width:100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: flexbox;
    line-clamp: 2;
    box-orient: vertical;
}
.list-el .article-summery::first-letter{
    text-transform: uppercase;
}


.list-el>div:last-child{
    margin-right: var(--padding-inline);
}
.list-el .article-date{
    margin:0 0 5px 0;
    color: var(--secondary-lighter);
    font-size: 0.8rem;
    
}
.list-el .favourite{
    color: var(--secondary-lighter);
    text-align: center;
    position: relative;

}

.list-el .favourite svg path{
    stroke:var(--secondary-lighter);
    stroke-width: 2px;
    /* position: absolute; */
}
.list-el .favourite:hover svg path{
    stroke:var(--pallete-5);
    /* fill:#fbff003f; */

}

@media screen and (max-width:500px) {
    .list-el>div:nth-child(2){
        width: 250px;
    }
}
@media screen and (max-width:400px) {
    .list-el>div:nth-child(2){
        width: 200px;
    }
}
@media screen and (max-width:340px) {
    .list-el>div:nth-child(2){
        width: 150px;
    }
}
`