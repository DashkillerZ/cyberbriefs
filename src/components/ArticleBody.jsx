import logoName from "../static/logoName.png";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState,useContext } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";
import { motion } from "framer-motion";


const ArticleBody = ({feeds,articles}) => {
    let {articleLoading,separateDate} = useContext(GlobalContext);
    const { feedname,articlename } = useParams();
    const feed = feeds.find((feed) => feed.feedName === feedname);
    let article;
    if(!articlename ){
        article = articles[0]
    }
    else{
        article = articles.find((article) => article?.feedName == feed?.feedName && article.title == articlename)
    }

    return (
        
        <StyledArticleBody>
        <motion.div>
            {
            articleLoading
            ?
            <div className="loading">
                <img src={logoName} alt="" />
            </div>
            :
            <>
            <div className="back">
                <Link to={"/"+feedname}>
                    <span class="material-symbols-outlined">arrow_back</span>
                </Link>
            </div>
			<div className="published">
                {article?.publishedDate &&
                "Published: " +
                separateDate(article.publishedDate)[1] +
                  " " +
                  separateDate(article.publishedDate)[2] +
                  ", " +
                  separateDate(article.publishedDate)[0]}
            </div>
			<Link target={"_blank"} to={article?.link} className="title">{article?.title}</Link>
			<div className="summery">
				<p>{article?.summary}</p>
			</div>
            </>}
        </motion.div>
        </StyledArticleBody>
    );
}
 
export default ArticleBody;

const StyledArticleBody = styled.div`

border-radius: 10px;
margin: 1rem;
margin-left: 0;
padding-block: 1rem;
background: var(--white);
box-shadow: 0 0 1rem #d4d4d4;
overflow-x: hidden;
overflow-y: auto;
position: relative;
width: 100%;
height: calc(100vh - 2rem - 2rem - var(--navbar-height));


&>img{
    margin: 1rem;
    width: 70%;
    border-radius: 10px;
}
.published{
    margin-left: 1.3rem;
    font-size: 0.8rem;
    margin-bottom: 2rem;    
    color: var(--pallete-4);
    font-weight: 500;
}   
.title{
    margin-left: 1rem;
    font-size: 1.5rem;    
    font-weight: 600;
    display: block;
    text-decoration: none;
    color: unset;
}   
.title:hover{
    text-decoration: underline;

}
p{
    margin-left: 1rem;
    color: var(--secondary-dark);
    font-size: 0.9rem;
    margin-top: 2rem;
    
}
&::-webkit-scrollbar{
    display: none;
}
.back{
    display: none;
    position: absolute;
    right: 10px;
    border-radius: 100%;
    align-content: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: var(--secondary-lightest);

}
.back a{
    display: block;
    text-decoration: none;
    height: min-content;
    color: var(--pallete-4);
    margin-top:2px;
}
.loading{
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading img{
    height: 1.2rem;
    overflow: hidden;
    opacity: 0.2;
    filter: saturate(20%) ;
    position: relative;
}
.loading::after{
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg,transparent,#ffffffa1,transparent);
    animation: shimmer 2s infinite;
}
.summery{
    margin-right: 0.5rem;
}
@keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
}
@media screen and (max-width:500px) {
.back{
    display: flex;
}
.published{
    margin-bottom: 1rem;    

}
.summery{
    padding:  0 0 30px 0;
}
.summery p{
    margin-top: 1rem;
}
box-shadow: none;
border-radius: 0;
margin: 0;
margin-top: calc(50px  + 1rem - 6px);
height: calc(100vh - 2rem - 2rem - var(--navbar-height));
/* display: none; */
}
`