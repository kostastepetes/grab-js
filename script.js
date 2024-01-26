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
