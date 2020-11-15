export default function getIdByLink(){
    let fullUrl=window.location.href;
    return fullUrl.slice(fullUrl.lastIndexOf('/')+1,fullUrl.indexOf('.html'))
}
