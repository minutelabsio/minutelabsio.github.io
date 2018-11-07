import Promise from 'bluebird'
export default function( url ){
  return new Promise((resolve, reject) => {
    let img = new Image( url )
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}
