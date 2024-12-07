import React from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { UploadThingError } from 'uploadthing/server';
import { Json } from '@uploadthing/shared';
import { toast } from 'sonner';

type Props = {
  onChange: (urls: string[]) => void;
  type: 'image' | 'file';
};

const uploader = ({ onChange, type }: Props) => {
  return (
    <UploadDropzone
      endpoint={type}
      onClientUploadComplete={(res) => onChange(res.map((item) => item.url))}
      onUploadError={(error: UploadThingError<Json>) => {
        toast.error(error.message);
      }}
    />
  );
};

export default uploader;
