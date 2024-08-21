export const ArrowUpIcon = ({
    fill = "currentColor",
    filled,
    size,
    height,
    width,
}: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-add"
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : 'none'}
            strokeWidth="1.5"
            stroke="#2c3e50"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 8l-4 4" />
            <path d="M12 8v8" />
            <path d="M16 12l-4 -4" />
        </svg>
    );
};

export default ArrowUpIcon
