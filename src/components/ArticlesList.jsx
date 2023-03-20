import logo from "../static/logo.png";
import {useParams } from "react-router-dom";
import styled from "styled-components";
import Article from "./Article";
import { useState,useContext, useEffect } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";


const ArticlesList = ({feeds,articles}) => {
    const { feedname,articlename } = useParams();
    const {articlesLoading} = useContext(GlobalContext);
    const feed = feeds.find(feed => feed.feedName === feedname);
    let filteredArticles = [];
    useEffect(()=>{
    })
    if(feedname==="allarticles" || !feedname){
        filteredArticles = articles
    }
    else{
        filteredArticles = articles.filter((article) => article.feedName === feed?.feedName);
    }

    return (
        <StyledArticlesList className="styledArticleList">  
            <div className="article-list">
				<div className="source-name">
					<div className="icon">
                    {
                        feedname==="allarticles"||!feedname?
                        <span className="material-symbols-outlined">emergency</span>:
                        <img src={(feed? feed.feedIcon:feeds[0]?.feedIcon)} alt="" />
                    }
					</div>
					<div >{feedname==="allarticles" ||!feedname?"All Articles":(feed? feed.feedName:feeds[0]?.feedName)}</div>
				</div>
                <div className="list">
                    {
                    articlesLoading?
                    <div className="loading">
                        <img src={logo} alt="" />
                    </div>:
                    filteredArticles?.map((data,index)=>(
                        <Article data={data} index={index} isActive={data.title===articlename?true:false} key={data.id}/>
                    ))

                    }
                </div>
			</div>
        </StyledArticlesList>
    );
}
 
export default ArticlesList;

const StyledArticlesList = styled.div`
height: calc(100vh - 60px);
display: flex;
justify-content: flex-start;

.source-name .icon{
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
    overflow: hidden;
    border-radius: 40px;
    background: white;
    padding: 5px;
    margin: 0 0.5rem 0 0;
    border: 2px solid var(--secondary-lightest);
}
.source-name .icon img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}
.source-name{
    border-radius: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    padding:0 10px;
    background: var(--pallete-3);
    max-width: 300px;
}
.source-name > div{
    white-space: nowrap;
    width:100%;
    text-overflow: ellipsis;
    overflow: hidden;
}




.article-list{
    border-radius: 10px;
    margin: 1rem;
    padding: 1rem;
    min-width: 300px;
    max-width: 340px;
    background:var(--white);
    position: relative;
    box-shadow: 0 0 1rem #d4d4d4;
}
.article-list::-webkit-scrollbar{
    display: none;
}
.article-list .list{
    overflow-y: auto;
    /* overflow: scroll; */
    width: 100%;
    height:calc( 100% - 2rem );
    position: relative;
}
.article-list .list::-webkit-scrollbar{
    display: none;
}
.article-list .loader{
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.article-list .list>div:not(.loading){
    border-bottom: 2px solid var(--secondary-lightest) ;
    max-width: var(--max-width);
    margin: 0 auto;
}

.loading{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;

}
.loading img{
    width: 4rem;
    overflow: hidden;
    opacity: 0.2;
    filter: saturate(50%) ;
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
    /* display: none; */
    .styledArticleList{
        width: 100%;

    }
    .article-list .list>div:not(.loading){
        --max-width:100%;
        margin:0 1rem ;
    }
    .article-list .list>div>:nth-child(2){
        width: 250px;
    }

    .article-list{
        margin: 0;
        margin-top: calc(60px );
        box-shadow: none;
        border-radius: 0;
        min-width: 100%;
        max-width: unset;
        padding: 0;

    }
    .article-list .list{
        max-height: calc(100vh - 2rem - 60px - 50px);
    }


.source-name{
    border-radius: 25px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    width: 100vw !important;
    padding: 0;
    max-width: unset;
}

.source-name .icon{
    margin-left: 1rem;
}


}
`