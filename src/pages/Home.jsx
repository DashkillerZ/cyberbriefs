import styled from "styled-components";
import {Routes, Route } from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";
import logo from "../static/logo.png";
import logoName from "../static/logoName.png";
import ArticleBody from "../components/ArticleBody";
import ArticlesList from "../components/ArticlesList";
import FeedsList from "../components/FeedsList";
import Navbar from "../components/Navbar";
import {GlobalContext} from "../contexts/GlobalContext";


const Home = () => {


    const [feeds,setFeeds] = useState([]);
    const [articles, setArticles] = useState([]); 
    const [feedsLoading,setFeedsLoading] = useState(true);
    const [articlesLoading,setArticlesLoading] = useState(true);
    const [articleLoading,setArticleLoading] = useState(true);
    const [searchQuery,setSearchQuery] = useState("");
    let [mobile,setMobile] = useState(true);
    let [responsiveMenu,setResponsiveMenu] = useState(false);

    
    let [tickSpeed,setTickSpeed] = useState(false);
    useEffect(() => {
        setInterval(()=>{
            setTickSpeed(!tickSpeed);
        },10000);
	}, []);

    useEffect(()=>{
        function resize(){
            if(window.innerWidth>=500){
                setMobile(false)
                setResponsiveMenu(false)
            }
            if(window.innerWidth<500){
                setMobile(true)
                setResponsiveMenu(true)
            }
        }
        window.addEventListener("resize",resize);
        resize();
    },[])

    function handleSearch(e){
        setSearchQuery(e)
    }
	useEffect(() => {
		axios.get("http://backend.cyberbriefs.internsprogram.com/api/nameicon/")
			.then((response) => {
				setFeeds(response.data);
                setFeedsLoading(false)
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
    useEffect(() => {
		axios.get("http://backend.cyberbriefs.internsprogram.com/api/database/")
			.then((response) => {
				setArticles(response.data);
                setArticlesLoading(false)
                setArticleLoading(false)
			})
			.catch((error) => {
				console.error(error);
			});
	}, [tickSpeed]); 
    
    function separateDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const amPm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        return [year, months[month], day, hours, minutes, amPm];
      }
    return (

        <StyledHome>
        <GlobalContext.Provider 
            value={{responsiveMenu,searchQuery,articlesLoading,feedsLoading,articleLoading,mobile,setMobile,separateDate,setSearchQuery,setResponsiveMenu,handleSearch}} 
        >
            <Routes>
                <Route path={`/`} element={<FeedsList feeds={feeds} articles={articles} />} />
                <Route path={`/:feedname`} element={<FeedsList feeds={feeds} articles={articles} />} />
                <Route path={`/:feedname/:articlename`} element={<FeedsList feeds={feeds} articles={articles} />} />
            </Routes>
            <div className="home-grid">
                <div className="responsive-nav">
                    <div className="logo">
						<img src={logo} alt="" />
						<img src={logoName} alt="" className="logoname" />
                        {/* <div className="version">Alpha version 0.1</div> */}
					</div>
                    <div className="menu-btn" onClick={()=>{setResponsiveMenu(!responsiveMenu)}}>
							<div></div>
							<div></div>
							<div></div>
					</div>
                </div>
                <Navbar articles={articles} />
                <div className="home-main" style={{width:`${window.innerHeight}`}}>
                    <Routes>
                        <Route path={`/`} element={<ArticlesList articles={articles} feeds={feeds} />} />
                        <Route path={`/:feedname`} element={<ArticlesList articles={articles} feeds={feeds} />} />
                        {!mobile && <Route path={`/:feedname/:articlename`} element={<ArticlesList articles={articles} feeds={feeds} />} /> }
                    </Routes>

                    <Routes>
                        <Route path={`/`} element={<ArticleBody feeds = {feeds} articles ={articles}/>} />
                        <Route path={`/:feedname`} element={<ArticleBody  articles={articles} feeds={feeds} />} />
                        <Route path={`/:feedname/:articlename`} element={<ArticleBody articles={articles} feeds={feeds} />} />
                    </Routes>
                </div>
            </div>
        </GlobalContext.Provider>
        </StyledHome>
    );
}
 
export default Home;

const StyledHome = styled.div`
&{
    display: flex;
    width: 100%;
    /* overflow: hidden; */
}   
.home-grid{
    width: 100%;
    /* background: var(--pallete-1); */
}
.home-main{
    background-image: linear-gradient(130deg , var(--pallete-2),#ecf4f8);
    display: flex;
    width: 100%;
}
.responsive-nav{
    display: none;
    height: var(--navbar-height);
    align-items: center;
    justify-content: space-between;
}
.logo{
    display: flex;
    align-items: center;
    padding:10px;
    height: 50px;
    text-transform: uppercase;
    position: relative;
}
.logo img:first-child{
    width: 40px;
    margin-right: 0.7rem;
}
.logo .logoname{
    width: 150px;
}
.menu-btn{
    width: 25px;
	min-width: 30px;
    height: 25px;
    margin:0 15px 0 14px;
    justify-content: center;
    border-radius: 5px;
    padding-top: 3px;
}
.menu-btn:hover{
    background-color: var(--secondary-lightest);
}
.menu-btn>div{
    height:3px;
    border-radius: 5px;
    width: 20px;
    background:var(--secondary-light) ;
    margin: 3px 5px;
}

@media screen and (max-width:500px){
    .home-main{
        /* width: 100vw; */
    }
    .responsive-nav{
        display: flex;
        width: 100vw;
    }
}
`