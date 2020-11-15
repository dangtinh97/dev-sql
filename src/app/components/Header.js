import React, {useRef, useState} from "react";
import {MusicService} from "../../services/music";
import FacebookLogin from "react-facebook-login";

export default function Header() {
    let keySearch=null;

    let flagSearch=false;
    let keyByInput=useRef('');
    const [showLoading,setShowLoading] = useState(false);
    const [showList,setShowList]=useState(false);
    const [list,setList] = useState([]);
    const [isLogin,setLogin]=useState(false);
    const [facebook,setFacebook] =useState(null);
    const search=async (value,event)=>{
        let time=0;

        if(event.keyCode!==32 || value.trim()===keySearch && !flagSearch) return ;
        if(flagSearch) time=1.5;
        keySearch=value.trim();

        setTimeout(async function (){
            flagSearch=true;
            await searchApi(value);
            flagSearch=false;
        },time*1000)
    }

    let responseFacebook=async (response)=>{
        setLogin(true);
        setFacebook(response);
        console.log(response);
        console.log(response.name);
    }

    let clickSearch=()=>{
        console.log(keyByInput.current.value);
        searchApi(keyByInput.current.value);
    }

    let searchApi = async (key)=>{
        if(key==="") return;
        if(!showList) setShowList(true);
        setShowLoading(true);
        let resultSearch= await MusicService.search(key);
        setShowLoading(false);
        if(!resultSearch.success) return;
        setList(resultSearch.data.result_search);
    }

    return (
        <header className="player-header flex-row flex-middle flex-space shadow mb-5 bg-white rounded " >
            <nav className=" player-controls flex-row flex-middle push-right" style={{ width:"100%"}}>
                <a href="/">
                <img src="/assets/logo.png" width="50px" className="img-round mr-2 logo_header"/>
                </a>
                <section className="bg-white p-1 pl-3 border _section_search" >
                    <input placeholder="Tìm kiếm..." className="border-right " type="search" ref={keyByInput} onKeyUp={(e)=>search(e.target.value,e)} />
                    <button className="p-1 pl-2" onClick={(e)=>clickSearch()}><i
                    className="fa fa-search" aria-hidden="true"></i></button>
                </section>
                <form className="form-inline">
                    <FacebookLogin
                        appId="1539600359762287"
                        autoLoad={true}
                        fields="name,picture,id"
                        cookie={true}
                        xfbml={true}
                        version="9.0"
                        size="small"
                        textButton="Đăng nhập"
                        disableMobileRedirect={true}
                        callback={responseFacebook}
                        cssClass={isLogin===false ? "kep-login-facebook":"d-none"}
                    />
                </form>
                <div className= {facebook!==null ? "kep-login-facebook":"d-none"}> Xin chào: {facebook!==null? facebook.name : ""}</div>
            </nav>

            <div className={showList===true ?"container shadow mb-5 bg-white rounded border border-success": "d-none"} style={{
                position:"fixed",
                top:"50px",
                background:"white",
                padding:"5px"
            }}>
                <div className="d-flex p-2 bd-highlight ">
                    <div className="d-flex flex-grow-1">Kết quả tìm kiếm:{keySearch} <div className={showLoading===true  ? "ml-3 d-flex justify-content-center":"d-none"}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div></div>
                    <div className="d-flex justify-content-end" style={{float:"right", paddingRight:"10px"}} onClick={()=>setShowList(false)}>
                        <i className="fa fa-times" aria-hidden="true" style={{cursor:"pointer"}}></i>
                    </div>
                </div>
                <div className="list-song-search border-top pl-2">
                    <div className="gird-list">
                        {list.length===0? 'Không tìm thấy kết quả nào . . .' :list.map(function (song){
                            let artists=JSON.parse(song.artists) ?? "";
                            return (
                            <div className="p-2 ">
                            <i className="fa fa-music" aria-hidden="true"></i>
                            <a href={song.link}><span className="ml-2">{song.name}</span></a> -
                            <span className="ml-2">{artists.name ?? ""}</span>
                            </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </header>
    )
}
