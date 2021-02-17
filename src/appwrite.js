
import * as Appwrite from "appwrite";

const sdk = new Appwrite();
export default sdk
    .setEndpoint('https://appwrite.cognitive.id/v1') // Set only when using self-hosted solution
    .setProject('6027352972c62'); // Your Appwrite Project UID

