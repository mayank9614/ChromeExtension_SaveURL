document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('saveButton');
    const urlList = document.getElementById('urlList');
  
    saveButton.addEventListener('click', function () {
      chrome.tabs.query({}, function (tabs) {
        for (const tab of tabs) {
          const url = tab.url;
          saveURL(url);
        }
      });
    });
  
    function saveURL(url) {
      const blob = new Blob([url], { type: 'text/plain' });
      const urlObject = URL.createObjectURL(blob);
      const filename = getFormattedDate() + '.txt';
  
      const downloadLink = document.createElement('a');
      downloadLink.href = urlObject;
      downloadLink.download = filename;
      downloadLink.click();
  
      // Display the saved URL in the popup
      const listItem = document.createElement('li');
      listItem.textContent = url;
      urlList.appendChild(listItem);
    }
  
    function getFormattedDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
         
    }
  });
  