// src/api/pocketbase.ts
import PocketBase from 'pocketbase';

// Connect to your local PocketBase server URL
// const pb = new PocketBase('http://127.0.0.1:8090');

const pb = new PocketBase('https://render-droneman-1.onrender.com');

// const pb = new PocketBase('https://render-droneman-production.up.railway.app');

export default pb;