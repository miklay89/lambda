import msgreceiver from "./lambdas/msgreceiver";
import queuemsghandler from "./lambdas/queuemsghandler";

// receive messages from shop
export const messageReceiverHandler = msgreceiver;
// compute message from queue
export const queueMessageHandler = queuemsghandler;
