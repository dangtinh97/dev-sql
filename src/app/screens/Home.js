import React, {Component} from 'react';
import {Footer} from "../components/footer/FooterPlay";
import {MusicService} from "../../services/music";


let list_song = [
    {
        name: 'Thiên Đàng',
        link: 'https://m.zingmp3.vn/bai-hat/Thien-Dang-Wowy-JoliPoli/ZWE7IIZB.html',
        link_mp3: 'https://mp3-s1-zmp3.zadn.vn/72816f4c2e0bc7559e1a/921726093730018038?authen=exp=1605063445~acl=/72816f4c2e0bc7559e1a/*~hmac=18eed50e4412b04a2fa7328d6c5f7845',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/6/7/a/c/67ac7d2313b6291e48083a2b53bc9b90.jpg',
        cover: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/6/7/a/c/67ac7d2313b6291e48083a2b53bc9b90.jpg'
    },
    {
        name: 'Hoa Hải Đường',
        link: 'https://m.zingmp3.vn/bai-hat/Hoa-Hai-Duong-Jack/ZWDAAU8Z.html',
        link_mp3: 'https://mp3-s1-zmp3.zadn.vn/5ea0ffce4b89a2d7fb98/5383891903338973067?authen=exp=1605063489~acl=/5ea0ffce4b89a2d7fb98/*~hmac=dda7c1a0451196b5078f358a717bfd04',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/a/8/6/2/a8626a5671f5a01250a074c4c8140cae.jpg',
        cover: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/a/8/6/2/a8626a5671f5a01250a074c4c8140cae.jpg'
    },
    {
        name: 'Họa Mây (Cố Giang Tình 2)',
        link: 'https://m.zingmp3.vn/bai-hat/Hoa-May-Co-Giang-Tinh-2-X2X/ZWD0B66D.html',
        link_mp3: 'https://mp3-s1-zmp3.zadn.vn/71a0d8e287a56efb37b4/7894919464092956956?authen=exp=1605063630~acl=/71a0d8e287a56efb37b4/*~hmac=41d83a12748378eaf81defc381ac53ff',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/c/c/7/0/cc709844d6aa6d3bf943bb91cf7ba662.jpg',
        cover: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/c/c/7/0/cc709844d6aa6d3bf943bb91cf7ba662.jpg'
    },
    {
        name: 'Bỏ Lỡ Một Người',
        link: 'https://m.zingmp3.vn/bai-hat/Bo-Lo-Mot-Nguoi-Le-Bao-Binh/ZWCZDFCA.html',
        link_mp3: 'https://mp3-s1-zmp3.zadn.vn/897490baf5fd1ca345ec/987350429637282?authen=exp=1605063542~acl=/897490baf5fd1ca345ec/*~hmac=01c865fa486bf32fccf3d20dd628cdb4',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/b/0/f/2/b0f2617eac4b87fd0affe726bfd81a0a.jpg',
        cover: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/b/0/f/2/b0f2617eac4b87fd0affe726bfd81a0a.jpg'
    },
    {
        name: 'Chắc Vì Mình Chưa Tốt',
        link: 'https://m.zingmp3.vn/bai-hat/Chac-Vi-Minh-Chua-Tot-Thanh-Hung/ZWCWE8BZ.html',
        link_mp3: 'https://mp3-s1-zmp3.zadn.vn/dd25067d6a3a8364da2b/19587538280384586?authen=exp=1605063802~acl=/dd25067d6a3a8364da2b/*~hmac=83e0237967e58c3c9d3b24a76e062933',
        thumbnail: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/f/e/e/b/feebaec84a211ff8c46a2d803f7a646c.jpg',
        cover: 'https://photo-resize-zmp3.zadn.vn/w256_r1x1_jpeg/cover/f/e/e/b/feebaec84a211ff8c46a2d803f7a646c.jpg'
    },
];

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
            current.link_mp3 = search.data.link_mp3;
        }
        list_song[index]['count_listen'] = list_song[index]['count_listen']+1;
        idPlay=current.id_text;
        console.log(current,idPlay);
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
                <section className="z-new-songs fn-adtima-zone">
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
                                                        <h6 className="mt-0 text-black-50">{song.name}</h6>

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
