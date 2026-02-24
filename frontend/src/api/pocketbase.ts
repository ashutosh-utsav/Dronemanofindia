// src/api/pocketbase.ts
import PocketBase from 'pocketbase';

// Connect to your local PocketBase server URL
const pb = new PocketBase('http://127.0.0.1:8090');

export default pb;