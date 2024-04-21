import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";

interface LoadingProps {
    isLoading: boolean;
}

const Loading: FC<LoadingProps> = ({ isLoading }) => {
    const spinValue = useRef(0);

    useEffect(() => {
        const spin = () => {
            spinValue.current = 0;
            const spinInterval = setInterval(() => {
                spinValue.current += 1;
            }, 50);
            return () => clearInterval(spinInterval);
        };
        if (isLoading) {
            spin();
        }
    }, [isLoading]);

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute invert dark:invert-0 top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="animate-spin">
                        <Image
                            src="/icons/loading.svg"
                            alt="Loading"
                            width={30}
                            height={30}
                            className="w-8 h-8 max-w-10"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loading;
