/** @format */
export async function connect(client) {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
}

export function userLogin(username, password) {
    console.log(username, password);
};

export function logout() {}

export function changePassword() {}

export function userExists() {}

export function isAuthenticated() {}
