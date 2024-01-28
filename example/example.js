let functionsSection = document.getElementById('functionsSection');

let buttons = document.querySelectorAll('.demo-btn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});     

const grab = {
    targetElement: null,
    callback: null,
    method: null,
    url: null,
    async: true,
    xhr: new XMLHttpRequest(),
    headers: null,
    enableCors: false,
  
    perform: function(method, url, async, enable) {
      this.method = method;
      this.url = url;
      this.async = async;
      this.xhr = new XMLHttpRequest();
      this.cors(enable !== undefined ? enable : this.enableCors);
      return this;
   },
  
    cors: function(enable) {
      this.xhr.withCredentials = enable;
      return this;
    },
  
    here: function(targetElement, responseType) {
      this.targetElement = document.getElementById(targetElement);
      this.callback = responseType;
      return this;
    },
  
    setHeaders: function(headers) {
      this.headers = headers;
      return this;
    },
  
    setData: function(data) {
      this.data = data;
      return this;
    },
  
    error: function(callback) {
      this.xhr.onerror = callback;
      return this;
    },
  
    timeout: function(milliseconds, callback) {
      this.xhr.timeout = milliseconds;
      this.xhr.ontimeout = callback;
      return this;
    },
  
    progress: function(callback) {
      this.xhr.onprogress = callback;
      return this;
    },
  
    responseType: function(type) {
      this.xhr.responseType = type;
      return this;
    },
  
    abort: function() {
      this.xhr.abort();
      console.log('Request aborted.');
      
      return this;
    },
  
    cache: function(value) {
      this.xhr.setRequestHeader('Cache-Control', value);
      return this;
    },
  
    done: function() {
      const self = this;
      this.xhr.onload = function() {
        self.handleResponse();
      };
  
      this.xhr.open(this.method, this.url, this.async);
  
      if (this.xhr.withCredentials) {
        console.log('CORS is enabled.');
      } else {
        console.log('CORS is disabled.');
      }
  
      if (this.headers) {
        
        for (const [headerName, headerValue] of Object.entries(this.headers)) {
          this.xhr.setRequestHeader(headerName, headerValue);
        }
      }
  
      if (this.method.toUpperCase() === 'POST') {
        if (!this.headers || !this.headers['Content-type']) {
          console.error('Content type is not specified for POST request.');
          return;
        }
      }
  
      this.xhr.send(this.data);
    },
  
    handleResponse: function() {
      const response = this.xhr.response;
  
      if (this.targetElement) {
          if (typeof this.callback === 'function') {
              this.callback.call(this.targetElement, response);
          } else if (this.callback === 'all') {
              this.targetElement.innerHTML = response;
          } else if (this.callback === 'header' && this.headers) {
              for (const [headerName, headerValue] of Object.entries(this.headers)) {
                  const specificHeader = this.xhr.getResponseHeader(headerValue);
                  this.targetElement.innerHTML += `${headerName}: ${specificHeader || 'Header not found'}<br>`;
              }
          }
      }
    },
  };
  
  window.grab = grab;
        
        // Example functions using the updated grab.js library
        function performSpecificHeaderPOST() {
            grab.perform('POST', 'https://jsonplaceholder.typicode.com/posts', true)
                .here('consoleOutput', yourCallbackFunction)
                .setData(JSON.stringify({ title: 'Post Title 1', body: 'Post Body 1', userId: 1 }))
                .setHeaders({ 'Content-type': 'application/json' })
                .done();
        }

        function performMultipleHeadersPOST() {
            grab.perform('POST', 'https://jsonplaceholder.typicode.com/posts', true)
                .here('consoleOutput', yourCallbackFunction)
                .setData(JSON.stringify({ title: 'Post Title 2', body: 'Post Body 2', userId: 1 }))
                .setHeaders({
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer your_access_token'
                })
                .done();
        }

        function performSpecificHeaderGET() {
            grab.perform('GET', 'https://jsonplaceholder.typicode.com/posts/1', true)
                .here('consoleOutput', yourCallbackFunction)
                .setHeaders({ 'Accept': 'application/json' })
                .done();
        }

        function performAllHeadersGET() {
            grab.perform('GET', 'https://jsonplaceholder.typicode.com/posts/2', true)
                .here('consoleOutput', 'all')
                .done();
        }

        function performAbort() {
            setTimeout(function () {
                grab.abort();
            }, 2000);
        }

        function performCORS(enable) {
            grab.enableCors = enable;
            grab.perform('GET', 'https://jsonplaceholder.typicode.com/posts/3', true, enable)
                .here('consoleOutput', yourCallbackFunction)
                .done();
        }

        function performErrorHandling() {
            grab.perform('POST', 'https://jsonplaceholder.typicode.com/posts', true)
                .here('consoleOutput', yourCallbackFunction)
                .setData(JSON.stringify({ title: 'Invalid Post' }))
                .setHeaders({ 'Content-type': 'application/json' })
                .error(function () {
                    console.log('Error occurred during the request.');
                })
                .done();
        }


        function yourCallbackFunction(response) {
            document.getElementById('consoleOutput').innerText = JSON.stringify(response, null, 2);
        }

        functionsSection.innerHTML = `
            <h2>grab.js requests for this example:</h2>
            <pre><code>${performSpecificHeaderPOST.toString().replace(/^function /, '')}</code></pre>
            <pre><code>${performMultipleHeadersPOST.toString().replace(/^function /, '')}</code></pre>
            <pre><code>${performSpecificHeaderGET.toString().replace(/^function /, '')}</code></pre>
            <pre><code>${performAllHeadersGET.toString().replace(/^function /, '')}</code></pre>
            <pre><code>${performAbort.toString().replace(/^function /, '')}</code></pre>
            <pre><code>${performCORS.toString().replace(/^function /, '')}</code></pre>
            <pre><code>${performErrorHandling.toString().replace(/^function /, '')}</code></pre>
            <pre><code>${yourCallbackFunction.toString().replace(/^function /, '')}</code></pre>
        `;

    
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
            .then(response => response.json())
            .then(data => {
                let apiDataDiv = document.getElementById('apiData');
                apiDataDiv.innerHTML = '<h2>API Data used:</h2>';
                data.forEach((post, index) => {
                    apiDataDiv.innerHTML += `<h3>Post ${index + 1}</h3>`;
                    apiDataDiv.innerHTML += `<p>Title: ${post.title}</p>`;
                    apiDataDiv.innerHTML += `<p>Body: ${post.body}</p>`;
                    apiDataDiv.innerHTML += `<p>User ID: ${post.userId}</p>`;
                    apiDataDiv.innerHTML += '<hr>';
                });
            })
            .catch(error => console.error('Error:', error));