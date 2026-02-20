import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      maxSize: 20 * 1024 * 1024,
      accept: { "application/pdf": [".pdf"] },
    });

    const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          <div className="mx-auto flex flex-col items-center justify-center text-center gap-4">
            <img
              src="/icons/info.svg"
              alt="Info icon"
              className="size-20 w-16 h-16"
            />
            {file ? (
              <div></div>
            ) : (
              <div className="w-full">
                <p className="text-lg text-gray-500 break-words">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop your resume here.
                </p>
                <p className="text-lg text-gray-500">(Max file size: 20MB)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
