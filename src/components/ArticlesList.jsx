import {useParams } from "react-router-dom";
import styled from "styled-components";
import Article from "./Article";
import axios from "axios";
import { useState,useContext } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";


const ArticlesList = ({feeds,articles}) => {
    const { feedname,articlename } = useParams();
    let {filteredArticles,separateDate} = useContext(GlobalContext);
    const feed = feeds.find(feed => feed.feedName === feedname);

    if(!feedname){
        filteredArticles = articles.filter((article) => article.feedName === feeds[0]?.feedName);
    }
    else{
        filteredArticles = articles.filter((article) => article.feedName === feed?.feedName);
    }

    return (
        <StyledArticlesList className="styledArticleList">
            <div className="article-list">
				<div className="source-name">
					<div className="icon">
						<img src={feed? feed.feedIcon:feeds[0]?.feedIcon} alt="" />
					</div>
					<div title={feed? feed.feedName:feeds[0]?.feedName}>{feed? feed.feedName:feeds[0]?.feedName}</div>
				</div>
                <div className="list">
                    {filteredArticles?.map((data)=>(
                        <Article data={data} isActive={data.title===articlename?true:false} key={data.id}/>
                    ))}
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
    background:var(--white);
    position: relative;
    box-shadow: 0 0 1rem #d4d4d4;
    /* overflow: auto;   */
}
.article-list::-webkit-scrollbar{
    display: none;
}
.article-list .list{
    overflow-y: auto;
    overflow: scroll;
    width: 100%;
    height:calc( 100% - 2rem );

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
.article-list .list>div{
    border-bottom: 2px solid var(--secondary-lightest) ;
}
@media screen and (max-width:1000px) {
    height: 200px;
    .article-list{
        margin-bottom: 1px;
        margin-left:80px;
        width: 100%;

    }
}
`