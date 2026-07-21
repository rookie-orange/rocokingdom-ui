import { Image } from 'rocokingdom-ui'
import mapImage from '../../../../assets/roco-map-bg.png'

export function ImageExample() {
  return (
    <Image
      alt="洛克王国世界地图"
      className="aspect-video w-full max-w-2xl rounded-lg"
      height={720}
      src={mapImage}
      width={1280}
    />
  )
}
