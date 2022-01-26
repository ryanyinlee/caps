"use strict";

const socketio = require("socket.io");
const PORT = process.env.PORT || 3000;
const server = socketio(PORT); // default localhost:3000 connections

// namespace
const caps = server.of('/caps'); //'http://localhost:3000/caps'

describe("Can successfully test hub", () => {
    it("Can successfully test hub", () => {

    server.on("connection", (socket) => {

            //   console.log("Hub Log: User has connected.");
            //   console.log("Hub Log: Their socket ID is: " + socket.id);
            
              // generic greeting
    socket.emit('welcome',  'Hub Emit: Welcome, your Hub connection is active.',);
    }); // end of server.on
      
      expect().toEqual();
    });
  });