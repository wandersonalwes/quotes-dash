import { FC, ImgHTMLAttributes } from 'react'

type AvatarProps = ImgHTMLAttributes<HTMLImageElement>

const Avatar: FC<AvatarProps> = ({ ...rest }) => {
  return (
    <img {...rest} className="h-full w-full object-cover" />
  )
}

export default Avatar
