import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import {
  FRONTEND_HOST_URL,
  USER_SERVICE_HOST_URL,
} from 'src/constants/constants';

@WebSocketGateway({
  cors: {
    origin: [FRONTEND_HOST_URL],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Gateway connected', socket.id);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log('Gateway message', body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }

  @SubscribeMessage('get_all_users')
  async onGetAllUsers(@MessageBody() body: any) {
    try {
      console.log('get_all_users', body);
      const response = await fetch(`${USER_SERVICE_HOST_URL}/users`);
      const data = await response.json();
      console.log('Fetched users:', data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
}
