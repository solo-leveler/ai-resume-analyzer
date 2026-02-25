import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/util";

interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, []);
  const maxFileSize = 20 * 1024 * 1024;
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      maxSize: maxFileSize,
      accept: { "application/pdf": [".pdf"] },
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="PDF icon" className="size-10" />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  onFileSelect?.(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full">
              <div className="mx-auto flex flex-col items-center justify-center text-center gap-4">
                <img
                  src="/icons/info.svg"
                  alt="Info icon"
                  className="size-20 w-16 h-16"
                />
              </div>
              <p className="text-lg text-gray-500 break-words">
                <span className="font-semibold">Click to upload</span> or drag
                and drop your resume here.
              </p>
              <p className="text-lg text-gray-500">
                PDF (Max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
