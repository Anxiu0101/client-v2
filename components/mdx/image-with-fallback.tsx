"use client"

import React, { useState } from 'react';
import Image from 'next/image';

// base64 格式错误兜底图
const ERROR_IMG_SRC =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

// ImageWithFallbackProps 继承 next/image 的 ImageProps，保证兼容性
type ImageWithFallbackProps = React.ComponentProps<typeof Image>;

export function ImageWithFallback(props: ImageWithFallbackProps) {
    const [didError, setDidError] = useState(false);
    const {
        src,
        alt,
        className,
        style,
        ...rest
    } = props;

    // 图片加载失败回调
    const handleError = () => {
        setDidError(true);
    };

    return didError ? (
        // 加载失败时：渲染带兜底图的优化组件（仍使用 next/image 保证兜底图也被优化）
        <div
            className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
            style={style}
        >
            <div className="flex items-center justify-center w-full h-full relative">
                {/* 兜底图也使用 next/image 组件，获得优化能力 */}
                <Image
                    src={ERROR_IMG_SRC}
                    alt="Error loading image"
                    fill
                    style={{objectFit: 'contain', width: '40px', height: '40px'}}
                    data-original-url={src}
                    {...rest}
                />
            </div>
        </div>
    ) : (
        // 正常加载时：渲染 next/image 优化组件
        <Image
            src={src}
            alt={alt}
            className={className}
            style={style}
            width={800}
            height={750}
            onError={handleError} // 绑定错误监听
            {...rest}
        />
    )
}