import Modal from '../Modal'

/** Small confirmation dialog built on the shared Modal. */
export default function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', danger = true }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={danger ? 'btn bg-danger text-white hover:bg-red-700 active:scale-[0.98]' : 'btn-primary'}
            onClick={() => {
              onConfirm?.()
              onClose?.()
            }}
          >
            {confirmLabel}
          </button>
        </div>
      }
    />
  )
}
