import { io } from 'socket.io-client';
import { environment } from '@environments/environment';

const uri = environment.socketUrl;

export const socket = io(uri);
