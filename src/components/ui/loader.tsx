
export default function Loader({ state, setState }: any) {
    if (!state) return null
    return (
        <div className="flex justify-center items-center">
            <div className="w-10 h-10 rounded-full bg-transparent border-5 border-t-dark-purple border-main-purple animate-spin"></div>
        </div>
    )
}