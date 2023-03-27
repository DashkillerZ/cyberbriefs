import logoName from "../static/logoName.png";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useContext, useRef } from 'react';
import { GlobalContext } from "../contexts/GlobalContext";
import { motion } from "framer-motion";
import axios from "axios";

const ArticleBody = ({ feeds, articles }) => {
    let { articleLoading, separateDate } = useContext(GlobalContext);
    let [chatResponse, setChatResponse] = useState("");
    const { feedname, articlename } = useParams();
    let chatRef = useRef();
    const feed = feeds.find((feed) => feed.feedName === feedname);
    let article;
    if (!articlename) {
        article = articles[0]
    }
    else {
        article = articles.find((article) => article?.feedName == feed?.feedName && article.title == articlename)
    }
    const handleChat = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/chat/chat',
                { prompt: chatRef.current.value }
            );
            console.log(response.data);
            setChatResponse(response.data.response)
        } catch (error) {
            console.error(error);
        }
    }
    function clearChat(){
        setChatResponse("");
        chatRef.current.value ="";
    }
    return (

        <StyledArticleBody>
            <motion.div className="article-body">
                {
                    articleLoading
                        ?
                        <div className="loading">
                            <img src={logoName} alt="" />
                        </div>
                        :
                        <>
                            <div className="back">
                                <Link to={"/" + feedname}>
                                    <span className="material-symbols-outlined">arrow_back</span>
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
                                {article?.summary.split('\n').map((line, index) => (
                                  <p key={index}>
                                    {line}
                                    <br />
                                  </p>
                                ))}
                                {/* <p>{article?.summary}</p> */}
                            </div>
                            
                        </>}
            </motion.div>
            <motion.div
                className="helper"
            >
                <form className="flex" onSubmit={handleChat} >
                    <input type="text" ref={chatRef} placeholder="Type to ask ChatGPT" />
                    <div className="btn" onClick={()=>clearChat()} ><span className="material-symbols-outlined">close</span></div>
                    <button type="submit" disabled={false} ><span className="material-symbols-outlined">send</span></button>
                </form>
                { chatResponse && <div className="answer" Layout>{chatResponse}</div>}
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
overflow: hidden;
position: relative;
width: 100%;
height: calc(100vh - 2rem - 2rem - var(--navbar-height));
.article-body{
    overflow-y: auto;
    height: calc(100vh - 2rem - 2rem - var(--navbar-height) - 40px);
}
.helper{
    position: absolute;
    bottom: 10px;
    inset:  auto 1% 10px 1%;
    width: 98%;
    background: var(--secondary-lightest);
    border-radius: 10px;
    /* outline-color:var(--secondary-light); */

}
.helper .flex{
    display: flex;
}
.helper input{
    width: 100%;
    border: none;
    display: inline;
    margin-left: 2%;
    height: 40px;
    border-radius: 10px;
    background: transparent;
    outline: none;
}
.helper .btn{
    background: transparent;
    border: none;
    user-select: none;
    cursor: pointer;
    display: inline-flex;
    margin-right: 5px;
    padding: 5px;
    border-radius: 10px;
    align-self: center;
    color:var(--secondary-dark);
}
.helper .btn:hover{
    background: var(--secondary-lighter);
}
.helper button{
    background: transparent;
    border: none;
    display: inline-flex;
    margin-right: 5px;
    padding: 5px;
    border-radius: 10px;
    align-self: center;
    color:var(--secondary-dark);
}
.helper button:hover{
    background: var(--secondary-lighter);
}
.helper .answer{
    max-height: 100px;
    padding-block: 10px;
    margin-inline:15px;
    font-size: 0.8rem;
    overflow-y:auto;

}
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
    
}
p:first-of-type{
    margin-top: 2rem;
}
.article-body::-webkit-scrollbar{
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
    height: 5rem;
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
        /* padding:  0 0 30px 0; */
    }
    .summery p{
        margin-top: 1rem;
    }
    box-shadow: none;
    border-radius: 0;
    margin: 0;
    margin-top: calc(50px  + 1rem - 6px);
    height: calc(100svh - var(--navbar-height) * 3 + 10px);
    .article-body{
        height: calc(100svh - 2rem - var(--navbar-height) * 3 - 100px);

        border: 1px solid yellow;
    }
}
`