import React from 'react'

const FileAttachment = ({ fileName, size, type, buffer }) => {

    const bytesToSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
      }

    const handleDownload = () => {
        // Create a Blob from the buffer
        const blob = new Blob([buffer], { type });
        // Create a download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

  return (
    <div className="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
       <div className="me-2">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
            <svg fill="none" aria-hidden="true" className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                <g clipPath="url(#clip0_3173_1381)">
                    <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                    <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                    <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                    <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                </g>
                <defs>
                    <clipPath id="clip0_3173_1381">
                    <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                    </clipPath>
                </defs>
            </svg>
             {fileName}
          </span>
          <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
             {bytesToSize(size)}
             <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
             </svg>
             {type}
          </span>
       </div>
       <div className="inline-flex self-center items-center">
          <button onClick={handleDownload} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
             <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
             </svg>
          </button>
       </div>
    </div>
  )
}

export default FileAttachment