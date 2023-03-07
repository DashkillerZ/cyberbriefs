import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState,useContext } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";


const ArticleBody = ({feeds,articles}) => {
    let {searchQuery} = useContext(GlobalContext);
    const { feedname,articlename } = useParams();
    const feed = feeds.find((feed) => feed.feedName === feedname);
    let article;
    if(searchQuery===""){
        if(!articlename ){
            article = articles[0]
        }
        else{
            article = articles.find((article) => article?.feedName == feed?.feedName && article.title == articlename)
        }
    }else{
        article = articles?.filter(article=>article.title.toLowerCase().includes(searchQuery?.toLowerCase()))[0];
    }
    function separateDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        const hour = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const months = ["January","February","March","April","May","June","July","August","September","Octomber","November","December"];
        const hours = () => {
            if (hour > 13) {
                return hour - 12;
            }
            if (hour < 13) {
                return hour;
            }
        };
        return [year, months[month], day, hours(), minutes];
    }
    return (
        <StyledArticleBody>
			{/* <img src="./image.png" alt="" /> */}
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
        </StyledArticleBody>
    );
}
 
export default ArticleBody;

const StyledArticleBody = styled.div`



border-radius: 10px;
margin: 1rem;
padding: 1rem;
background: var(--white);
box-shadow: 0 0 1rem #d4d4d4;
overflow-x: hidden;
overflow-y: auto;
position: relative;
width: 100%;
height: calc(100vh - 2rem - 2rem - var(--navbar-height));


img{
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

.loader{
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
`