import React, {useEffect, useState} from 'react';
 import './footer.scss';

let audio = null;
let songCurrent = null;
let timeSongInterval = null;

export function Footer(props) {

    const [loading, setLoading] = useState(false);

    const [volumeControls, setVolumeControls] = useState(50)

    const [statusSong, setStatusSong] = useState(false)

    const [timeSong, setTimeSong] = useState('00:00 / 00:00')

    let setValueAudio = (level) => {
        if (audio === null) return;
        audio.volume = level;
    }

    useEffect(() => {
        console.log(props)
        if (props.data.current === null || songCurrent === props.data.current.link_mp3) return;
        resetAudio();
        songCurrent = props.data.current.link_mp3;
        audio = new Audio(props.data.current.link_mp3);
        playAudio();
        setTimeout(function (){
            setLoading(false);
        },1000)

    }, [props.data])

    let resetAudio = () => {
        if (audio === null) return;
        audio.pause();
        audio.load();
        setStatusSong(false);
        clearInterval(timeSongInterval);
    }

    let showTime = () => {
        if (audio === null) return;
        timeSongInterval = setInterval(function () {
            var min = Math.floor(audio.duration / 60);
            var sec = Math.floor(audio.duration % 60);
            var mins = Math.floor(audio.currentTime / 60);
            var secs = Math.floor(audio.currentTime % 60);
            if (secs < 10) {
                secs = '0' + String(secs);
            }

            if (mins < 10) {
                mins = '0' + String(mins);
            }

            if (sec < 10) {
                sec = '0' + String(sec);
            }

            if (min < 10) {
                min = '0' + String(min);
            }
            setTimeSong(mins + ':' + secs + ' / ' + min + ':' + sec);
            if(min===mins&& sec===secs) return autoNext();
        }, 1000);
    }

    let playAudio = () => {
        if (audio === null) return;
        setStatusSong(true);
        audio.play();
        audio.volume = volumeControls / 100;
        showTime();
    }

    let pauseAudio = () => {
        if (audio === null) return;
        setStatusSong(false);
        audio.pause();
        clearInterval(timeSongInterval);
    }


    let autoNext=()=>{
        clearInterval(timeSongInterval);
        setStatusSong(false);
        if(props.autoNext()) props.changeSong('next');
    }

    return (
        <footer className="player-footer flex-row flex-middle flex-space" style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: '60px',
            background: 'black',
            color: 'white',
        }}>
            <div className={loading == false ? 'd-none' : 'd-flex justify-content-center'} style={{
                position: 'absolute',
                zIndex: '2',
                width: '100%',
                padding: '1%',
                background:'#000000c2'
            }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <section className="player-controls flex-row flex-middle push-right">
                <button className="common-btn" disabled={props.data.pre === null ? true : false}
                        onClick={() =>{
                            setLoading(true);
                            props.changeSong('pre')
                        } }>
                    <i className="fa fa-step-backward fx fx-drop-in"></i>
                </button>

                <button className={statusSong === true ? "common-btn ml-2 mr-2" : "d-none"}
                        disabled={props.data.current === null ? true : false} onClick={() => pauseAudio()}>
                    <i className="fa fa-pause fx fx-drop-in"></i>
                </button>

                <button className={statusSong === false ? "common-btn ml-2 mr-2" : "d-none"}
                        disabled={props.data.current === null ? true : false} onClick={() => playAudio()}>
                    <i className="fa fa-play fx fx-drop-in"></i>
                </button>
                <button className="common-btn" disabled={props.data.next === null ? true : false}
                        onClick={() =>{
                            setLoading(true);
                            props.changeSong('next')
                        } }>
                    <i className="fa fa-step-forward fx fx-drop-in"></i>
                </button>
                <div className="form-slider push-left">
                    <i className="fa fa-volume-down"></i>
                    <input type="range" min="0" max="100" step="1" onChange={(e) => {
                        setVolumeControls(e.target.value)
                        setValueAudio(e.target.value / 100)
                    }} value={volumeControls} className=""/>
                    <i className="fa fa-volume-up"></i>
                </div>
                <div className="text-clip push-left"><span>{timeSong}</span></div>

                <div
                    className={props.data.current === null ? 'd-none' : 'ml-3 flex-row flex-middle flex-space showInfoFooter'}
                    style={
                        {
                            height: '60px',
                            padding: '0 15px',
                            background: 'white'
                        }
                    }>
                    <img src={props.data.current === null ? "" : props.data.current.thumbnail} style={{
                        height: '80%',
                        borderRadius: '10px'
                    }}></img>
                    <a href={props.data.current === null ? "#" : props.data.current.link}><span style={{
                        color: 'black',
                        marginLeft: '20px'
                    }}>{props.data.current === null ? "" : props.data.current.name}</span></a>
                </div>
            </section>
        </footer>
    )
}
