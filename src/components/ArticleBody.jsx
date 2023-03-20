import logoName from "../static/logoName.png";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState,useContext } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";


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
            {
            articleLoading
            ?
            <div className="loading">
                <img src={logoName} alt="" />
            </div>
            :
            <>
			<div className="published">
                {article?.publishedDate &&
                "Published: " +
                separateDate(article.publishedDate)[1] +
                  " " +
                  separateDate(article.publishedDate)[2] +
                  ", " +
                  separateDate(article.publishedDate)[0]}
            </div>
			<div className="title">{article?.title}</div>
			<div className="summery">
				<p>{article?.summary}</p>
			</div>
            </>}
        </StyledArticleBody>
    );
}
 
export default ArticleBody;

const StyledArticleBody = styled.div`

border-radius: 10px;
margin: 1rem;
margin-left: 0;
padding: 1rem;
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
@keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
}
@media screen and (max-width:500px) {
box-shadow: none;
border-radius: 0;
margin: 0;
margin-top: calc(50px  + 1rem - 6px);
height: calc(100vh - 2rem - 2rem - var(--navbar-height));
/* display: none; */
padding: 0.5rem;
}
`