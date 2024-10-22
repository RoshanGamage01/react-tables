import { useState } from "react";

export default function ErrorChip(props: { message: string, show: boolean, close: () => void }) {
    const [show, setShow] = useState<boolean>(props.show);

    return <>
        {show && <div
            className="absolute w-fit  overflow-hidden bg-red-400 gap-4 z-999 rounded-md mt-0.5 flex items-start justify-between p-2"
        >
            <div className="text-ellipsis break-words whitespace-normal text-white">
                {
                    props.message
                } 
            </div>

            <div
                className="cursor-pointer"
                onClick={() => {
                    props.close();

                    setShow(false)
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 text-white h-5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </div>
        </div>}
    </>
}