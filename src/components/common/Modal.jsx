import Drawer from './Drawer'

/** Centered accessible modal dialog (fade + scale in). */
export default function Modal({ open, onClose, title, children, widthClass = 'max-w-2xl' }) {
  return (
    <Drawer open={open} onClose={onClose} title={title} side="center" widthClass={widthClass}>
      {children}
    </Drawer>
  )
}
