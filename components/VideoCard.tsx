import React, {useState, useEffect, useCallback} from 'react'
import {getCldImageUrl, getCldVideoUrl} from "next-cloudinary"
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from 'dayjs';
import realtiveTime from "dayjs/plugin/relativeTime"
import {filesize} from "filesize"
import { Video } from '@/types';

dayjs.extend(realtiveTime) //enables us to use it to format dates like "3 hours ago"

interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}

const  VideoCard: React.FC<VideoCardProps> = ({video, onDownload}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [previewError, setPreviewError] = useState(false)

    //urls needed for video playback

    const getThumbnailUrl = useCallback((publicId: string) => {//thumbnail url with transformations
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video"
        })
    }, [])

    const getFullVideoUrl = useCallback((publicId: string) => { //full resolution video url
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,

        })
    }, [])

    const getPreviewVideoUrl = useCallback((publicId: string) => { //preview video url with transformations
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"] //15 sec duration, max 9 segments, min segment duration 1 sec

        })
    }, [])

    const formatSize = useCallback((size: number) => { //formatted size using filesize library
        return filesize(size)
    }, [])

    const formatDuration = useCallback((seconds: number) => { //formatted duration mm:ss
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
      }, []);

      const compressionPercentage = Math.round(
        (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
      );

      useEffect(() => {
        setPreviewError(false);
      }, [isHovered]);

      const handlePreviewError = () => {
        setPreviewError(true);
      };

      return (
        <div
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <figure className="aspect-video relative">
            {isHovered ? (
              previewError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-red-500">Preview not available</p>
                </div>
              ) : (
                <video
                  src={getPreviewVideoUrl(video.publicId)}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                  onError={handlePreviewError}
                />
              )
            ) : (
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getThumbnailUrl(video.publicId)}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-base-100 bg-opacity-70 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm flex items-center">
              <Clock size={12} className="sm:w-4 sm:h-4 mr-1" />
              {formatDuration(video.duration)}
            </div>
          </figure>
          <div className="card-body p-3 sm:p-4">
            <h2 className="card-title text-sm sm:text-lg font-bold line-clamp-2">{video.title}</h2>
            <p className="text-xs sm:text-sm text-base-content opacity-70 mb-3 sm:mb-4 line-clamp-2">
              {video.description}
            </p>
            <p className="text-xs sm:text-sm text-base-content opacity-70 mb-3 sm:mb-4">
              Uploaded {dayjs(video.createdAt).fromNow()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center">
                <FileUp size={16} className="mr-2 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold">Original</div>
                  <div className="truncate">{formatSize(Number(video.originalSize))}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FileDown size={16} className="mr-2 text-secondary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold">Compressed</div>
                  <div className="truncate">{formatSize(Number(video.compressedSize))}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 sm:mt-4 gap-2">
              <div className="text-xs sm:text-sm font-semibold">
                Compression:{" "}
                <span className="text-accent">{compressionPercentage}%</span>
              </div>
              <button
                className="btn btn-primary btn-xs sm:btn-sm w-full sm:w-auto"
                onClick={() =>
                  onDownload(getFullVideoUrl(video.publicId), video.title)
                }
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span className="sm:hidden">Download</span>
              </button>
            </div>
          </div>
        </div>
      );
}

export default VideoCard