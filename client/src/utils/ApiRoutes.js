export const HOST = "http://localhost:3005";

const AUTH_ROUTES = `${HOST}/api/auth`;
const MESSAGES_ROUTES = `${HOST}/api/message`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTES}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTES}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTES}/get-contacts`;

export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTES}/add-message`;
export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGES_ROUTES}/add-image-message`;