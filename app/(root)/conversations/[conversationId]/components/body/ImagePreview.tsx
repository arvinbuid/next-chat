import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type Props = {
  urls: string[];
};

const ImagePreview = ({ urls }: Props) => {
  const [videoFlags, setVideoFlags] = useState<boolean[]>([]);

  const isVideoFile = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type') || '';
      return contentType.startsWith('video/');
    } catch (error) {
      console.error('Error checking video file:', error);
      return false;
    }
  };

  // This effect will run ones to check all urls to determine which files are videos
  useEffect(() => {
    const checkVideoFiles = async () => {
      const flags = await Promise.all(urls.map((url) => isVideoFile(url)));
      setVideoFlags(flags);
    };

    checkVideoFiles();
  }, [urls]);

  return (
    <div
      className={cn('grid gap-2 justify-items-start', {
        'grid-cols-1': urls.length === 1,
        'grid-cols-2': urls.length > 1,
      })}
    >
      {urls.map((url, index) => {
        const isVideo = videoFlags[index]; // Get value from state once it's resolved

        return (
          <Dialog key={index}>
            <div
              className={cn('relative cursor-pointer', {
                'w-28 h-35 max-w-full': !isVideo,
              })}
            >
              <DialogTrigger asChild>
                {isVideo ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <video className="object-cover w-full rounded-md">
                      <source src={`${url}#=0.1`} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <Image
                    src={url}
                    width={200}
                    height={200}
                    alt={`Uploaded image`}
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isVideo ? 'Video preview' : 'Image preview'}
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full h-96 relative flex items-center justify-center">
                  {isVideo ? (
                    <video controls className="w-full">
                      <source src={`${url}#=0.1`} />
                    </video>
                  ) : (
                    <Image
                      src={url}
                      width={250}
                      height={250}
                      alt="Uploaded image"
                      referrerPolicy="no-referrer"
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                </div>
              </DialogContent>
            </div>
          </Dialog>
        );
      })}
    </div>
  );
};

export default ImagePreview;
