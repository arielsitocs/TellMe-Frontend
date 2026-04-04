import notifications from "../data/notifications"

import Notification from "./ui/notification"

export default function Notifications() {
    return (
        <div className="rounded-lg w-full border border-borders bg-card-background mt-0 sm:mt-5 overflow-hidden">
            <div className="p-3">
                <h1 className="text-white text-lg font-semibold p-2">Notificaciones</h1>
            </div>
            <div className="bg-light-card-background px-4 py-2 border-b-1 border-t-1 border-borders">
                <p className="text-sm text-terciary-text">NUEVAS</p>
            </div>
            <div className="flex flex-col">
                {
                    notifications.map((n, index) => (
                        <Notification key={`${n.firstName}-${n.lastName}-${index}`} firstName={n.firstName} lastName={n.lastName} type={n.type} />
                    ))
                }
            </div>
        </div>
    )
}