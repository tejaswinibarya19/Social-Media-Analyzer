
export async function uploadFile(file, onProgress) {
  const form = new FormData();
//   'file' naam ke field mein actual file attach kar rahe hai
  form.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', (process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/api/upload', true);

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
