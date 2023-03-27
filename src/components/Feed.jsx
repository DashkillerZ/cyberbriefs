import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../static/logo.png";
import { useContext, useEffect, useRef, useState } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";
import { motion } from "framer-motion";
const Feed = ({data ,articles,isActive}) => {
    let {mobile,responsiveMenu} = useContext(GlobalContext);
    let articlelink = articles?.find(article=>data?.feedName===article?.feedName);
    const [isValid, setIsValid] = useState(true);
    let feedRef = useRef();
    // useEffect(()=>{
    //     if(isActive){
    //         feedRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // },[isActive])
    return (
        <motion.div
        >
        <StyledFeed>
            <Link 
                ref={feedRef}
                to={`/${data?.feedName}/${!mobile?(encodeURIComponent(articlelink?.title)):""}`}  
                className={isActive?"list-el active":"list-el"} key={data?.id} onClick={() => {}}
            >
                <div className="icon">
                    {
                        isValid
                        ?
                        <img src={data?.feedIcon} onError={()=>setIsValid(false)} alt="" />
                        :
                        <img src={logo}  alt="" />
                    }
				</div>
				<div className={!responsiveMenu?"source-title":"gone"} title={data?.feedName}>{data?.feedName}</div>
				<span className={!responsiveMenu?"material-symbols-outlined":"gone"} >expand_more</span>
				<div className={!responsiveMenu?"border-right":"gone"}></div>
			</Link>
        </StyledFeed>
        </motion.div>
    ); 
}
export default Feed;

const StyledFeed = styled.div`
--transition-time:300ms ;
--max-width: 300px;
.list-el{
    display: flex;
    align-items: center;
    height: 50px;
    text-decoration: none;
    color:unset ;
    transition:  var(--transition-time);
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    max-width: var(--max-width);
}
.list-el.active .border-right{
    transform: translate(0);
}
.list-el.active {
    background: var(--secondary-lightest);
}
.list-el.active .icon{
    filter: saturate(100%);
    border: 2px dashed var(--secondary-light);


}
.list-el.active .material-symbols-outlined{
    transform: rotate(-90deg);
}

.list-el:hover {
    background: var(--secondary-lightest);
}
.list-el:first-child{
    border-top: 2px solid var(--secondary-lightest);

}
.list-el .source-title{
    font-size: 0.8rem;
    margin: 0 4px;
    white-space: nowrap;
    width:calc( 100% - 20px);
    text-overflow: ellipsis;
    overflow: hidden;
}

.list-el .icon{
    width: 1.5rem ;
    height: 1.5rem;
    min-width: 1.5rem;
    border-radius: 2rem;
    background: var(--white);
    padding: 5px;
    margin: 4px 10px 4px 10px;
    border: 2px solid var(--secondary-lightest);
    filter: saturate(10%);
}
.list-el img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
}
.list-el .material-symbols-outlined{
    margin-right: 15px;
    color: var(--secondary-light);
    transition: var(--transition-time);
}
.list-el .border-right{
    height: 100%;
    width: 5px;
    background: var(--pallete-4);
    transform: translateX(4px);
    transition: var(--transition-time);
}
@media screen and (max-width:500px){
    .list-el{
        max-width: 100vw;
        margin: 0;
        height: var(--navbar-height);
    }
    .list-el .icon{
        /* margin-left: 5px; */
    }
    .gone{
        display: none;
    }
    /* .source-title{
        display: none;
    }
    .material-symbols-outlined{
        display: none;
    }
    .border-right{
        display: none;
    } */
}
`