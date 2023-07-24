import { useEffect, useState } from "react";

export default function PaginationTab({ pageCount, onPageChange }) {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const onPageChangePressed = (value, type) => {
        if (type == 'arrow') {
            let num = selectedIndex + value;
            if (num >= 1 && num <= Math.ceil(pageCount)) {
                onPageChange(num);
                setSelectedIndex(num);
            }
        } else {
            onPageChange(value);
            setSelectedIndex(value);
        }
    }

    useEffect(() => {
        setSelectedIndex(1);
        onPageChange(1);
    }, [pageCount])

    return (
        pageCount > 0 ?
            <div className="text-center mt-4 flex justify-center">
                <button onClick={() => onPageChangePressed(-1, 'arrow')} className="border rounded-l-md p-2 bg-mainSubColor hover:bg-mainColor border-gray-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                </button>


                {pageCount > 1 ? Array.from(Array(Math.ceil(pageCount)), (e, i) => {
                    return (
                        <button onClick={() => onPageChangePressed(i + 1)} key={i} className={`border p-2 ${selectedIndex == i + 1 ? 'bg-mainColor' : 'bg-mainSubColor'}  hover:bg-mainColor border-gray-300 transition-colors`}>
                            <p className="w-6  h-6 text-center">{i + 1}</p>
                        </button>
                    )
                })
                    :
                    <button className="border p-2 bg-mainSubColor hover:bg-mainColor focus:bg-mainColor border-gray-300 transition-colors">
                        <p className="w-6  h-6 text-center">1</p>
                    </button>}

                <button onClick={() => onPageChangePressed(1, 'arrow')} className="border rounded-r-md p-2 bg-mainSubColor hover:bg-mainColor border-gray-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>


                </button>
            </div>
            : <></>
    )
}