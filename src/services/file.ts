import { Storage } from 'aws-amplify';

interface IVaultPutResponse {
  key: string;
}

export const fileUpload = async (file: File) => {
  const name = `${Date.now()}-${file.name}`;
  return (await Storage.vault.put(name, file, {
    contentType: file.type
  })) as IVaultPutResponse;
};

export const fileGet = async (key: string) => {
  return await Storage.vault.get(key);
};

export const fileDelete = async (key: string) => {
  return await Storage.vault.remove(key);
};
