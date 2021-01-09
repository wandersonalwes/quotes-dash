import { FC, HTMLAttributes } from 'react'

type DropdrownUserOverlayProps = HTMLAttributes<HTMLDivElement>

const DropdrownUserOverlay: FC<DropdrownUserOverlayProps> = ({ ...rest }) => {
  return (
    <div {...rest} className="fixed inset-0 h-full w-full z-10"></div>
  )
}

export default DropdrownUserOverlay
