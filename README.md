# node-wincc-example
This project shows how you can monitor Simatic WinCC tags in your browser in realtime.
I'm new to Node.JS, so code can be clumsy and stuff. But I will improve it.

# Usage
## Connection indicator
In this project `div` with "conn-status" `id` is used as connection indicator:
```html
<div id="conn-status"></div>
```
## Tag reading status
`div` with `id` "wincc-status" contains connection status between server and WinCC.

## Tag value field
Divs with attribute `data-wincc-tag="wincc-tag-name"` are used to show realtime values of specified WinCC tags:
```html
<div class="data" data-wincc-tag="X"></div>
```
All specified tags will be registered at server automatically.

# TODO
* Make "wincc-status" `div` prettier.