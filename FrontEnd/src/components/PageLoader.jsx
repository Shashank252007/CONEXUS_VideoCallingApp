import { LoaderIcon } from "lucide-react";

export default function PageLoader() {
    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-800'>
            <LoaderIcon className='text-white animate-spin size-10 text-primary' />
        </div>
    );
}
