export const HOST = "http://localhost:3005";

const AUTH_ROUTES = `${HOST}/api/auth`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTES}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTES}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTES}/get-contacts`;