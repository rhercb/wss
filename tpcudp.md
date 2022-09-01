Packets - little streams of data

Application layer - HTTP/FTP/SSh/SMTP
Transport layer - UPD/TCP
Network layer - IP
Link layer - WiFi, ethernet connection
Physical layer - cables

Application uses TPC to get information

Transport layer creates 2^16 ports, 65 536

UDP - user datagram protocol
* Light weight
* 8 bytes
* Connectionless, we don't need connection to start talking
* Consistency
* FAST

TCP - transmition control protocol
* Connection based - we need a connection to start talking
* Reliable
* Retransmission
* In-order packets
* Congestion control - keep packet loss to a minimum

    