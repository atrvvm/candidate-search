const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log(`Fetching users since ID: ${start}`);

    const token = import.meta.env.VITE_GITHUB_TOKEN;
    console.log("GitHub Token:", token ? "Token found ✅" : "Token MISSING ❌");

    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Response Status:", response.status);
    
    const data = await response.json();
    console.log("Fetched Users:", data);

    if (!response.ok) {
      throw new Error(`Invalid API response (${response.status}): ${data.message}`);
    }

    return data;
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    console.log(`Fetching user details for: ${username}`);

    const token = import.meta.env.VITE_GITHUB_TOKEN;
    console.log("GitHub Token:", token ? "Token found ✅" : "Token MISSING ❌");

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User API Response Status:", response.status);
    
    const data = await response.json();
    console.log("Fetched User Details:", data);

    if (response.status === 404) {
      throw new Error(`User ${username} not found (404)`);
    }

    if (!response.ok) {
      throw new Error(`Invalid API response (${response.status}): ${data.message}`);
    }

    return data;
  } catch (err) {
    console.error("Error fetching user details:", err);
    return null; // Return `null` instead of an empty object
  }
};


export { searchGithub, searchGithubUser };
