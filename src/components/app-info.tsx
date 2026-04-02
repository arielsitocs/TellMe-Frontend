
export default function AppInfo() {
    return (
        <div className="hidden xl:flex flex-col justify-center gap-3 items-center bg-card-background border-1 border-borders rounded-lg p-4">
            <div className="flex flex-col w-full justify-center items-center p-3 bg-dark-purple rounded-lg">
                <h1 className="font-medium text-white text-xl">12</h1>
                <p className="text-sm text-secondary-text">personas publicaron hoy</p>
            </div>
            <div className="flex flex-col w-full 2xl:flex-row gap-3 ">
                <div className="flex flex-col flex-1 justify-center items-center px-4 py-2 rounded-lg bg-light-card-background">
                    <h1 className="font-medium text-white">48</h1>
                    <p className="text-sm text-terciary-text">posts esta semana</p>
                </div>
                <div className="flex flex-col flex-1 justify-center items-center px-4 py-2 rounded-lg bg-light-card-background">
                    <h1 className="font-medium text-white">5</h1>
                    <p className="text-sm text-terciary-text">nuevos usuarios hoy</p>
                </div>
            </div>
        </div>
    )
}