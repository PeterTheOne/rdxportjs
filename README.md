rdxportjs
==========

a javascript library for the rivendell rdxport api.

* Author: Peter Grassberger <petertheone@gmail.com>
* License: [AGPL-3.0](http://www.gnu.org/licenses/agpl.html)

Install and Use
-------------
Run

`npm install rdxportjs`

or

`bower install rdxportjs`.


```
    var username = 'hans';
    var token = 'tokener123';
    var endpoint = 'http://example/rd-bin/rdxport.cgi';
    var rdxport = new Rdxport.Rdxport(username, token, endpoint);

    rdxport.addCart('groupName123', 'audio', function () {
        alert('cart added!);
    });
```

Development and testing
-----------------------

test with: `grunt test`.
