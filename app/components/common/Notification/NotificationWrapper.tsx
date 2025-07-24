import Notification from './Notification'

type NotificationWrapperProps = {
    show: boolean
    success: string | null
    error: string | null
    onClose: () => void
}

export default function NotificationWrapper({
    show,
    success,
    error,
    onClose,
}: NotificationWrapperProps) {
    if (!show || (!success && !error)) return null

    return (
        <Notification variant={success ? 'success' : 'error'} onClose={onClose}>
            {success || error}
        </Notification>
    )
}
