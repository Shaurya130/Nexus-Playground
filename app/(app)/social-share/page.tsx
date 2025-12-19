"use client"

export const dynamic = 'force-dynamic';

import React, {useState, useEffect, useRef} from 'react'
import { CldImage } from 'next-cloudinary';

const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
    "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
    "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  };

  type SocialFormat = keyof typeof socialFormats;

  export default function SocialShare() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
        if(uploadedImage){
            setIsTransforming(true);
        }
    }, [selectedFormat, uploadedImage])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedImage(data.publicId);


        } catch (error) {
            console.log(error)
            alert("Failed to upload image");
        } finally{
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if(!imageRef.current) return;

        fetch(imageRef.current.src)
        .then((response) => response.blob())  //blob is binary large object, represents data as a file-like object of immutable, raw data
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    }


    return (
        <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Page Header */}
            <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Social Media Creator</h1>
                <p className="text-base-content/70 mt-1 text-sm sm:text-base">Transform your images into perfect social media formats</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Upload Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-4 sm:p-6">
                        <h2 className="card-title text-lg sm:text-xl">Upload Image</h2>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Choose an image file</span>
                                <span className="label-text-alt text-xs sm:text-sm">MAX. 10MB</span>
                            </label>
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                accept="image/*"
                                className="file-input file-input-bordered file-input-primary w-full"
                            />
                        </div>

                        {isUploading && (
                            <div className="mt-3 sm:mt-4">
                                <progress className="progress progress-primary w-full"></progress>
                                <p className="text-xs sm:text-sm text-base-content/70 mt-1">Uploading your image...</p>
                            </div>
                        )}

                        {/* Format Selection */}
                        {uploadedImage && (
                            <div className="mt-4 sm:mt-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-sm sm:text-base">Social Media Format</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full text-sm sm:text-base"
                                        value={selectedFormat}
                                        onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
                                    >
                                        {Object.keys(socialFormats).map((format) => (
                                            <option key={format} value={format}>
                                                {format}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Format Info */}
                                <div className="mt-3 sm:mt-4">
                                    <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
                                        <div className="stat p-3 sm:p-4">
                                            <div className="stat-title text-xs sm:text-sm">Dimensions</div>
                                            <div className="stat-value text-sm sm:text-lg">{socialFormats[selectedFormat].width} × {socialFormats[selectedFormat].height}</div>
                                        </div>
                                        <div className="stat p-3 sm:p-4">
                                            <div className="stat-title text-xs sm:text-sm">Aspect Ratio</div>
                                            <div className="stat-value text-sm sm:text-lg">{socialFormats[selectedFormat].aspectRatio}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-4 sm:p-6">
                        <h2 className="card-title text-lg sm:text-xl">Preview</h2>

                        {!uploadedImage ? (
                            <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-base-200 rounded-lg">
                                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-base-content/30 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-base-content/50 text-sm sm:text-base text-center">Upload an image to see preview</p>
                            </div>
                        ) : (
                            <div className="space-y-3 sm:space-y-4">
                                <div className="relative flex justify-center bg-base-200 rounded-lg p-2 sm:p-4">
                                    {isTransforming && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-75 rounded-lg z-10">
                                            <div className="text-center">
                                                <span className="loading loading-spinner loading-md sm:loading-lg"></span>
                                                <p className="mt-2 text-xs sm:text-sm">Transforming image...</p>
                                            </div>
                                        </div>
                                    )}
                                    <CldImage
                                        width={Math.min(socialFormats[selectedFormat].width, window.innerWidth > 640 ? 400 : 280)}
                                        height={Math.min(socialFormats[selectedFormat].height, window.innerWidth > 640 ? 400 : 280)}
                                        src={uploadedImage}
                                        sizes="(max-width: 640px) 280px, 400px"
                                        alt="transformed image"
                                        crop="fill"
                                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                                        gravity='auto'
                                        ref={imageRef}
                                        onLoad={() => setIsTransforming(false)}
                                        className="rounded-lg shadow-lg max-w-full h-auto"
                                    />
                                </div>

                                <button 
                                    onClick={handleDownload}
                                    className="btn btn-primary w-full text-sm sm:text-base"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    </svg>
                                    <span className="hidden sm:inline">Download for {selectedFormat}</span>
                                    <span className="sm:hidden">Download</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Available Formats */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-lg sm:text-xl">Available Formats</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                        {Object.entries(socialFormats).map(([format, specs]) => (
                            <div key={format} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="card-body compact p-3 sm:p-4">
                                    <h3 className="card-title text-xs sm:text-sm leading-tight">{format}</h3>
                                    <div className="text-xs opacity-70">
                                        {specs.width} × {specs.height}
                                    </div>
                                    <div className="text-xs opacity-70">
                                        Ratio: {specs.aspectRatio}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}