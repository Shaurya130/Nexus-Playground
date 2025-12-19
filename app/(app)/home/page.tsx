"use client"

export const dynamic = 'force-dynamic';

import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
import Link from 'next/link'

function Home() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/videos")
            if(Array.isArray(response.data)) {
                setVideos(response.data)
            } else {
                throw new Error(" Unexpected response format");

            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch videos")

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])

    const handleDownload = useCallback((url: string, title: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.mp4`);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [])

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-2 text-base-content/70">Loading your videos...</p>
                </div>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-error text-4xl mb-4">⚠️</div>
                    <p className="text-error mb-4">{error}</p>
                    <button 
                        onClick={fetchVideos}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">My Videos</h1>
                    <p className="text-base-content/70 mt-1 text-sm sm:text-base">Manage and organize your video collection</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/video-upload" className="btn btn-primary btn-sm sm:btn-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">Upload Video</span>
                        <span className="sm:hidden">Upload</span>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="stat-title">Total Videos</div>
                        <div className="stat-value">{videos.length}</div>
                        <div className="stat-desc">In your library</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div className="stat-title">Storage Used</div>
                        <div className="stat-value text-secondary">2.4GB</div>
                        <div className="stat-desc">↗️ 12% (90 days)</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="stat-title">Processed</div>
                        <div className="stat-value text-accent">{videos.length}</div>
                        <div className="stat-desc">Ready to download</div>
                    </div>
                </div>
            </div>

            {/* Videos Section */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-lg sm:text-xl">
                        Your Videos
                        {videos.length > 0 && (
                            <div className="badge badge-secondary">{videos.length}</div>
                        )}
                    </h2>
                    
                    {videos.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📹</div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">No videos uploaded yet</h3>
                            <p className="text-base-content/60 mb-4 sm:mb-6 text-sm sm:text-base">Start by uploading your first video to see it here</p>
                            <Link href="/video-upload" className="btn btn-primary btn-sm sm:btn-md sm:btn-wide">
                                Upload Your First Video
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    onDownload={handleDownload}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home