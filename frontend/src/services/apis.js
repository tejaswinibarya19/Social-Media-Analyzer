
export async function uploadFile(file, onProgress) {
  const form = new FormData();
  const API_URL = "https://social-media-analyzer-jcxi.onrender.com";
//   'file' naam ke field mein actual file attach kar rahe hai
  form.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/api/upload`, true);

    xhr.onload = () => {
        //success code
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText);
          resolve(json);
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      } 
      else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable && onProgress) {
        onProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    };

    xhr.send(form);
  });
}
