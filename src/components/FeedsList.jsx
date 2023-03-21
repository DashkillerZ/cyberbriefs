import styled from "styled-components";
import logo from "../static/logo.png";
import logoName from "../static/logoName.png";
import Feed from "./Feed";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {GlobalContext} from "../contexts/GlobalContext";

const FeedsList = ({feeds,articles}) => {
    const {feedsLoading,responsiveMenu} = useContext(GlobalContext);

    const{feedname}=useParams()
    let [menuBtn,setMenuBtn] = useState(true);
    useEffect(()=>{
        window.addEventListener("load",()=>{
            window.addEventListener("resize",()=>{
                
                if(window.innerWidth<1200){
                    setMenuBtn(false);
                }
                else{
                    if(window.innerWidth<501){
                        setMenuBtn(true);
                    }
                    setMenuBtn(true);
                }
            })
        })
    },[])
    let articlesLength ;
    const feed = feeds.find(feed => feed.feedName === feedname);
    if(feedname==="allarticles" || !feedname){
        articlesLength = articles.length;
    }
    else{
        articlesLength = articles.filter((article) => article.feedName === feed?.feedName).length;
    }
    return (
		<motion.div className="article-list">
        	<StyledFeedsList style={{width:menuBtn?260:60,height:responsiveMenu?" var(--navbar-height)":"unset"}} >
				<div className="nav">
					<div className="logo">
						<img src={logo} alt="" />
						<img src={logoName} alt="" className="logoname" />
                        <div className="version">Alpha version 0.1</div>
					</div>
					<div className="source-menu" >
						<div className="menu-btn" onClick={()=>{setMenuBtn(!menuBtn)}} >
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div className="all-articles" >
                            <Link to="/allarticles" style={feedname==="allarticles" || !feedname? {background:"var(--secondary-lightest)"}:{}}>All&nbsp;Articles</Link>
                        </div>
						<div className="numbers">{articlesLength}</div>
					</div>
				</div>
				<div className="source-list"  style={{display:responsiveMenu?"flex":"unset"}}>
                    <Link to="/allarticles" style={feedname==="allarticles" || !feedname? {background:"var(--secondary-lightest)"}:{}} className="all-articles-responsive">
                        <span className="material-symbols-outlined">emergency</span>
                    </Link>
					{
                    feedsLoading
                    ?
                    <div className="loading">
                        <img src={logo} alt="" />
                    </div>
                    :
                    feeds.map((data)=>(
						<Feed data={data} articles={articles} isActive={data.feedName===feedname?true:false} key={data.id} />
                    ))
                    }
				</div>
        	</StyledFeedsList>
		</motion.div>
    );
}
 
export default FeedsList;

const StyledFeedsList = styled.div`


overflow: hidden;
max-width: 360px;
width: 100%;
--transition-time:300ms ;
transition: var(--transition-time) cubic-bezier(0.075, 0.82, 0.165, 1);
background: var(--white);



.version{
    z-index: 1;
    bottom: 10px;
    left: 90px;
    font-size: 0.8rem;
    font-style: italic;
    margin: 0;
    padding: 0;
    margin: 0 auto;
    position: absolute;
    width: max-content;
    color: #ff0000;

}
.nav .logo{
    display: flex;
    align-items: center;
    padding:10px;
    height: 50px;
    text-transform: uppercase;
    position: relative;
}
.nav .logo img:first-child{
    width: 40px;
    margin-right: 0.7rem;
}
.nav .logo .logoname{
    height: 15px;
}
.source-menu{
    display: flex;
    align-items: center;
    height: 40px;
    font-weight: 500;
}
.source-menu .menu-btn{
    width: 25px;
	min-width: 30px;
    height: 25px;
    margin:0 15px 0 14px;
    justify-content: center;
    border-radius: 5px;
    padding-top: 3px;
}
.source-menu .menu-btn:hover{
    background-color: var(--secondary-lightest);
}
.source-menu .menu-btn>div{
    height:3px;
    border-radius: 5px;
    width: 20px;
    background:var(--secondary-light) ;
    margin: 3px 5px;
}
.source-menu .all-articles a{
    text-decoration: none;
    color: var(--black);
    padding:6px 8px;
    border-radius: 5px;
}
.source-menu .numbers{
    margin: 0 15px 0  auto;
    background: #ffecec;
    padding: 0 8px;
    border-radius: 5px;
}

.source-list{
    overflow-y: auto;
    height:calc(100vh - 110px);
    position: relative;
}
.source-list::-webkit-scrollbar{
    display: none;
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
.all-articles-responsive{
    display: none;
}
@keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
}
@media screen and (max-width:500px){
    position: absolute; 
    top: calc( 2 * var(--navbar-height) );
    min-width: 100%;
    height: var(--navbar-height);
    z-index: 1;
    .nav{
        display: none;
    }
    .source-list{
        /* display: flex; */
    }
    .all-articles-responsive{
        padding: 0 16px;
        display: flex;
        align-items: center;
        height: var(--navbar-height);
        color: black;
        text-decoration: none;
    }
    .all-articles-responsive:hover{
        background: var(--secondary-lightest);
    }
}

`