import React, {useEffect, useRef, useState} from "react";
import {MusicService} from "../../services/music";
import FacebookLogin from "react-facebook-login";
import {NavDropdown,Nav,Form, FormControl, InputGroup,Button,Navbar} from "react-bootstrap";


export default function Header() {
    let keySearch=null;
    //const size = useWindowSize();
    let flagSearch=false;
    let keyByInput=useRef('');
    const [showLoading,setShowLoading] = useState(false);
    const [showList,setShowList]=useState(false);
    const [styleList,setStyleList]=useState(
        {
            position:"fixed",
            top:"56px",
            background:"white",
            padding:"5px"
        }
    )
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


    useEffect(() => {
        if( styleList.top!==document.getElementsByTagName('nav')[0].offsetHeight+"px"){
            setStyleList({
                position:"fixed",
                top:document.getElementsByTagName('nav')[0].offsetHeight+"px",
                background:"white",
                padding:"5px"
            })
        }
        console.log(document.getElementsByTagName('nav')[0].offsetHeight);

    }, [showList,showLoading]); // Empty array ensures that effect is only run on mount

    let responseFacebook=async (response)=>{
        setLogin(true);
        if( typeof response==="undefined"||typeof response.name==="undefined") return;
        setFacebook(response);
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
        <>
            <Navbar style={{
                top:"0",
                position:"fixed",
                zIndex:"1024",
                width:"100%",
            }} collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img src="/assets/logo.png" width="50px" className="img-round mr-2 logo_header"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Form inline>
                            <FormControl type="text" placeholder="Tìm bài hát..." className="mr-sm-2" ref={keyByInput} onKeyUp={(e)=>search(e.target.value,e)} />
                            <Button variant="outline-primary" onClick={(e)=>clickSearch()}><i className="fa fa-search" aria-hidden="true"></i></Button>
                        </Form>
                    </Nav>
                    <Nav>
                        {/*<Nav>*/}

                        {/*        <FacebookLogin*/}
                        {/*            appId="1539600359762287"*/}
                        {/*            autoLoad={true}*/}
                        {/*            fields="name,picture,id"*/}
                        {/*            cookie={true}*/}
                        {/*            xfbml={true}*/}
                        {/*            version="9.0"*/}
                        {/*            size="small"*/}
                        {/*            textButton="Đăng nhập"*/}
                        {/*            onClick={()=>console.log()}*/}
                        {/*            callback={()=>responseFacebook()}*/}
                        {/*            cssClass={isLogin===false ? "kep-login-facebook":"d-none"}/>*/}
                        {/*</Nav>*/}
                        {/*<Nav >*/}
                        {/*    <div className= {facebook!==null ? "text-white":"d-none"}> Xin chào: {facebook!==null? facebook.name : ""}</div>*/}
                        {/*</Nav>*/}
                        {/*<Nav.Link href="#deets">More deets</Nav.Link>*/}
                        {/*<Nav.Link eventKey={2} href="#memes">*/}
                        {/*    Dank memes*/}
                        {/*</Nav.Link>*/}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        {/*<div className="player-header flex-row flex-middle flex-space shadow mb-5 bg-white rounded " >*/}
        <div className="container flex-middle flex-space shadow mb-5 bg-white rounded " style={{
            position:"fixed",
            zIndex:"1024",
        }} >
            <div className={showList===true ?"container shadow mb-5 bg-white rounded border border-success": "d-none"} style={styleList}>
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
        </div>
            </>
    )
}
