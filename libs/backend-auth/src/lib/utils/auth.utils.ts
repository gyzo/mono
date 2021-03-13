export const getAuthHeader = (accessToken: string) => ({
  headers: {
    Authorization: `token ${accessToken}`,
  },
});
