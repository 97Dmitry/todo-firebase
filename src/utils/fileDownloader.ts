import axios from "axios";
import downloadjs from "downloadjs";
import { Dispatch, SetStateAction } from "react";

export const fileDownloader = (
  url: string,
  fileName: string,
  setProgressInfo: Dispatch<SetStateAction<number>>,
) => {
  axios({
    url,
    onDownloadProgress(progressEvent) {
      const progress = Math.round((progressEvent.loaded / progressEvent.total!) * 100);
      setProgressInfo(progress);
    },
    responseType: "blob",
  })
    .then((r) => r.data)
    .then((blob) => downloadjs(blob, fileName))
    .then(() => {
      setTimeout(() => {
        setProgressInfo(0);
      }, 500);
    });
};
