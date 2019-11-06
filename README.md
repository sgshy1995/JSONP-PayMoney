### Use JSONP to Payment
First, you need to use the node command in two windows to turn on two different servers.
<br>
For exam, here use port 8002 and 8003.<br>
`node server.js port`
<br><br>
You need to modify the local hosts file and add the local URL to use the server, otherwise, please modify the JS file.<br>
`/etc/hosts`
<br><br>
Now open the local web address (Here is the frank.com:8002) to see the balance in your database.<br>
And then complete the payment operation by accessing the server on the 8003 port.
