import React, {Component} from 'react';
import {Footer} from "../components/footer/FooterPlay";
import {MusicService} from "../../services/music";
import Header from "../components/Header";


let list_song = [];

/**
 * let src = document.getElementById('audio').src
 * let link = window.location.href
 * let element = document.getElementsByClassName('sub-container clearfix')[0]
 * let name = element.getElementsByTagName('img')[0].alt
 * let img_thum = element.getElementsByTagName('img')[0].src
 * let html = '{name:\''+name+'\',link:\''+link+'\',link_mp3:\''+src+'\',thumbnail:\''+img_thum+'\',cover:\''+img_thum+'\'}'
 * promp('',html)
 *
 *
 */
let position = 0;
let idPlay=null;
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                pre: null,
                current: null,
                next: null
            },
            button: {
                data: 0
            },
            list_song: [],
        }

    }

    componentDidMount() {
        let data = MusicService.getSong().then((data) => {
            console.log(data);
            if (!data.success) return;
            this.setState({
                list_song: data.data.list
            }, () => {
                console.log(this.state);
            });
        });

    }


    playSong = async (key) => {
        list_song = this.state.list_song;
        let index = list_song.findIndex(x => x.id_text === key);
        position=index;
        let pre = null;
        let current = null;
        let next = null;
        if (index > 0) pre = list_song[index - 1];
         current = list_song[index];
        if (index <= list_song.length - 1) next = list_song[index + 1];
        if (typeof list_song[index].link_mp3 === "undefined") {
            let search = await MusicService.searchLink(key);
            list_song[index]['link_mp3'] = search.data.link_mp3;
            current.link_mp3 = search.data.song.link_mp3;
        }
        list_song[index]['count_listen'] = list_song[index]['count_listen']+1;
        idPlay=current.id_text;
        this.setState({
            list_song:list_song,
            data: {
                pre: pre,
                current: current,
                next: next
            }
        })
    };


    changeSong = (type) => {
        if(type==="pre") return this.playSong(list_song[position - 1]['id_text'])
        if(type==="next") return this.playSong(list_song[position + 1]['id_text'])
    }

    autoNext = () => {
        if (position === list_song.length - 1) return false;
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("change");
    }

    render() {
        return (
            <div id="app">
                <Header/>
                <section className="z-new-songs fn-adtima-zone" style={{marginTop:"53px"}}>
                    <div className="container shadow p-3 mb-5 bg-white rounded">
                        <div className="z-float-header mb-4">Bài hát mới</div>
                        <div className="row ">
                            {this.state.list_song.length === 0 ? '' :
                                this.state.list_song.map((song) => {
                                    return (
                                        <div className={idPlay===song.id_text ? "card col-md-4 media bg-info" : "card col-md-4 media "} style={{
                                            border: '0',
                                            cursor: "pointer"
                                        }} data-key={song.id_text} onClick={(event) => {
                                            this.playSong(song.id_text);
                                        }}>

                                            <div className="media ">
                                                <img src={song.thumbnail} className="align-self-center mr-3" alt="..." style={{
                                                    maxWidth: '60px',
                                                    borderRadius: '10px'
                                                           }}/>
                                                    <div className="media-body">
                                                        <a href={song.link}><h6 className="mt-0 text-black-50">{song.name}</h6></a>

                                                        <p className="mb-0"><i className="fa fa-headphones" aria-hidden="true"></i> {song.count_listen + 1}</p>
                                                    </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>
                </section>
                <Footer data={this.state.data} changeSong={(e) => this.changeSong(e)} autoNext={() => this.autoNext()}/>
            </div>
        )
    }
}

export default Home
