import React, {Component} from "react";
import Header from "../components/Header";
import './footer.scss';
import getIdByLink from "../../utils/getIdByLink";
import {MusicService} from "../../services/music";
import ReactHtmlParser from 'react-html-parser';
import FacebookLogin from 'react-facebook-login';

let audio = null;

let lyricInit = {
    by: "",
    data: ""
};

class SongDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            playAudio: false,
            lyric: lyricInit,
            song: {},
        }
        this.canvas = React.createRef();
    }


    componentDidMount = async () => {
        let key = getIdByLink();
        let getLyric = await MusicService.getLyric(key);
        let resultFind = await MusicService.searchLink(key);

        if (getLyric.data.length > 0) {
            lyricInit.by = getLyric.data[0]['username']
            lyricInit.data = getLyric.data[0]['content']
        }
        this.setState({
            loading: false,
            lyric: lyricInit,
            song: resultFind.data.song
        })
        audio = new Audio(resultFind.data.song.link_mp3);
        audio.load();
    }

    responseFacebook(response) {
        console.log('response', response);
    }


    render() {
        return (
            <div id="app">
                <Header/>
                <div className="container bg-white p-3" style={{marginTop: "55px"}}>
                    <div className="info-song">
                        <FacebookLogin
                            appId="1539600359762287"
                            autoLoad={true}
                            fields="name,picture"
                            cookie={true}
                            xfbml={true}
                            version="9.0"
                            onclick={()=>console.log('click')}
                            callback={() => this.responseFacebook}
                        />
                    </div>
                    <div>
                        <button className={this.state.playAudio === false ? "btn btn-primary play" : "d-none"}
                                onClick={() => {
                                    audio.play();
                                    this.setState({playAudio: true})
                                }}>
                            <i className="fa fa-play-circle" aria-hidden="true"></i>
                            <span> Phát nhạc</span>
                        </button>

                        <button className={this.state.playAudio === true ? "btn btn-outline-danger play" : "d-none"}
                                onClick={() => {
                                    audio.pause();
                                    this.setState({playAudio: false})
                                }}>
                            <i className="fa fa-pause-circle" aria-hidden="true"></i>
                            <span> Tạm dừng</span>
                        </button>
                    </div>
                    <div className="mt-3 z-video-info">
                        Lời bài hát: <strong>{this.state.song.name}</strong>
                        <div className="text-black " style={{
                            fontSize: "1em"
                        }}>
                            <span className="text-muted">Cung cấp bởi: {this.state.lyric.by}</span>
                            <div><br/>{ReactHtmlParser(this.state.lyric.data)}</div>
                        </div>

                    </div>
                </div>
                <div className={this.state.loading === true ? "loading style-2" : "d-none"}>
                    <div className="loading-wheel"></div>
                </div>
            </div>
        )
    }
}

export default SongDetail;
