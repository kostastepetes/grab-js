# grab.js Documentation

## Introduction
`grab.js` is a lightweight AJAX library that simplifies making XMLHttpRequests in JavaScript. It provides a convenient and chainable interface for configuring and executing AJAX requests with features such as handling headers, enabling CORS, setting timeouts, and more.

## Table of Contents
1. [Initialization](#initialization)
2. [Configuration Methods](#configuration-methods)
    - [here](#here)
    - [perform](#perform)
    - [setData](#setdata)
    - [responseType](#responsetype)
    - [cors](#cors)
    - [error](#error)
    - [timeout](#timeout)
    - [progress](#progress)
    - [abort](#abort)
    - [cache](#cache)
3. [Request Execution](#request-execution)
    - [done](#done)
4. [Examples](#examples)

## Initialization<a name="initialization"></a>
Include the `grab.js` script in your HTML file to use it:
```html
<script src="grab.js"></script>
```

## Configuration Methods<a name="configuration-methods"></a>
### here(targetElement, responseType, headers)
Set the target HTML element, response type, and custom headers for the request.
```javascript
grab.here("demo", 'header', {'Content-Type': 'application/json'});
```

### perform(method, url, async)
Specify the HTTP method, URL, and asynchronous flag for the request.
```javascript
grab.perform("GET", "ajax_info.txt", true);
```

### setData(data)
Set the request payload data.
```javascript
grab.setData("fname=Henry&lname=Ford");
```

### responseType(type)
Set the response type for the request.
```javascript
grab.responseType('json');
```

### cors(enable)
Enable or disable Cross-Origin Resource Sharing (CORS).
```javascript
grab.cors(true);
```

### error(callback)
Set a callback function to handle errors during the request.
```javascript
grab.error(function() {
    console.error('An error occurred during the request.');
});
```

### timeout(milliseconds, callback)
Set a timeout for the request and provide a callback for timeout events.
```javascript
grab.timeout(5000, function() {
    console.error('Request timed out.');
});
```

### progress(callback)
Set a callback function to handle progress events during the request.
```javascript
grab.progress(function(event) {
    console.log('Progress:', event.loaded, 'out of', event.total, 'bytes');
});
```

### abort()
Abort the ongoing request.
```javascript
grab.abort();
```

### cache(value)
Set the 'Cache-Control' header for the request.
```javascript
grab.cache('no-cache');
```

## Request Execution<a name="request-execution"></a>
### done()
Execute the configured request.
```javascript
grab.done();
```

## Examples<a name="examples"></a>
### Specific Header with POST and Custom Content-Type
```javascript
grab.here("demo", 'header', {'Content-Type': 'application/json'})
    .perform("POST", "ajax_test.asp", true)
    .setData("fname=Henry&lname=Ford")
    .done();
```

### Multiple Headers
```javascript
grab.here("demo", 'header', {'Content-Type': 'application/json', 'Authorization': 'Bearer 22342983953'})
    .perform("POST", "ajax_test.asp", true)
    .setData("fname=Henry&lname=Ford")
    .done();
```

### Specific Header
```javascript
grab.here("demo", 'header', {'Last-Modified': 'some-date'})
    .perform("GET", "ajax_info.txt", true)
    .done();
```

### All Headers
```javascript
grab.here("demo", 'all')
    .perform("GET", "ajax_info.txt", true)
    .done();
```

### Aborting the Request
```javascript
setTimeout(function() {
    grab.abort(); // Simulate aborting the request after a delay
}, 2000); // Abort after 2 seconds
```

### Enabling CORS
```javascript
grab.here("demo", 'all')
    .cors(true)
    .perform("GET", "https://example.com/api/data", true)
    .done();
```

### Disabling CORS
```javascript
grab.here("demo", 'all')
    .cors(false)
    .perform("GET", "https://example.com/api/data", true)
    .done();
```