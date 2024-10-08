import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.siamislam.aora",
  projectId: "66b34cb70002553b7fd8",
  databaseId: "66b34de00001d3966fcb",
  userCollectionId: "66b34e0900265d546583",
  videoCollectionId: "66b34e2d00306ef5f006",
  storageId: "66b34f550027d0132d9a",
};

// Init your React Native SDK
const client = new Client();
client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const getPopularVideos = async () => {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    if (!videos) throw Error;
    return videos.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilteredVideos = async (searchValue) => {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", searchValue), Query.orderDesc("$createdAt")]
    );
    if (!videos) throw Error;
    return videos.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getVideosByUser = async (id) => {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", id)]
    );
    if (!videos) throw Error;
    return videos.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFileUrl = async (fileId, type) => {
  let fileUrl;
  if (type === "video") {
    fileUrl = storage.getFileView(config.storageId, fileId);
  } else {
    fileUrl = storage.getFilePreview(
      config.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
  }
  return fileUrl;
};

export const uploadFile = async (
  { assets: { fileName: name, mimeType, fileSize: size, uri } },
  type
) => {
  try {
    const file = {
      name,
      type: mimeType,
      size,
      uri,
    };
    const createdFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      file
    );
    const fileUrl = await getFileUrl(createdFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error("Invalid file type");
  }
};

export const createVideoPost = async (reqPayload) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(reqPayload.thumbnail, "image"),
      uploadFile(reqPayload.video, "video"),
    ]);
    const result = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        ...reqPayload,
        thumbnail: thumbnailUrl,
        video: videoUrl,
      }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
