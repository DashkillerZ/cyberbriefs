import styled from "styled-components";
import logo from "../static/logo.png";
import logoName from "../static/logoName.png";
import Feed from "./Feed";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
const FeedsList = ({feeds,articles}) => {
    const{feedname}=useParams()
    let [menuBtn,setMenuBtn] = useState(true);
  
    return (
		<motion.div className="article-list" >
        	<StyledFeedsList style={menuBtn?{width:"260px"}:{width:"60px"}}>
				<div className="nav">
					<div className="logo">
						<img src={logo} alt="" />
						<img src={logoName} alt="" />
					</div>
					<div className="source-menu">
						<div className="menu-btn" onClick={()=>{setMenuBtn(!menuBtn)}} >
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div>All&nbsp;Articles</div>
						<div className="numbers">{"22"}</div>
					</div>
				</div>
				<div className="source-list">
					{feeds.map((data)=>(
						<Feed data={data} articles={articles} isActive={data.feedName===feedname?true:false} key={data.id} />
					))}
				</div>
        	</StyledFeedsList>
		</motion.div>
    );
}
 
export default FeedsList;

const StyledFeedsList = styled.div`


overflow: hidden;
max-width: 360px;
--transition-time:300ms ;
transition: var(--transition-time);
.nav .logo{
    display: flex;
    align-items: center;
    padding:10px;
    height: 50px;
    text-transform: uppercase;
}
.nav .logo img:first-child{
    width: 40px;
    margin-right: 0.7rem;
}
.nav .logo img:last-child{
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
.source-menu .numbers{
    margin: 0 15px 0  auto;
    background: #ffecec;
    padding: 0 8px;
    border-radius: 5px;
}

.source-list{
    overflow-y: auto;
    height:calc(100vh - 110px);
}
.source-list::-webkit-scrollbar{
    display: none;
}
`