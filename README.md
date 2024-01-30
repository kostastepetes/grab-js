# grab.js Documentation

## Introduction
`grab.js` is a lightweight AJAX library that simplifies making XMLHttpRequests in JavaScript. It provides a convenient and chainable interface for configuring and executing AJAX requests with features such as handling headers, enabling CORS, setting timeouts, and more.

## Table of Contents
1. [Initialization](#initialization)
2. [Configuration Methods](#configuration-methods)
    - [perform](#perform)
    - [here](#here)
    - [setData](#setdata)
    - [setHeaders](#setheaders)
    - [enableCors](#enablecors)
    - [error](#error)
    - [abort](#abort)
3. [Request Execution](#request-execution)
    - [done](#done)
4. [Examples](#examples)

## Initialization<a name="initialization"></a>
Include the `grab.js` script in your HTML file to use it:
```html
<script src="https://cdn.jsdelivr.net/gh/kostastepetes/grab-js/dist/grab.min.js"></script>
```

## Configuration Methods<a name="configuration-methods"></a>
### perform(method, url, async)
Specify the HTTP method, URL, and asynchronous flag for the request.
```javascript
grab.perform("GET", "https://jsonplaceholder.typicode.com/posts", true);
```

### here(targetElement, callback)
Set the target HTML element and callback function for the request.
```javascript
grab.here('HTMLElement', yourCallbackFunction);
```

### setData(data)
Set the request payload data.
```javascript
grab.setData(JSON.stringify({ title: 'Post Title', body: 'Post Body', userId: 1 }));
```

### setHeaders(headers)
Set the headers for the request.
```javascript
grab.setHeaders({ 'Content-type': 'application/json' });
```

### enableCors(enable)
Enable or disable Cross-Origin Resource Sharing (CORS) globally for all requests made using the `grab.js` library.
```javascript
grab.enableCors = true; 
grab.enableCors = false;
```

### error(callback)
Set a callback function to handle errors during the request.
```javascript
grab.error(function() {
    console.error('An error occurred during the request.');
});
```

### abort()
Abort the ongoing request.
```javascript
grab.abort();
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
function performSpecificHeaderPOST() {
    grab.perform('POST', 'https://jsonplaceholder.typicode.com/posts', true)
        .here('HTMLElement', yourCallbackFunction)
        .setData(JSON.stringify({ title: 'Post Title', body: 'Post Body', userId: 1 }))
        .setHeaders({ 'Content-type': 'application/json' })
        .done();
}
```

### Multiple Headers
```javascript
function performMultipleHeadersPOST() {
    grab.perform('POST', 'https://jsonplaceholder.typicode.com/posts', true)
        .here('HTMLElement', yourCallbackFunction)
        .setData(JSON.stringify({ title: 'Post Title', body: 'Post Body', userId: 1 }))
        .setHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer your_access_token'
        })
        .done();
}
```

### Specific Header
```javascript
function performSpecificHeaderGET() {
    grab.perform('GET', 'https://jsonplaceholder.typicode.com/posts/1', true)
        .here('HTMLElement', yourCallbackFunction)
        .setHeaders({ 'Accept': 'application/json' })
        .done();
}
```

### All Headers
```javascript
function performAllHeadersGET() {
    grab.perform('GET', 'https://jsonplaceholder.typicode.com/posts/1', true)
        .here('HTMLElement', 'all')
        .done();
}
```

### Aborting the Request
```javascript
function performAbort() {
    setTimeout(function() {
        grab.abort(); // Simulate aborting the request after a delay
    }, 2000); // Abort after 2 seconds
}
```

### Enabling CORS
```javascript
function performCORS(enable) {
    grab.enableCors = enable;
    grab.perform('GET', 'https://jsonplaceholder.typicode.com/posts/1', true, enable)
        .here('HTMLElement', yourCallbackFunction)
        .done();
}
```

### Error Handling
```javascript
function performErrorHandling() {
    grab.perform('POST', 'https://jsonplaceholder.typicode.com/posts', true)
        .here('HTMLElement', yourCallbackFunction)
        .setData(JSON.stringify({ title: 'Invalid Post' }))
        .setHeaders({ 'Content-type': 'application/json' })
        .error(function() {
            console.log('Error occurred during the request.');
        })
        .done();
}
```
